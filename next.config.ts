import createNextIntlPlugin from 'next-intl/plugin';
import { withSentryConfig } from '@sentry/nextjs';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https' as const,
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https' as const,
        hostname: 'madainproject.com',
      },
      {
        protocol: 'https' as const,
        hostname: 'www.islamiclandmarks.com',
      },
      {
        protocol: 'http' as const,
        hostname: 'www.islamiclandmarks.com',
      },
    ],
  },
};

const config = withNextIntl(nextConfig);

// Wrap with Sentry only if DSN is configured
export default process.env.NEXT_PUBLIC_SENTRY_DSN
  ? withSentryConfig(config, {
      silent: true,
    })
  : config;
