import { defineCollection, z } from 'astro:content';

const projectBase = z.object({
  name: z.string(),
  /** 在 frontmatter 中写 `slug: "xxx"`（含连字符请加引号）；由 Astro 映射为 `entry.slug`，勿在 schema 中重复声明 */
  repo_url: z.string().url(),
  /** 展示用分类名，如「数据 / 爬虫」 */
  category: z.string(),
  /** URL 用稳定 slug，如 data-crawler */
  category_slug: z.string(),
  tags: z.array(z.string()).default([]),
  description: z.string(),
  logo: z.string().optional(),
  homepage: z.string().url().optional(),
  docs_url: z.string().url().optional(),
  stars: z.number().int().nonnegative().default(0),
  forks: z.number().int().nonnegative().default(0),
  language: z.string().default('—'),
  last_updated: z.string(),
  added_at: z.coerce.date(),
  is_featured: z.boolean().default(false),
  /** 搜索同义词 / 英文写法，供话题页聚合，不替代 tags 展示 */
  seo_aliases: z.array(z.string()).default([]),
  /** 可选：覆盖 <title> */
  seo_title: z.string().optional(),
  /** 可选：覆盖 meta description */
  seo_description: z.string().optional(),
});

const projects = defineCollection({
  type: 'content',
  schema: projectBase,
});

const skills = defineCollection({
  type: 'content',
  schema: projectBase.extend({
    compatible_with: z.array(z.string()).default([]),
    install_command: z.string().optional(),
    skill_type: z.string(),
  }),
});

export const collections = { projects, skills };
