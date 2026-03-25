import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function loadAllContent() {
  const projects = await getCollection('projects');
  const skills = await getCollection('skills');
  return { projects, skills };
}

export type CategoryItem = {
  slug: string;
  label: string;
  count: number;
};

/** 合并 projects + skills 的分类去重 */
export function collectCategories(
  projects: CollectionEntry<'projects'>[],
  skills: CollectionEntry<'skills'>[],
): CategoryItem[] {
  const map = new Map<string, { label: string; count: number }>();
  const add = (slug: string, label: string) => {
    const cur = map.get(slug);
    if (cur) cur.count += 1;
    else map.set(slug, { label, count: 1 });
  };
  for (const p of projects) {
    add(p.data.category_slug, p.data.category);
  }
  for (const s of skills) {
    add(s.data.category_slug, s.data.category);
  }
  return [...map.entries()]
    .map(([slug, v]) => ({ slug, label: v.label, count: v.count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'zh-CN'));
}

export function collectTags(
  projects: CollectionEntry<'projects'>[],
  skills: CollectionEntry<'skills'>[],
): string[] {
  const set = new Set<string>();
  for (const p of projects) p.data.tags.forEach((t) => set.add(t));
  for (const s of skills) s.data.tags.forEach((t) => set.add(t));
  return [...set].sort((a, b) => a.localeCompare(b, 'zh-CN'));
}
