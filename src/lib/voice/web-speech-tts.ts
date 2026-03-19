/**
 * Web Speech Synthesis TTS Provider
 *
 * Browser-native text-to-speech — zero cost, zero setup.
 * Quality varies by device. iOS has good Arabic voices pre-installed.
 * Used as free fallback when Azure TTS is not configured.
 */

import type { TTSProvider, TTSLanguage, TTSStatus, TTSOptions } from './tts-provider';

export class WebSpeechTTS implements TTSProvider {
  readonly name = 'Web Speech Synthesis';

  private statusCallback: ((status: TTSStatus) => void) | null = null;
  private errorCallback: ((error: string) => void) | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  isAvailable(): boolean {
    if (typeof window === 'undefined') return false;
    return !!window.speechSynthesis;
  }

  async speak(text: string, lang: TTSLanguage, options?: TTSOptions): Promise<void> {
    if (!this.isAvailable()) {
      this.errorCallback?.('Speech synthesis not available');
      this.statusCallback?.('error');
      return;
    }

    // Stop any current speech
    this.stop();

    return new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;

      utterance.lang = lang;
      utterance.rate = options?.rate ?? 0.9; // Slightly slower for heritage content
      utterance.pitch = options?.pitch ?? 1.0;

      // Try to find a good voice for the language
      const voices = window.speechSynthesis.getVoices();
      const langPrefix = lang.split('-')[0]; // 'ar' or 'en'
      const matchingVoice = voices.find((v) => v.lang.startsWith(langPrefix));
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onstart = () => {
        this.statusCallback?.('speaking');
      };

      utterance.onend = () => {
        this.statusCallback?.('idle');
        this.currentUtterance = null;
        resolve();
      };

      utterance.onerror = (event) => {
        if (event.error === 'canceled' || event.error === 'interrupted') {
          this.statusCallback?.('idle');
          resolve();
          return;
        }
        this.errorCallback?.(`Speech synthesis error: ${event.error}`);
        this.statusCallback?.('error');
        this.currentUtterance = null;
        resolve();
      };

      this.statusCallback?.('loading');
      window.speechSynthesis.speak(utterance);
    });
  }

  stop(): void {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.currentUtterance = null;
    this.statusCallback?.('idle');
  }

  onStatusChange(callback: (status: TTSStatus) => void): void {
    this.statusCallback = callback;
  }

  onError(callback: (error: string) => void): void {
    this.errorCallback = callback;
  }

  destroy(): void {
    this.stop();
    this.statusCallback = null;
    this.errorCallback = null;
  }
}
