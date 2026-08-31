import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://insureestimate.com',
  output: 'static',
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  integrations: [react(), tailwind(), sitemap()],
});
