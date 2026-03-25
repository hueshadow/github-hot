// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// 部署到生产前将 site 改为你的域名（用于 sitemap / OG 绝对 URL）
const site = process.env.PUBLIC_SITE_URL ?? 'https://github-hot.example.com';

export default defineConfig({
  site,
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        try {
          const path = new URL(item.url).pathname;
          if (path.startsWith('/tags/')) item.priority = 0.35;
          else if (path.startsWith('/topics') || path.startsWith('/en/topics')) item.priority = 0.9;
          else if (/^\/(projects|skills)\/[^/]+\/$/.test(path)) item.priority = 0.75;
          else if (
            path === '/' ||
            path === '/en/' ||
            path === '/topics/' ||
            path === '/en/topics/'
          ) {
            item.priority = 1.0;
          }
        } catch {
          /* keep defaults */
        }
        return item;
      },
    }),
  ],
});
