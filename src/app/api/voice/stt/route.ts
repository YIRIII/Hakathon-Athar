/**
 * Deepgram STT Proxy API Route
 *
 * Proxies audio from the browser to Deepgram Nova-3 for speech-to-text.
 * This keeps the API key server-side only.
 *
 * Uses Deepgram REST API directly for pre-recorded transcription:
 * 1. Receives audio blob from the client
 * 2. Sends it to Deepgram's REST API
 * 3. Returns the transcription
 *
 * Heritage keyterms are automatically injected for better
 * recognition of Islamic/Arabic heritage terminology.
 */

import { NextResponse } from 'next/server';

/** Heritage terminology hints for Deepgram Keyterm Prompting */
const HERITAGE_KEYTERMS = [
  'المسجد الحرام', 'الكعبة', 'غار حراء', 'غار ثور',
  'جبل النور', 'منى', 'مزدلفة', 'عرفات', 'الصفا', 'المروة',
  'بئر زمزم', 'مقام إبراهيم', 'الحجر الأسود',
  'المسجد النبوي', 'الروضة الشريفة', 'جبل أحد', 'مسجد قباء',
  'البقيع', 'مسجد القبلتين',
  'الحج', 'العمرة', 'الطواف', 'السعي',
  'Masjid al-Haram', 'Kaaba', 'Cave of Hira',
  'Mount Uhud', 'Quba Mosque', 'Zamzam Well',
];

const DEEPGRAM_API_URL = 'https://api.deepgram.com/v1/listen';

export async function POST(req: Request) {
  const apiKey = process.env.DEEPGRAM_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Deepgram API key not configured', provider: 'web-speech' },
      { status: 503 },
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'ar';

    // Read audio from request body
    const audioBuffer = await req.arrayBuffer();

    if (audioBuffer.byteLength === 0) {
      return NextResponse.json(
        { error: 'No audio data received' },
        { status: 400 },
      );
    }

    // Map language to Deepgram model language
    const deepgramLang = lang.startsWith('ar') ? 'ar' : 'en';

    // Build query params for Deepgram REST API
    const params = new URLSearchParams({
      model: 'nova-3',
      language: deepgramLang,
      smart_format: 'true',
      punctuate: 'true',
    });

    // Add heritage keyterms for better recognition
    for (const term of HERITAGE_KEYTERMS) {
      params.append('keywords', `${term}:2`);
    }

    const contentType = req.headers.get('content-type') || 'audio/webm';

    const response = await fetch(`${DEEPGRAM_API_URL}?${params.toString()}`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${apiKey}`,
        'Content-Type': contentType,
      },
      body: audioBuffer,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Deepgram API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Transcription failed' },
        { status: 500 },
      );
    }

    const data = await response.json();
    const transcript =
      data?.results?.channels?.[0]?.alternatives?.[0]?.transcript || '';

    return NextResponse.json({
      text: transcript,
      provider: 'deepgram',
      language: deepgramLang,
    });
  } catch (error) {
    console.error('Voice STT API error:', error);
    return NextResponse.json(
      { error: 'An error occurred during speech recognition' },
      { status: 500 },
    );
  }
}

/** GET endpoint to check if Deepgram is configured */
export async function GET() {
  const isConfigured = !!process.env.DEEPGRAM_API_KEY;

  return NextResponse.json({
    provider: isConfigured ? 'deepgram' : 'web-speech',
    available: true,
  });
}
