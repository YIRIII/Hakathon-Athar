'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import { LocaleToggle } from './locale-toggle';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/' as const, labelKey: 'home' },
  { href: '/map' as const, labelKey: 'map' },
  { href: '/passport' as const, labelKey: 'passport' },
  { href: '/chat' as const, labelKey: 'chatbot' },
] as const;

export function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-[1000] w-full border-b border-border/50 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">
            أثر
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'text-sm',
                    isActive && 'bg-muted text-foreground'
                  )}
                >
                  {t(item.labelKey)}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Right side: theme toggle, locale toggle, mobile menu */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LocaleToggle />

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger
                className="inline-flex size-9 items-center justify-center rounded-md text-sm font-medium text-foreground hover:bg-muted"
                aria-label={t('navigation')}
              >
                <MenuIcon className="size-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle className="text-primary text-start">أثر</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                      <Link key={item.href} href={item.href}>
                        <Button
                          variant="ghost"
                          size="default"
                          className={cn(
                            'w-full justify-start text-sm',
                            isActive && 'bg-muted text-foreground'
                          )}
                        >
                          {t(item.labelKey)}
                        </Button>
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {/* Gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </header>
  );
}
