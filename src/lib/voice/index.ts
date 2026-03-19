/**
 * Voice AI Module — Athar Heritage Platform
 *
 * Provides speech-to-text (STT) and text-to-speech (TTS) capabilities
 * for the AI heritage chatbot. Uses a hybrid approach:
 *
 * STT: Deepgram Nova-3 (primary) + Web Speech API (fallback)
 * TTS: Azure Neural TTS (primary) + Web Speech Synthesis (fallback)
 *
 * All providers implement a common interface for easy swapping.
 */

// STT
export type { STTProvider, STTLanguage, STTResult, STTStatus } from './stt-provider';
export { WebSpeechSTT } from './web-speech-stt';
export { DeepgramSTT } from './deepgram-stt';

// TTS
export type { TTSProvider, TTSLanguage, TTSStatus, TTSOptions } from './tts-provider';
export { WebSpeechTTS } from './web-speech-tts';
