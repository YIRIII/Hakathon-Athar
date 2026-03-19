'use client';

import { useState, useMemo } from 'react';
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
import { useVoiceOutput } from '@/hooks/use-voice-output';
import type { STTLanguage } from '@/lib/voice/stt-provider';

interface StorytellerProps {
  siteId: string;
  siteName: string;
}

export function Storyteller({ siteId, siteName }: StorytellerProps) {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [open, setOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const voiceLang: STTLanguage = isAr ? 'ar-SA' : 'en-US';
  const tts = useVoiceOutput({ language: voiceLang });

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
        ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
        .map((p) => p.text)
        .join('') ?? '',
    )
    .join('');

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && !hasStarted) {
      setHasStarted(true);
      const prompt = isAr
        ? `اروِ لي قصة "${siteName}" بأسلوب سردي غامر وجذاب.`
        : `Tell me the story of "${siteName}" as an immersive narrative.`;
      sendMessage({ text: prompt });
    }
    if (!isOpen && tts.isSpeaking) {
      tts.stop();
    }
  };

  const handleListen = () => {
    if (tts.isSpeaking) {
      tts.stop();
    } else if (storyText) {
      tts.speak(storyText);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetTrigger
        className="inline-flex items-center gap-2 rounded-md border border-input bg-card/80 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <BookOpen className="size-4" />
        {t('sites.storyteller')}
      </SheetTrigger>
      <SheetContent side="bottom" className="flex h-[85vh] flex-col rounded-t-2xl">
        <SheetHeader className="flex-row items-center justify-between border-b pb-3">
          <SheetTitle className="font-amiri text-xl">
            {t('sites.storytellerTitle')}
          </SheetTitle>
          {storyText && tts.isAvailable && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleListen}
              className="gap-2"
            >
              {tts.isSpeaking ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
              {tts.isSpeaking ? t('chat.stopListening') : t('sites.listenToStory')}
            </Button>
          )}
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-2 py-6">
          {isLoading && !storyText && (
            <div className="flex flex-col items-center justify-center gap-4 py-16">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                {isAr ? 'جارٍ تحضير القصة...' : 'Preparing the story...'}
              </p>
            </div>
          )}

          {storyText && (
            <div className="prose prose-lg mx-auto max-w-2xl dark:prose-invert">
              <div
                className="font-amiri text-lg leading-[2] text-foreground/90 md:text-xl md:leading-[2]"
                style={{ fontFamily: isAr ? "'Amiri', 'IBM Plex Sans Arabic', serif" : "'Georgia', serif" }}
              >
                {storyText.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-6">
                    {paragraph}
                  </p>
                ))}
                {isLoading && (
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
