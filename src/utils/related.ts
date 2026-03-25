import type { CollectionEntry } from 'astro:content';

type AnyEntry = CollectionEntry<'projects'> | CollectionEntry<'skills'>;

function tagOverlap(a: string[], b: string[]): number {
  const setB = new Set(b);
  return a.filter((t) => setB.has(t)).length;
}

function isSameEntry(a: AnyEntry, b: AnyEntry): boolean {
  return a.collection === b.collection && a.id === b.id;
}

/**
 * 相关推荐：同 category_slug 优先，其次标签交集最多，排除自身。
 */
export function getRelatedEntries(
  current: AnyEntry,
  allProjects: CollectionEntry<'projects'>[],
  allSkills: CollectionEntry<'skills'>[],
  limit = 6,
): Array<{ entry: AnyEntry; kind: 'project' | 'skill' }> {
  const combined: Array<{ entry: AnyEntry; kind: 'project' | 'skill' }> = [
    ...allProjects.map((e) => ({ entry: e, kind: 'project' as const })),
    ...allSkills.map((e) => ({ entry: e, kind: 'skill' as const })),
  ];

  const others = combined.filter((x) => !isSameEntry(x.entry, current));

  const scored = others.map((x) => {
    const sameCat =
      x.entry.data.category_slug === current.data.category_slug ? 1000 : 0;
    const overlap = tagOverlap(current.data.tags, x.entry.data.tags);
    const stars = x.entry.data.stars ?? 0;
    return { ...x, score: sameCat + overlap * 10 + Math.min(stars, 500) / 100 };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}
