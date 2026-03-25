/**
 * 读取 src/content/projects 与 skills 下的 Markdown，根据 repo_url 调用 GitHub API，
 * 写回 frontmatter 中的 stars / forks / language / last_updated（YYYY-MM-DD）。
 *
 * 使用：GITHUB_TOKEN=ghp_xxx node scripts/sync-github.mjs
 * （CI 中可使用默认 GITHUB_TOKEN，权限更高可减轻限流）
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const matter = require('gray-matter');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const TOKEN = process.env.GITHUB_TOKEN ?? '';

const dirs = [
  path.join(ROOT, 'src/content/projects'),
  path.join(ROOT, 'src/content/skills'),
];

function parseGithubRepo(url) {
  try {
    const u = new URL(url);
    if (u.hostname !== 'github.com') return null;
    const segs = u.pathname.split('/').filter(Boolean);
    if (segs.length < 2) return null;
    const owner = segs[0];
    const repo = segs[1].replace(/\.git$/, '');
    return { owner, repo };
  } catch {
    return null;
  }
}

async function fetchRepo(owner, repo) {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'github-hot-sync-script',
  };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`${res.status} ${owner}/${repo}: ${t.slice(0, 200)}`);
  }
  return res.json();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function processFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const file = matter(raw);
  const repoUrl = file.data.repo_url;
  if (!repoUrl || typeof repoUrl !== 'string') {
    console.warn('skip (no repo_url)', filePath);
    return;
  }
  const parsed = parseGithubRepo(repoUrl);
  if (!parsed) {
    console.warn('skip (non-github url)', filePath);
    return;
  }
  const j = await fetchRepo(parsed.owner, parsed.repo);
  file.data.stars = j.stargazers_count ?? 0;
  file.data.forks = j.forks_count ?? 0;
  file.data.language = j.language || '其他';
  if (j.pushed_at) {
    file.data.last_updated = String(j.pushed_at).slice(0, 10);
  }
  fs.writeFileSync(filePath, matter.stringify(file), 'utf8');
  console.log('updated', path.relative(ROOT, filePath), `★${file.data.stars}`);
}

async function main() {
  const files = [];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      if (name.endsWith('.md')) files.push(path.join(dir, name));
    }
  }
  for (const f of files) {
    try {
      await processFile(f);
    } catch (e) {
      console.error('error', f, e.message);
    }
    await sleep(TOKEN ? 200 : 800);
  }
}

main();
