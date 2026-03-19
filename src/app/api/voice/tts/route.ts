/**
 * Azure Neural TTS Proxy API Route
 *
 * Converts text to natural Arabic/English speech using Azure Neural TTS.
 * Falls back to a 503 response when not configured (client uses Web Speech API).
 *
 * Features:
 * - SSML support for Islamic terminology pronunciation
 * - Arabic (ar-SA HamedNeural) and English voices
 * - Free tier: 0.5M chars/month
 *
 * Required env vars:
 * - AZURE_SPEECH_KEY: Azure Speech Services subscription key
 * - AZURE_SPEECH_REGION: Azure region (e.g., 'westus2')
 */

import { NextResponse } from 'next/server';
import { applyHeritagePronunciation } from '@/lib/voice/heritage-ssml-lexicon';

/** Arabic voice for heritage narration — warm, friendly male voice */
const ARABIC_VOICE = 'ar-SA-HamedNeural';
/** English voice — natural, warm */
const ENGLISH_VOICE = 'en-US-GuyNeural';

export async function POST(req: Request) {
  const apiKey = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;

  if (!apiKey || !region) {
    return NextResponse.json(
      { error: 'Azure Speech not configured', provider: 'web-speech' },
      { status: 503 },
    );
  }

  try {
    const { text, lang = 'ar' } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 },
      );
    }

    // Select voice based on language
    const voice = lang.startsWith('ar') ? ARABIC_VOICE : ENGLISH_VOICE;
    const xmlLang = lang.startsWith('ar') ? 'ar-SA' : 'en-US';

    // Build SSML for natural, friendly heritage narration
    const ssml = buildSSML(text, voice, xmlLang);

    // Call Azure TTS REST API
    const tokenUrl = `https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`;
    const tokenRes = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
        'Content-Length': '0',
      },
    });

    if (!tokenRes.ok) {
      console.error('Azure token error:', tokenRes.status);
      return NextResponse.json(
        { error: 'TTS authentication failed' },
        { status: 500 },
      );
    }

    const token = await tokenRes.text();

    // Synthesize speech
    const ttsUrl = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
    const ttsRes = await fetch(ttsUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
        'User-Agent': 'AtharHeritage/1.0',
      },
      body: ssml,
    });

    if (!ttsRes.ok) {
      const errorText = await ttsRes.text();
      console.error('Azure TTS error:', ttsRes.status, errorText);
      return NextResponse.json(
        { error: 'Speech synthesis failed' },
        { status: 500 },
      );
    }

    const audioBuffer = await ttsRes.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Voice TTS API error:', error);
    return NextResponse.json(
      { error: 'An error occurred during speech synthesis' },
      { status: 500 },
    );
  }
}

/** GET endpoint to check if Azure TTS is configured */
export async function GET() {
  const isConfigured = !!(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION);

  return NextResponse.json({
    provider: isConfigured ? 'azure' : 'web-speech',
    available: true,
  });
}

/**
 * Build SSML markup for natural, friendly heritage narration.
 *
 * The voice style is warm and engaging — like a knowledgeable friend
 * sharing heritage stories, not a robotic tour guide.
 */
function buildSSML(text: string, voice: string, lang: string): string {
  const langCode = lang.startsWith('ar') ? 'ar' as const : 'en' as const;

  // Escape XML special characters first, then apply pronunciation
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  // Re-apply pronunciation on escaped text (the terms survive escaping since they're plain text)
  const processedText = applyHeritagePronunciation(escaped, langCode);

  // Friendly, warm narration style with natural pauses
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis"
    xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="${lang}">
  <voice name="${voice}">
    <mstts:express-as style="friendly" styledegree="1.2">
      <prosody rate="-5%" pitch="+2%">
        ${processedText}
      </prosody>
    </mstts:express-as>
  </voice>
</speak>`;
}
