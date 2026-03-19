'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { suggestedQuestions } from '@/data/suggested-questions';
import { useVoiceInput } from '@/hooks/use-voice-input';
import { useVoiceOutput } from '@/hooks/use-voice-output';
import type { STTLanguage } from '@/lib/voice/stt-provider';

interface ChatInterfaceProps {
  siteId?: string;
}

export function ChatInterface({ siteId }: ChatInterfaceProps) {
  const t = useTranslations('chat');
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [input, setInput] = useState('');

  const voiceLang: STTLanguage = locale === 'ar' ? 'ar-SA' : 'en-US';

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/chat',
        body: { siteId, locale },
      }),
    [siteId, locale],
  );

  const {
    messages,
    sendMessage,
    status,
    error,
  } = useChat({
    transport,
    onError: () => {
      setErrorMessage(
        locale === 'ar'
          ? 'حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.'
          : 'An error occurred while processing your request. Please try again.',
      );
    },
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  // Voice input hook
  const voice = useVoiceInput({
    language: voiceLang,
    onTranscript: (text) => {
      if (text.trim()) {
        setErrorMessage(null);
        sendMessage({ text });
      }
    },
  });

  // Voice output hook (TTS for assistant responses)
  const tts = useVoiceOutput({ language: voiceLang });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSuggestedQuestion = (questionId: string) => {
    const question = suggestedQuestions.find((q) => q.id === questionId);
    if (!question) return;

    const questionText = locale === 'ar' ? question.text_ar : question.text_en;
    setErrorMessage(null);
    sendMessage({ text: questionText });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setErrorMessage(null);
    sendMessage({ text: input });
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!input.trim() || isLoading) return;
      setErrorMessage(null);
      sendMessage({ text: input });
      setInput('');
    }
  };

  const handleVoiceToggle = () => {
    if (voice.isListening) {
      voice.stopListening();
    } else {
      voice.startListening();
    }
  };

  const handleListenToMessage = (text: string) => {
    if (tts.isSpeaking) {
      tts.stop();
    } else {
      tts.speak(text);
    }
  };

  const showWelcome = messages.length === 0;

  return (
    <div className="flex h-full flex-col">
      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        {showWelcome ? (
          <div className="flex h-full flex-col items-center justify-center gap-6 py-12">
            {/* Welcome icon */}
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <svg
                className="size-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
            </div>
            <p className="max-w-sm text-center text-muted-foreground">
              {t('welcome')}
            </p>

            {/* Suggested questions */}
            <div className="w-full max-w-md">
              <p className="mb-3 text-center text-sm font-medium text-muted-foreground">
                {t('suggestedQuestions')}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleSuggestedQuestion(q.id)}
                    disabled={isLoading}
                    className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
                  >
                    {locale === 'ar' ? q.text_ar : q.text_en}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => {
              const textContent =
                msg.parts
                  ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
                  .map((p) => p.text)
                  .join('') ?? '';

              return (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex max-w-[80%] flex-col gap-1">
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
                        msg.role === 'user'
                          ? 'rounded-ee-sm bg-primary text-primary-foreground'
                          : 'rounded-es-sm bg-card ring-1 ring-foreground/10 text-card-foreground'
                      }`}
                    >
                      <MessageContent
                        content={textContent}
                        role={msg.role as 'user' | 'assistant'}
                      />
                    </div>

                    {/* Listen button for assistant messages */}
                    {msg.role === 'assistant' && textContent && tts.isAvailable && (
                      <button
                        onClick={() => handleListenToMessage(textContent)}
                        className="flex items-center gap-1 self-start text-xs text-muted-foreground transition-colors hover:text-primary"
                        aria-label={tts.isSpeaking ? t('stopListening') : t('listenToResponse')}
                      >
                        {tts.isSpeaking ? (
                          <>
                            <SpeakerWaveIcon className="size-3.5" />
                            <span>{t('stopListening')}</span>
                          </>
                        ) : (
                          <>
                            <SpeakerIcon className="size-3.5" />
                            <span>{t('listenToResponse')}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isLoading &&
              messages.length > 0 &&
              messages[messages.length - 1].role === 'user' && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-es-sm bg-card px-4 py-3 ring-1 ring-foreground/10">
                    <div className="flex gap-1.5">
                      <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
                      <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
                      <span className="size-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}

            {/* Error message */}
            {(error || errorMessage) && (
              <div className="flex justify-center">
                <div className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
                  {errorMessage ||
                    (locale === 'ar'
                      ? 'حدث خطأ. يرجى المحاولة مرة أخرى.'
                      : 'An error occurred. Please try again.')}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Voice listening overlay */}
      {voice.isListening && (
        <div className="border-t bg-primary/5 px-4 py-3">
          <div className="mx-auto flex max-w-2xl items-center justify-center gap-3">
            <VoicePulse />
            <span className="text-sm font-medium text-primary">
              {voice.status === 'processing' ? t('voiceProcessing') : t('voiceListening')}
            </span>
            {voice.interimText && (
              <span className="max-w-xs truncate text-sm text-muted-foreground">
                {voice.interimText}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Voice error */}
      {voice.error && (
        <div className="border-t bg-destructive/5 px-4 py-2 text-center text-xs text-destructive">
          {voice.error}
        </div>
      )}

      {/* Input area */}
      <div className="border-t bg-background p-4">
        <form
          onSubmit={onSubmit}
          className="mx-auto flex max-w-2xl items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('placeholder')}
            className="flex-1"
            disabled={isLoading || voice.isListening}
          />

          {/* Microphone button — shown when voice is available */}
          {voice.isAvailable && (
            <Button
              type="button"
              size="icon"
              variant={voice.isListening ? 'destructive' : 'outline'}
              onClick={handleVoiceToggle}
              disabled={isLoading}
              aria-label={voice.isListening ? t('voiceStop') : t('voiceStart')}
              className={`relative shrink-0 ${voice.isListening ? 'animate-pulse' : ''}`}
            >
              {voice.isListening ? (
                <StopIcon className="size-4" />
              ) : (
                <MicIcon className="size-4" />
              )}
            </Button>
          )}

          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            aria-label={t('send')}
          >
            <svg
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </Button>
        </form>

        {/* Powered by AI */}
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {t('poweredBy')}
        </p>
      </div>
    </div>
  );
}

/**
 * Animated voice pulse indicator — shows when actively listening.
 * Three concentric rings that pulse outward like sound waves.
 */
function VoicePulse() {
  return (
    <div className="relative flex size-8 items-center justify-center">
      <div className="absolute size-8 animate-ping rounded-full bg-primary/20 [animation-duration:1.5s]" />
      <div className="absolute size-6 animate-ping rounded-full bg-primary/30 [animation-duration:1.5s] [animation-delay:200ms]" />
      <div className="size-4 rounded-full bg-primary" />
    </div>
  );
}

/** Microphone icon */
function MicIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  );
}

/** Stop icon */
function StopIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

/** Speaker icon (not playing) */
function SpeakerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>
  );
}

/** Speaker wave icon (playing) */
function SpeakerWaveIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>
  );
}

/**
 * Renders message content with source citation parsing.
 * Detects [Source: ...] patterns and renders them as styled badges.
 */
function MessageContent({
  content,
  role,
}: {
  content: string;
  role: 'user' | 'assistant';
}) {
  if (role === 'user') {
    return <>{content}</>;
  }

  // Parse source citations from the content
  const sourcePattern = /\[(?:Source|المصدر):\s*([^\]]+)\]/g;
  const sources: string[] = [];
  let match;
  while ((match = sourcePattern.exec(content)) !== null) {
    if (!sources.includes(match[1].trim())) {
      sources.push(match[1].trim());
    }
  }

  // Remove source citations from displayed text
  const cleanedContent = content
    .replace(/\[(?:Source|المصدر):\s*[^\]]+\]/g, '')
    .trim();

  return (
    <>
      {cleanedContent}
      {sources.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1 border-t border-foreground/5 pt-2">
          {sources.map((source) => (
            <span
              key={source}
              className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
            >
              {source}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
