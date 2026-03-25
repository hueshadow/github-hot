import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async (context) => {
  const siteRoot = context.site?.href ?? context.url.origin;
  const projects = await getCollection('projects');
  const skills = await getCollection('skills');

  type Entry = (typeof projects)[0] | (typeof skills)[0];

  const all: Entry[] = [...projects, ...skills];
  all.sort((a, b) => b.data.added_at.getTime() - a.data.added_at.getTime());

  return rss({
    title: 'GitHub Hot',
    description: '精选 GitHub 热门开源项目与 Agent Skills 的新收录与更新聚合。',
    site: siteRoot,
    items: all.map((entry) => {
      const path =
        entry.collection === 'projects' ? `/projects/${entry.slug}/` : `/skills/${entry.slug}/`;
      return {
        title: entry.data.name,
        description: entry.data.description,
        pubDate: entry.data.added_at,
        link: new URL(path, siteRoot).href,
      };
    }),
    trailingSlash: true,
  });
};
