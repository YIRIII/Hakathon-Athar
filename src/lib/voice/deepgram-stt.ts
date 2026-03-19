/**
 * Deepgram Nova-3 STT Provider
 *
 * Cloud-based speech-to-text with best-in-class Arabic support.
 * Connects via WebSocket through a Next.js API route proxy
 * (to avoid exposing the API key in the browser).
 *
 * Features:
 * - 17 Arabic dialect variants including Gulf Arabic (ar-SA)
 * - Keyterm Prompting for Islamic heritage terminology
 * - Sub-300ms streaming latency
 * - $200 free credit (~21,700 minutes)
 */

import type { STTProvider, STTLanguage, STTResult, STTStatus } from './stt-provider';

/** Heritage terminology hints for Deepgram Keyterm Prompting */
const HERITAGE_KEYTERMS = [
  // Makkah sites
  'المسجد الحرام', 'الكعبة المشرفة', 'غار حراء', 'غار ثور',
  'جبل النور', 'منى', 'مزدلفة', 'عرفات', 'الصفا', 'المروة',
  'بئر زمزم', 'مقام إبراهيم', 'الحجر الأسود',
  // Madinah sites
  'المسجد النبوي', 'الروضة الشريفة', 'جبل أحد', 'مسجد قباء',
  'البقيع', 'مسجد القبلتين',
  // Islamic terms
  'الحج', 'العمرة', 'الطواف', 'السعي', 'التراث الإسلامي',
  // English equivalents
  'Masjid al-Haram', 'Kaaba', 'Cave of Hira', 'Cave of Thawr',
  'Mount Uhud', 'Quba Mosque', 'Al-Masjid an-Nabawi',
  'Zamzam Well', 'Maqam Ibrahim',
];

export class DeepgramSTT implements STTProvider {
  readonly name = 'Deepgram Nova-3';

  private mediaStream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private socket: WebSocket | null = null;
  private resultCallback: ((result: STTResult) => void) | null = null;
  private statusCallback: ((status: STTStatus) => void) | null = null;
  private errorCallback: ((error: string) => void) | null = null;
  private currentLang: STTLanguage = 'ar-SA';
  private isListening = false;

  isAvailable(): boolean {
    if (typeof window === 'undefined') return false;
    return !!navigator.mediaDevices?.getUserMedia && typeof WebSocket !== 'undefined';
  }

  async startListening(lang: STTLanguage): Promise<void> {
    if (!this.isAvailable()) {
      this.errorCallback?.('MediaDevices API not available');
      this.statusCallback?.('error');
      return;
    }

    this.stopListening();
    this.currentLang = lang;
    this.statusCallback?.('processing');

    try {
      // Get microphone access
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      // Connect to our proxy API route via WebSocket
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/voice/stt?lang=${lang}`;

      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        this.isListening = true;
        this.statusCallback?.('listening');
        this.startRecording();
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'transcript') {
            this.resultCallback?.({
              text: data.text,
              isFinal: data.isFinal,
              language: this.currentLang,
            });
          } else if (data.type === 'error') {
            this.errorCallback?.(data.message);
            this.statusCallback?.('error');
          }
        } catch {
          // Ignore non-JSON messages
        }
      };

      this.socket.onerror = () => {
        this.errorCallback?.('Connection to speech service failed');
        this.statusCallback?.('error');
        this.cleanup();
      };

      this.socket.onclose = () => {
        if (this.isListening) {
          this.statusCallback?.('idle');
          this.isListening = false;
        }
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to access microphone';

      if (message.includes('Permission denied') || message.includes('NotAllowed')) {
        this.errorCallback?.('Microphone access denied. Please allow microphone permission.');
      } else {
        this.errorCallback?.(message);
      }

      this.statusCallback?.('error');
      this.cleanup();
    }
  }

  private startRecording(): void {
    if (!this.mediaStream || !this.socket) return;

    // Use MediaRecorder to capture audio chunks
    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : 'audio/webm';

    this.mediaRecorder = new MediaRecorder(this.mediaStream, {
      mimeType,
      audioBitsPerSecond: 16000,
    });

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0 && this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send(event.data);
      }
    };

    // Send audio chunks every 250ms for real-time streaming
    this.mediaRecorder.start(250);
  }

  stopListening(): void {
    this.isListening = false;
    this.cleanup();
    this.statusCallback?.('idle');
  }

  private cleanup(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      try {
        this.mediaRecorder.stop();
      } catch {
        // Already stopped
      }
    }
    this.mediaRecorder = null;

    if (this.socket) {
      try {
        this.socket.close();
      } catch {
        // Already closed
      }
    }
    this.socket = null;

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
    }
    this.mediaStream = null;
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

  /** Get heritage keyterms for Deepgram's Keyterm Prompting */
  static getKeyterms(): string[] {
    return HERITAGE_KEYTERMS;
  }
}
