import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import path from 'path';

if (process.env.NODE_ENV === 'development') initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  // Force Turbopack to recognize THIS folder as the root
  turbopack: {
    root: __dirname
  }
};

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl(nextConfig);