import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ConsentBanner } from '@/components/consent-banner';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { Toaster } from 'sonner';
import Script from 'next/script';
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "أثر — Athar Heritage Platform",
  description: "Discover the heritage of Makkah and Madinah",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontClass = locale === 'ar'
    ? ibmPlexArabic.variable
    : geistSans.variable;

  return (
    <html lang={locale} dir={dir}>
      <head>
        {/* Umami Analytics — cookie-less, PDPL compliant */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src={process.env.NEXT_PUBLIC_UMAMI_URL || 'https://cloud.umami.is/script.js'}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </head>
      <body
        className={`${fontClass} ${geistMono.variable} antialiased ${locale === 'ar' ? 'font-[family-name:var(--font-ibm-plex-arabic)]' : 'font-[family-name:var(--font-geist-sans)]'}`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-14">
              {children}
            </main>
            <Footer />
          </div>
          <ConsentBanner />
          <ScrollToTop />
          <Toaster
            position={dir === 'rtl' ? 'top-left' : 'top-right'}
            dir={dir}
            richColors
            toastOptions={{
              className: locale === 'ar' ? 'font-[family-name:var(--font-ibm-plex-arabic)]' : '',
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
