'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MessageCircle } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ChatInterface } from '@/components/home/chat-interface';

interface SiteChatWidgetProps {
  siteId: string;
}

export function SiteChatWidget({ siteId }: SiteChatWidgetProps) {
  const t = useTranslations('chat');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const isAr = locale === 'ar';

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="fixed bottom-6 z-30 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-105 hover:bg-primary/90 ltr:right-6 rtl:left-6"
      >
        <MessageCircle className="size-5" />
        {t('askAboutSite')}
      </SheetTrigger>
      <SheetContent
        side={isAr ? 'left' : 'right'}
        className="flex w-full flex-col p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="flex items-center gap-2">
            <MessageCircle className="size-5 text-primary" />
            {t('askAboutSite')}
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-hidden">
          <ChatInterface siteId={siteId} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
