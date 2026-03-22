'use client';

import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useTranslations, useLocale } from 'next-intl';
import { BookOpen, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface StorytellerProps {
  siteId: string;
  siteName: string;
  fallbackText: string;
}

/** Renders text with smooth color-based highlighting synced to TTS boundary events.
 *  Words already spoken get primary color, upcoming words stay muted — no jarring background pop. */
function HighlightedText({
  text,
  currentCharIndex,
}: {
  text: string;
  currentCharIndex: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Tokenize text into word and whitespace segments with char offsets
  const tokens = useMemo(() => {
    const result: { text: string; start: number; isWord: boolean }[] = [];
    const regex = /(\S+|\s+)/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      result.push({
        text: match[0],
        start: match.index,
        isWord: /\S/.test(match[0]),
      });
    }
    return result;
  }, [text]);

  // Find which token is being spoken
  const activeTokenIndex = useMemo(() => {
    if (currentCharIndex < 0) return -1;
    return tokens.findIndex(
      (t) =>
        t.isWord &&
        currentCharIndex >= t.start &&
        currentCharIndex < t.start + t.text.length,
    );
  }, [tokens, currentCharIndex]);

  // Auto-scroll to keep active word visible
  useEffect(() => {
    if (activeTokenIndex < 0 || !containerRef.current) return;
    const el = containerRef.current.querySelector(
      `[data-tidx="${activeTokenIndex}"]`,
    );
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [activeTokenIndex]);

  // Render with paragraph breaks preserved
  const paragraphs = text.split('\n\n');
  let globalOffset = 0;

  return (
    <div ref={containerRef}>
      {paragraphs.map((paragraph, pIdx) => {
        const pStart = globalOffset;
        globalOffset += paragraph.length + 2; // +2 for \n\n

        // Get tokens that belong to this paragraph
        const pTokens = tokens.filter(
          (t) => t.start >= pStart && t.start < pStart + paragraph.length,
        );

        return (
          <p key={pIdx} className="mb-6">
            {pTokens.map((token, tIdx) => {
              if (!token.isWord) {
                return <span key={tIdx}>{token.text}</span>;
              }
              const globalIdx = tokens.indexOf(token);
              // Smooth coloring: spoken words = primary, current = primary bold, upcoming = muted
              const isSpoken = activeTokenIndex >= 0 && globalIdx < activeTokenIndex;
              const isActive = globalIdx === activeTokenIndex;
              const isUpcoming = activeTokenIndex >= 0 && globalIdx > activeTokenIndex;
              return (
                <span
                  key={tIdx}
                  data-tidx={globalIdx}
                  className={[
                    'transition-colors duration-500 ease-out',
                    isActive
                      ? 'text-primary font-semibold'
                      : isSpoken
                        ? 'text-foreground'
                        : isUpcoming
                          ? 'text-muted-foreground/50'
                          : '',
                  ].join(' ')}
                >
                  {token.text}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}

export function Storyteller({
  siteId,
  siteName,
  fallbackText,
}: StorytellerProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [open, setOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  // TTS state — direct Web Speech for boundary event access
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(-1);
  const [ttsAvailable, setTtsAvailable] = useState(false);
  const isSpeakingRef = useRef(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    setTtsAvailable(true);
    // Pre-load voices (they load async in some browsers)
    window.speechSynthesis.getVoices();
    const handleVoices = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener('voiceschanged', handleVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', handleVoices);
  }, []);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/chat',
        body: {
          siteId,
          locale,
          systemPrompt: isAr
            ? `أنت راوٍ بليغ ومتخصص في التراث الإسلامي. اروِ قصة "${siteName}" كسرد غامر وجذاب. استخدم لغة أدبية عربية فصيحة مع أسلوب شائق ومثير. لا تستخدم عناوين أو نقاط — اكتب نصًّا سرديًا متدفقًا.`
            : `You are an eloquent storyteller specializing in Islamic heritage. Tell the full story of "${siteName}" as an immersive, engaging narrative. Use rich, literary English with vivid descriptions. Do not use headings or bullet points — write flowing narrative prose.`,
        },
      }),
    [siteId, locale, siteName, isAr],
  );

  const { messages, sendMessage, status } = useChat({ transport });

  const isLoading = status === 'streaming' || status === 'submitted';

  const storyText = messages
    .filter((m) => m.role === 'assistant')
    .map((m) =>
      m.parts
        ?.filter(
          (p): p is { type: 'text'; text: string } => p.type === 'text',
        )
        .map((p) => p.text)
        .join('') ?? '',
    )
    .join('');

  // Fallback to site data if AI fails or returns nothing
  useEffect(() => {
    if (hasStarted && status === 'error') {
      setUseFallback(true);
    }
    if (
      hasStarted &&
      status === 'ready' &&
      !storyText &&
      messages.length > 0
    ) {
      setUseFallback(true);
    }
  }, [hasStarted, status, storyText, messages.length]);

  const displayText = useFallback ? fallbackText : storyText;

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && !hasStarted) {
      setHasStarted(true);
      const prompt = isAr
        ? `اروِ لي قصة "${siteName}" بأسلوب سردي غامر وجذاب.`
        : `Tell me the story of "${siteName}" as an immersive narrative.`;
      sendMessage({ text: prompt });
    }
    if (!isOpen) {
      stopSpeaking();
    }
  };

  /** Pick the best available voice — prefer natural/premium over robotic defaults */
  const getBestVoice = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();
    const langPrefix = isAr ? 'ar' : 'en';
    const langVoices = voices.filter((v) => v.lang.startsWith(langPrefix));
    if (langVoices.length === 0) return undefined;

    // Prefer voices with "Natural", "Premium", "Enhanced", "Samantha", "Daniel" in the name
    // These are the high-quality system voices on macOS/iOS/Chrome
    const preferredKeywords = ['natural', 'premium', 'enhanced', 'samantha', 'daniel', 'karen', 'moira', 'google'];
    const premium = langVoices.find((v) => {
      const name = v.name.toLowerCase();
      return preferredKeywords.some((kw) => name.includes(kw));
    });
    if (premium) return premium;

    // Fallback: prefer non-default local voices (usually better quality)
    const nonDefault = langVoices.find((v) => !v.localService || !v.default);
    return nonDefault ?? langVoices[0];
  }, [isAr]);

  /** Split text into sentence-sized chunks to avoid the browser TTS bug
   *  where long utterances silently stop mid-way (common in Safari & Chrome). */
  const chunkText = useCallback((text: string): string[] => {
    // Split on sentence boundaries — period/exclamation/question followed by space
    const sentences = text.match(/[^.!?…]+[.!?…]+[\s]*/g) ?? [text];
    const chunks: string[] = [];
    let current = '';
    for (const sentence of sentences) {
      if ((current + sentence).length > 200 && current) {
        chunks.push(current.trim());
        current = sentence;
      } else {
        current += sentence;
      }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks;
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    isSpeakingRef.current = false;
    setIsSpeaking(false);
    setCurrentCharIndex(-1);
  }, []);

  const handleListen = useCallback(() => {
    if (!displayText) return;

    // If currently speaking, just stop
    if (isSpeakingRef.current) {
      stopSpeaking();
      return;
    }

    // Fully cancel any leftover speech
    window.speechSynthesis.cancel();

    // Small delay so the engine fully resets before speaking fresh
    setTimeout(() => {
      const chunks = chunkText(displayText);
      let charOffset = 0;
      let chunkIndex = 0;

      const speakChunk = (idx: number) => {
        if (idx >= chunks.length) {
          isSpeakingRef.current = false;
          setIsSpeaking(false);
          setCurrentCharIndex(-1);
          return;
        }

        const chunk = chunks[idx];
        const thisOffset = charOffset;
        charOffset += chunk.length + 1; // +1 for the space between chunks

        const utterance = new SpeechSynthesisUtterance(chunk);
        utteranceRef.current = utterance;
        utterance.lang = isAr ? 'ar-SA' : 'en-US';
        utterance.rate = 0.92;
        utterance.pitch = 1.0;

        const bestVoice = getBestVoice();
        if (bestVoice) utterance.voice = bestVoice;

        utterance.onstart = () => {
          isSpeakingRef.current = true;
          setIsSpeaking(true);
        };

        utterance.onend = () => {
          // Speak next chunk
          chunkIndex = idx + 1;
          speakChunk(chunkIndex);
        };

        utterance.onerror = (e) => {
          if (e.error === 'canceled' || e.error === 'interrupted') return;
          console.error('Speech error:', e.error);
          isSpeakingRef.current = false;
          setIsSpeaking(false);
          setCurrentCharIndex(-1);
        };

        utterance.onboundary = (event) => {
          if (event.name === 'word') {
            setCurrentCharIndex(thisOffset + event.charIndex);
          }
        };

        window.speechSynthesis.speak(utterance);
      };

      speakChunk(0);
    }, 120);
  }, [displayText, isAr, getBestVoice, chunkText, stopSpeaking]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopSpeaking();
  }, [stopSpeaking]);

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetTrigger className="inline-flex items-center gap-2 rounded-md border border-input bg-card/80 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground">
        <BookOpen className="size-4" />
        {t('sites.storyteller')}
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="flex h-[80dvh] max-h-[85vh] flex-col rounded-t-2xl sm:h-[85vh]"
        showCloseButton={false}
      >
        {/* Drag handle — visual cue that sheet can be dismissed */}
        <div className="flex justify-center pb-1 pt-3">
          <div className="h-1.5 w-12 rounded-full bg-muted-foreground/30" />
        </div>

        <SheetHeader className="flex-row items-center justify-between border-b px-4 pb-3">
          <SheetTitle className="font-amiri text-xl">
            {t('sites.storytellerTitle')}
          </SheetTitle>
          <div className="flex items-center gap-2">
            {displayText && ttsAvailable && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleListen}
                className="gap-2"
              >
                {isSpeaking ? (
                  <VolumeX className="size-4" />
                ) : (
                  <Volume2 className="size-4" />
                )}
                {isSpeaking
                  ? t('chat.stopListening')
                  : t('sites.listenToStory')}
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="size-8 p-0"
              onClick={() => handleOpen(false)}
            >
              <span className="text-lg">&times;</span>
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-2 py-6">
          {isLoading && !displayText && (
            <div className="flex flex-col items-center justify-center gap-4 py-16">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                {isAr ? 'جارٍ تحضير القصة...' : 'Preparing the story...'}
              </p>
            </div>
          )}

          {displayText && (
            <div className="mx-auto max-w-2xl">
              <div
                className="font-amiri text-lg leading-[2] text-foreground/90 md:text-xl md:leading-[2]"
                style={{
                  fontFamily: isAr
                    ? "'Amiri', 'IBM Plex Sans Arabic', serif"
                    : "'Amiri', 'Georgia', serif",
                }}
              >
                {isSpeaking || currentCharIndex >= 0 ? (
                  <HighlightedText
                    text={displayText}
                    currentCharIndex={currentCharIndex}
                  />
                ) : (
                  displayText.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-6">
                      {paragraph}
                    </p>
                  ))
                )}
                {isLoading && !useFallback && (
                  <span className="inline-block size-2 animate-pulse rounded-full bg-primary" />
                )}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
