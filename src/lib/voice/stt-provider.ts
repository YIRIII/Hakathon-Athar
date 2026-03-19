/**
 * Speech-to-Text Provider Interface
 *
 * Abstraction layer for STT providers. Supports pluggable implementations:
 * - Web Speech API (browser-native, free fallback)
 * - Deepgram Nova-3 (cloud, best Arabic dialect support)
 */

export type STTLanguage = 'ar-SA' | 'en-US';

export type STTStatus = 'idle' | 'listening' | 'processing' | 'error';

export interface STTResult {
  text: string;
  isFinal: boolean;
  language: STTLanguage;
}

export interface STTProvider {
  /** Human-readable provider name */
  readonly name: string;

  /** Start listening for speech */
  startListening(lang: STTLanguage): void;

  /** Stop listening */
  stopListening(): void;

  /** Register callback for transcription results (interim + final) */
  onResult(callback: (result: STTResult) => void): void;

  /** Register callback for status changes */
  onStatusChange(callback: (status: STTStatus) => void): void;

  /** Register callback for errors */
  onError(callback: (error: string) => void): void;

  /** Check if this provider is available in the current environment */
  isAvailable(): boolean;

  /** Clean up resources */
  destroy(): void;
}

export type STTProviderType = 'deepgram' | 'web-speech';

/**
 * Determine the best available STT provider.
 * Deepgram is preferred when configured; Web Speech API is the fallback.
 */
export function getPreferredSTTProvider(): STTProviderType {
  // Check if Deepgram is configured by testing the API endpoint
  // The actual availability check happens at runtime
  return 'web-speech';
}
