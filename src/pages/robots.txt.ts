import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('http://localhost:4321');
  const sitemapUrl = new URL('sitemap-index.xml', base).href;
  const lines = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemapUrl}`, ''];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
