// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: set SITE_URL to the real production domain before launch.
const site = process.env.SITE_URL ?? 'https://decobroscrew.example';

// BASE_PATH: '/decobros_site' for a GitHub Pages project site; '/' for a custom domain.
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/'),
      i18n: { defaultLocale: 'ru', locales: { ru: 'ru', en: 'en', zh: 'zh-Hans' } },
    }),
  ],
  build: { inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
});
