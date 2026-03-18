'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { suggestedQuestions } from '@/data/suggested-questions';

interface ChatInterfaceProps {
  siteId?: string;
}

export function ChatInterface({ siteId }: ChatInterfaceProps) {
  const t = useTranslations('chat');
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [input, setInput] = useState('');

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
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'rounded-ee-sm bg-primary text-primary-foreground'
                      : 'rounded-es-sm bg-card ring-1 ring-foreground/10 text-card-foreground'
                  }`}
                >
                  <MessageContent
                    content={
                      msg.parts
                        ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
                        .map((p) => p.text)
                        .join('') ?? ''
                    }
                    role={msg.role as 'user' | 'assistant'}
                  />
                </div>
              </div>
            ))}

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
            disabled={isLoading}
          />
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
