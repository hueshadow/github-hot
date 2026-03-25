/** 将标签转为 URL 安全片段（支持中文） */
export function tagToPathSegment(tag: string): string {
  return encodeURIComponent(tag.trim());
}

export function pathSegmentToTag(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}
