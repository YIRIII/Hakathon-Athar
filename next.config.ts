import createNextIntlPlugin from 'next-intl/plugin';
import { withSentryConfig } from '@sentry/nextjs';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {};

const config = withNextIntl(nextConfig);

// Wrap with Sentry only if DSN is configured
export default process.env.NEXT_PUBLIC_SENTRY_DSN
  ? withSentryConfig(config, {
      silent: true,
    })
  : config;
