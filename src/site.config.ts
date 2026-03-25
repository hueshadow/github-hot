/**
 * 站点级配置。PUBLIC_* 变量在构建时注入（见 .env.example）。
 */
export function getRecommendIssueUrl(): string | undefined {
  const raw = import.meta.env.PUBLIC_GITHUB_REPO?.trim();
  if (!raw?.includes('/')) return undefined;
  const [owner, repo] = raw.split('/');
  if (!owner || !repo) return undefined;
  return `https://github.com/${owner}/${repo}/issues/new?template=recommend.md`;
}
