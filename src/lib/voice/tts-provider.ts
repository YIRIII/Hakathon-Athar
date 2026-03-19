/**
 * Text-to-Speech Provider Interface
 *
 * Abstraction layer for TTS providers. Supports pluggable implementations:
 * - Web Speech Synthesis (browser-native, free fallback)
 * - Azure Neural TTS (cloud, best Arabic pronunciation)
 */

export type TTSLanguage = 'ar-SA' | 'en-US';

export type TTSStatus = 'idle' | 'loading' | 'speaking' | 'error';

export interface TTSOptions {
  /** Speech rate: 0.5 (slow) to 2.0 (fast), default 1.0 */
  rate?: number;
  /** Pitch: 0.5 to 2.0, default 1.0 */
  pitch?: number;
  /** Voice name (provider-specific) */
  voice?: string;
}

export interface TTSProvider {
  /** Human-readable provider name */
  readonly name: string;

  /** Speak the given text */
  speak(text: string, lang: TTSLanguage, options?: TTSOptions): Promise<void>;

  /** Stop speaking */
  stop(): void;

  /** Register callback for status changes */
  onStatusChange(callback: (status: TTSStatus) => void): void;

  /** Register callback for errors */
  onError(callback: (error: string) => void): void;

  /** Check if this provider is available */
  isAvailable(): boolean;

  /** Clean up resources */
  destroy(): void;
}
