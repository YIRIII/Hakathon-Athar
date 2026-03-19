/**
 * useVoiceInput — React hook for voice-to-text input
 *
 * Provides a simple interface for voice input in the chat.
 * Auto-detects the best available STT provider:
 * - Deepgram Nova-3 if API key is configured (best Arabic support)
 * - Web Speech API as free fallback (works in Chrome, Edge)
 *
 * Usage:
 *   const { isListening, transcript, startListening, stopListening, isAvailable } = useVoiceInput();
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { STTLanguage, STTStatus } from '@/lib/voice/stt-provider';

interface UseVoiceInputOptions {
  /** Language for speech recognition */
  language?: STTLanguage;
  /** Called when a final transcript is ready */
  onTranscript?: (text: string) => void;
  /** Called on interim (partial) results */
  onInterimResult?: (text: string) => void;
}

interface UseVoiceInputReturn {
  /** Whether voice input is currently listening */
  isListening: boolean;
  /** Current STT status */
  status: STTStatus;
  /** The latest interim transcript (updates in real-time) */
  interimText: string;
  /** Start listening for voice input */
  startListening: () => void;
  /** Stop listening */
  stopListening: () => void;
  /** Whether voice input is available in this browser */
  isAvailable: boolean;
  /** Which STT provider is active */
  providerName: string;
  /** Error message if any */
  error: string | null;
}

export function useVoiceInput(options: UseVoiceInputOptions = {}): UseVoiceInputReturn {
  const { language = 'ar-SA', onTranscript, onInterimResult } = options;

  const [status, setStatus] = useState<STTStatus>('idle');
  const [interimText, setInterimText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [providerName, setProviderName] = useState('');
  const [deepgramAvailable, setDeepgramAvailable] = useState(false);

  // Use refs for callbacks to avoid stale closures
  const onTranscriptRef = useRef(onTranscript);
  const onInterimRef = useRef(onInterimResult);
  onTranscriptRef.current = onTranscript;
  onInterimRef.current = onInterimResult;

  // MediaRecorder ref for Deepgram recording
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Web Speech API recognition ref
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Check provider availability on mount
  useEffect(() => {
    const checkAvailability = async () => {
      // Check if Deepgram is configured server-side
      try {
        const res = await fetch('/api/voice/stt');
        const data = await res.json();
        if (data.provider === 'deepgram') {
          setDeepgramAvailable(true);
          setProviderName('Deepgram Nova-3');
          setIsAvailable(true);
          return;
        }
      } catch {
        // Deepgram not available
      }

      // Fall back to Web Speech API
      if (typeof window !== 'undefined') {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
          setProviderName('Web Speech API');
          setIsAvailable(true);
          return;
        }
      }

      setIsAvailable(false);
      setProviderName('');
    };

    checkAvailability();
  }, []);

  // Deepgram recording flow
  const startDeepgramRecording = useCallback(async () => {
    setError(null);
    setStatus('processing');
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      mediaStreamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        // Send recorded audio to Deepgram proxy
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        if (audioBlob.size === 0) {
          setStatus('idle');
          return;
        }

        setStatus('processing');
        try {
          const res = await fetch(`/api/voice/stt?lang=${language}`, {
            method: 'POST',
            body: audioBlob,
            headers: { 'Content-Type': mimeType },
          });

          const data = await res.json();
          if (data.error) {
            setError(data.error);
            setStatus('error');
            return;
          }

          if (data.text) {
            onTranscriptRef.current?.(data.text);
          }
          setStatus('idle');
        } catch {
          setError('Failed to transcribe audio');
          setStatus('error');
        }

        // Clean up stream
        stream.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;
      };

      recorder.start(250);
      setStatus('listening');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Microphone access failed';
      setError(msg.includes('Permission') || msg.includes('NotAllowed')
        ? 'Microphone access denied. Please allow microphone permission.'
        : msg);
      setStatus('error');
    }
  }, [language]);

  const stopDeepgramRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  // Web Speech API flow
  const startWebSpeechRecording = useCallback(() => {
    setError(null);
    setInterimText('');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition not available');
      setStatus('error');
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setStatus('listening');

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.results.length - 1];
      if (!result) return;

      const text = result[0].transcript;

      if (result.isFinal) {
        setInterimText('');
        onTranscriptRef.current?.(text);
        setStatus('idle');
      } else {
        setInterimText(text);
        onInterimRef.current?.(text);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === 'no-speech' || event.error === 'aborted') {
        setStatus('idle');
        return;
      }

      const messages: Record<string, string> = {
        'not-allowed': 'Microphone access denied. Please allow microphone permission.',
        'audio-capture': 'No microphone found.',
        'network': 'Network error during speech recognition.',
      };
      setError(messages[event.error] || `Speech error: ${event.error}`);
      setStatus('error');
    };

    recognition.onend = () => {
      setStatus('idle');
      recognitionRef.current = null;
    };

    try {
      recognition.start();
    } catch {
      setError('Failed to start speech recognition');
      setStatus('error');
    }
  }, [language]);

  const stopWebSpeechRecording = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Already stopped
      }
      recognitionRef.current = null;
    }
    setStatus('idle');
  }, []);

  // Unified start/stop
  const startListening = useCallback(() => {
    if (deepgramAvailable) {
      startDeepgramRecording();
    } else {
      startWebSpeechRecording();
    }
  }, [deepgramAvailable, startDeepgramRecording, startWebSpeechRecording]);

  const stopListening = useCallback(() => {
    if (deepgramAvailable) {
      stopDeepgramRecording();
    } else {
      stopWebSpeechRecording();
    }
  }, [deepgramAvailable, stopDeepgramRecording, stopWebSpeechRecording]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopWebSpeechRecording();
      stopDeepgramRecording();
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [stopWebSpeechRecording, stopDeepgramRecording]);

  return {
    isListening: status === 'listening',
    status,
    interimText,
    startListening,
    stopListening,
    isAvailable,
    providerName,
    error,
  };
}
