/**
 * Web Speech API STT Provider
 *
 * Browser-native speech recognition — zero cost, zero setup.
 * Quality varies by device/browser. Best on Chrome (uses Google STT).
 * Arabic support depends on device vendor's speech engine.
 */

import type { STTProvider, STTLanguage, STTResult, STTStatus } from './stt-provider';

export class WebSpeechSTT implements STTProvider {
  readonly name = 'Web Speech API';

  private recognition: SpeechRecognition | null = null;
  private resultCallback: ((result: STTResult) => void) | null = null;
  private statusCallback: ((status: STTStatus) => void) | null = null;
  private errorCallback: ((error: string) => void) | null = null;
  private currentLang: STTLanguage = 'ar-SA';

  isAvailable(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  startListening(lang: STTLanguage): void {
    if (!this.isAvailable()) {
      this.errorCallback?.('Web Speech API is not available in this browser');
      this.statusCallback?.('error');
      return;
    }

    // Stop any existing session
    this.stopListening();

    this.currentLang = lang;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    this.recognition.lang = lang;
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;

    this.recognition.onstart = () => {
      this.statusCallback?.('listening');
    };

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.results.length - 1];
      if (!result) return;

      this.resultCallback?.({
        text: result[0].transcript,
        isFinal: result.isFinal,
        language: this.currentLang,
      });

      if (result.isFinal) {
        this.statusCallback?.('idle');
      }
    };

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      // 'no-speech' is common — user didn't speak, not a real error
      if (event.error === 'no-speech') {
        this.statusCallback?.('idle');
        return;
      }

      // 'aborted' happens on intentional stop
      if (event.error === 'aborted') {
        this.statusCallback?.('idle');
        return;
      }

      const errorMessages: Record<string, string> = {
        'not-allowed': 'Microphone access denied. Please allow microphone permission.',
        'audio-capture': 'No microphone found. Please connect a microphone.',
        'network': 'Network error during speech recognition.',
      };

      const message = errorMessages[event.error] || `Speech recognition error: ${event.error}`;
      this.errorCallback?.(message);
      this.statusCallback?.('error');
    };

    this.recognition.onend = () => {
      // Recognition ended (could be timeout, single utterance complete, etc.)
      this.statusCallback?.('idle');
    };

    try {
      this.recognition.start();
    } catch {
      this.errorCallback?.('Failed to start speech recognition');
      this.statusCallback?.('error');
    }
  }

  stopListening(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        // Already stopped
      }
      this.recognition = null;
    }
    this.statusCallback?.('idle');
  }

  onResult(callback: (result: STTResult) => void): void {
    this.resultCallback = callback;
  }

  onStatusChange(callback: (status: STTStatus) => void): void {
    this.statusCallback = callback;
  }

  onError(callback: (error: string) => void): void {
    this.errorCallback = callback;
  }

  destroy(): void {
    this.stopListening();
    this.resultCallback = null;
    this.statusCallback = null;
    this.errorCallback = null;
  }
}
