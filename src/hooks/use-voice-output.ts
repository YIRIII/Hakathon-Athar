/**
 * useVoiceOutput — React hook for text-to-speech output
 *
 * Provides a simple interface for speaking text in the chat.
 * Auto-detects the best available TTS provider:
 * - Azure Neural TTS if configured (best Arabic pronunciation)
 * - Web Speech Synthesis as free fallback
 *
 * Usage:
 *   const { isSpeaking, speak, stop, isAvailable } = useVoiceOutput();
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { TTSLanguage, TTSStatus } from '@/lib/voice/tts-provider';

interface UseVoiceOutputOptions {
  /** Language for speech synthesis */
  language?: TTSLanguage;
}

interface UseVoiceOutputReturn {
  /** Whether currently speaking */
  isSpeaking: boolean;
  /** Current TTS status */
  status: TTSStatus;
  /** Speak the given text */
  speak: (text: string) => Promise<void>;
  /** Stop speaking */
  stop: () => void;
  /** Whether TTS is available */
  isAvailable: boolean;
  /** Which TTS provider is active */
  providerName: string;
  /** Error message if any */
  error: string | null;
}

export function useVoiceOutput(options: UseVoiceOutputOptions = {}): UseVoiceOutputReturn {
  const { language = 'ar-SA' } = options;

  const [status, setStatus] = useState<TTSStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [providerName, setProviderName] = useState('');
  const [azureAvailable, setAzureAvailable] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check provider availability on mount
  useEffect(() => {
    const checkAvailability = async () => {
      // Check if Azure TTS is configured server-side
      try {
        const res = await fetch('/api/voice/tts');
        const data = await res.json();
        if (data.provider === 'azure') {
          setAzureAvailable(true);
          setProviderName('Azure Neural TTS');
          setIsAvailable(true);
          return;
        }
      } catch {
        // Azure not available
      }

      // Fall back to Web Speech Synthesis
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        setProviderName('Web Speech Synthesis');
        setIsAvailable(true);
        return;
      }

      setIsAvailable(false);
      setProviderName('');
    };

    checkAvailability();
  }, []);

  // Azure TTS speak
  const speakAzure = useCallback(async (text: string) => {
    setError(null);
    setStatus('loading');

    try {
      const res = await fetch('/api/voice/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang: language }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'TTS failed' }));
        throw new Error(data.error || 'TTS request failed');
      }

      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Play the audio
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => setStatus('speaking');
      audio.onended = () => {
        setStatus('idle');
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };
      audio.onerror = () => {
        setError('Audio playback failed');
        setStatus('error');
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };

      await audio.play();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'TTS failed';
      setError(msg);
      setStatus('error');
    }
  }, [language]);

  // Web Speech TTS speak
  const speakWebSpeech = useCallback(async (text: string) => {
    setError(null);

    if (!window.speechSynthesis) {
      setError('Speech synthesis not available');
      setStatus('error');
      return;
    }

    window.speechSynthesis.cancel();

    return new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 0.9; // Slightly slower — friendly pace
      utterance.pitch = 1.05; // Slightly warm

      // Try to find a good voice
      const voices = window.speechSynthesis.getVoices();
      const langPrefix = language.split('-')[0];
      const matchingVoice = voices.find((v) => v.lang.startsWith(langPrefix));
      if (matchingVoice) utterance.voice = matchingVoice;

      utterance.onstart = () => setStatus('speaking');
      utterance.onend = () => { setStatus('idle'); resolve(); };
      utterance.onerror = (e) => {
        if (e.error === 'canceled' || e.error === 'interrupted') {
          setStatus('idle');
          resolve();
          return;
        }
        setError(`Speech error: ${e.error}`);
        setStatus('error');
        resolve();
      };

      setStatus('loading');
      window.speechSynthesis.speak(utterance);
    });
  }, [language]);

  // Unified speak
  const speak = useCallback(async (text: string) => {
    if (azureAvailable) {
      await speakAzure(text);
    } else {
      await speakWebSpeech(text);
    }
  }, [azureAvailable, speakAzure, speakWebSpeech]);

  // Unified stop
  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setStatus('idle');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isSpeaking: status === 'speaking',
    status,
    speak,
    stop,
    isAvailable,
    providerName,
    error,
  };
}
