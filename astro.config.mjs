// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://mfhglobal.football',
  output: 'static',

  // The team page moved from /staff to /team. Keep the old URLs working.
  redirects: {
    '/staff': '/team',
    '/es/staff': '/es/team',
    '/fr/staff': '/fr/team',
    '/it/staff': '/it/team',
    '/pt/staff': '/pt/team',
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'it', 'pt'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      // The player questionnaire is unlisted/noindex, keep it out of the sitemap.
      filter: (page) => !page.includes('/questionnaire'),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es', fr: 'fr', it: 'it', pt: 'pt-PT' },
      },
    }),
  ],

  adapter: vercel(),
});