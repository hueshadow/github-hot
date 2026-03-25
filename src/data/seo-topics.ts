/**
 * Similarweb 等工具显示的 github.com 流量词簇，用于本站话题落地页与内链。
 * 非官方索引；matchNeedles 与条目 tags / seo_aliases 归一化后匹配。
 */
export type SeoTopic = {
  slug: string;
  pageTitle: string;
  pageTitleEn: string;
  metaDescription: string;
  metaDescriptionEn: string;
  h1: string;
  h1En: string;
  /** 2～4 段说明，非门页 */
  introHtml: string;
  introHtmlEn: string;
  /** 归一化后参与匹配的片段（小写、可含空格） */
  matchNeedles: string[];
};

export const SEO_TOPICS: SeoTopic[] = [
  {
    slug: 'openclaw-claw-ecosystem',
    pageTitle: 'OpenClaw / Claw 生态开源精选 | GitHub Hot',
    pageTitleEn: 'OpenClaw & Claw ecosystem — curated OSS | GitHub Hot',
    metaDescription:
      '围绕 OpenClaw、ClawDBot、NanoClaw 等 GitHub 热搜方向，精选相关或同生态的开源项目与 Skills，第三方非官方索引。',
    metaDescriptionEn:
      'Curated open-source projects and skills related to the OpenClaw / Claw ecosystem trending on GitHub — third-party index.',
    h1: 'OpenClaw / Claw 生态',
    h1En: 'OpenClaw / Claw ecosystem',
    introHtml: `<p>第三方数据显示，与 <strong>OpenClaw、ClawDBot、ClawBot、NanoClaw、PicoClaw</strong> 等相关的搜索在 GitHub 侧快速增长。本页为 <strong>GitHub Hot 非官方收录</strong>，根据标签与别名聚合可能相关的仓库与 Agent Skills，便于检索与对比。</p><p>条目均链接至各项目官方仓库；协议、安全与可用性以原作者说明为准。</p>`,
    introHtmlEn: `<p>Search interest around <strong>OpenClaw, ClawDBot, NanoClaw</strong> and related names is rising on GitHub. This page is a <strong>third-party curated index</strong> on GitHub Hot — we match tags and <code>seo_aliases</code> to surface relevant repos and skills.</p><p>Always refer to each upstream repository for license and support.</p>`,
    matchNeedles: [
      'openclaw',
      'clawdbot',
      'claw bot',
      'clawbot',
      'nanoclaw',
      'picoclaw',
      'clawhub',
      'clawdhub',
      'moltbot',
      'molthub',
      'clawd',
    ],
  },
  {
    slug: 'claude-code-ai-ide',
    pageTitle: 'Claude Code / AI 编程助手与 Codex 生态 | GitHub Hot',
    pageTitleEn: 'Claude Code, Codex & AI coding assistants | GitHub Hot',
    metaDescription:
      'Claude Code、Codex、Cursor 等 AI 编程工具链相关开源项目与 Skills 收录导航，信息型检索友好。',
    metaDescriptionEn:
      'Navigate curated OSS and skills for Claude Code, OpenAI Codex, Cursor and similar AI coding workflows.',
    h1: 'Claude Code / AI 编程助手',
    h1En: 'Claude Code & AI coding tools',
    introHtml: `<p>与 <strong>Claude Code、Codex、Cursor</strong> 相关的仓库与技能包搜索多为<strong>信息型</strong>：用户需要文档、安装方式与生态插件。本站按标签与别名聚合已收录条目，并链至 GitHub 原文。</p><p>若你维护相关开源项目，欢迎通过 Issue 模板推荐收录。</p>`,
    introHtmlEn: `<p>Queries for <strong>Claude Code, Codex, Cursor</strong> are often informational. This hub lists curated entries from our collections that match these topics via tags and aliases.</p>`,
    matchNeedles: [
      'claude code',
      'claude',
      'codex',
      'cursor',
      'oh-my-claude',
      'everything claude',
      'claudian',
    ],
  },
  {
    slug: 'agent-browser-mcp',
    pageTitle: 'Agent Browser / 浏览器自动化与 MCP | GitHub Hot',
    pageTitleEn: 'Agent browser & MCP tooling | GitHub Hot',
    metaDescription:
      'Agent Browser、Vercel Agent Browser、Web MCP 等方向的 GitHub 热门检索与开源工具精选索引。',
    metaDescriptionEn:
      'Curated index for agent-browser style tools and MCP-related repos trending around GitHub search.',
    h1: 'Agent Browser / MCP',
    h1En: 'Agent browser & MCP',
    introHtml: `<p><strong>Agent Browser</strong>、浏览器内自动化与 <strong>MCP（Model Context Protocol）</strong> 类仓库近期在流量工具中频繁出现。本页聚合本站已标注相关别名的项目与 Skills，方便从「精选站」一跳到达 GitHub。</p>`,
    introHtmlEn: `<p><strong>Agent browser</strong> and <strong>MCP</strong>-related repositories are trending. This hub lists matching curated entries on GitHub Hot.</p>`,
    matchNeedles: ['agent browser', 'agent-browser', 'vercel agent', 'webmcp', 'mcp'],
  },
  {
    slug: 'vercel-skills-ai',
    pageTitle: 'Vercel Skills / AI 部署生态 | GitHub Hot',
    pageTitleEn: 'Vercel Skills & AI deployment | GitHub Hot',
    metaDescription: 'Vercel Skills、前端与 AI 应用部署相关开源条目收录与导航。',
    metaDescriptionEn: 'Curated projects and skills touching Vercel Skills and AI app deployment topics.',
    h1: 'Vercel Skills / 部署生态',
    h1En: 'Vercel Skills',
    introHtml: `<p>「<strong>Vercel Skills</strong>」等关键词反映开发者对平台能力与示例仓库的导航需求。此处展示标签或别名中包含 Vercel / 部署 / 前端工程化线索的收录条目。</p>`,
    introHtmlEn: `<p>Highlights curated entries tagged around <strong>Vercel</strong>, deployment and related frontend tooling.</p>`,
    matchNeedles: ['vercel skills', 'vercel', 'next.js', 'nextjs'],
  },
  {
    slug: 'awesome-skills-agents',
    pageTitle: 'Awesome Skills / Agent 技能包精选 | GitHub Hot',
    pageTitleEn: 'Awesome skills & agent skill packs | GitHub Hot',
    metaDescription:
      'Obsidian Skills、Remotion Skills、awesome openclaw skills 等技能包与 Agent 方向收录导航。',
    metaDescriptionEn:
      'Curated skills and agent-related entries (Obsidian, Remotion, awesome-style lists).',
    h1: 'Skills / Agent 技能包',
    h1En: 'Skills & agent packs',
    introHtml: `<p>流量词中常见 <strong>openclaw skills、obsidian skills、remotion skills</strong> 等「技能包」检索。GitHub Hot 的 <a href="/skills/">Skills 收录</a> 侧重 Cursor、Codex 等平台可安装的能力说明；本页按别名聚合相关条目。</p>`,
    introHtmlEn: `<p>Groups <a href="/skills/">skills</a> entries whose tags or aliases match popular skill-pack style queries.</p>`,
    matchNeedles: [
      'obsidian skills',
      'remotion skills',
      'awesome openclaw',
      'awesome skills',
      'skill pack',
    ],
  },
  {
    slug: 'playwright-testing-cli',
    pageTitle: 'Playwright / 测试与 CLI 工具 | GitHub Hot',
    pageTitleEn: 'Playwright, testing & CLI tools | GitHub Hot',
    metaDescription: 'Playwright CLI、端到端测试与开发者 CLI 类 GitHub 热搜相关收录。',
    metaDescriptionEn: 'Curated OSS for Playwright CLI, E2E testing and developer CLI tooling.',
    h1: 'Playwright / 测试 CLI',
    h1En: 'Playwright & testing CLI',
    introHtml: `<p><strong>Playwright CLI</strong> 等词体现自动化测试与命令行工具需求。匹配含 Playwright、E2E、测试、CLI 等标签或别名的项目。</p>`,
    introHtmlEn: `<p>Lists entries matching Playwright, e2e, testing and CLI-related aliases.</p>`,
    matchNeedles: ['playwright', 'playwright cli', 'e2e', '端到端'],
  },
  {
    slug: 'kimi-qwen-llm',
    pageTitle: 'Kimi / Qwen / 大模型与 TTS 工具 | GitHub Hot',
    pageTitleEn: 'Kimi, Qwen & LLM utilities | GitHub Hot',
    metaDescription: 'Kimi、Qwen、GLM 等模型相关开源实现与工具在 GitHub 上的精选导航。',
    metaDescriptionEn: 'Curated repos for Kimi, Qwen, GLM and related LLM utilities on GitHub.',
    h1: '大模型 / Kimi · Qwen',
    h1En: 'LLMs: Kimi, Qwen & more',
    introHtml: `<p>Similarweb 上出现 <strong>kimi 2.5、qwen3、qwen3 tts、glm 5</strong> 等模型向检索。本站仅收录已人工添加且带相应别名的条目，避免无关堆砌。</p>`,
    introHtmlEn: `<p>Surfaces entries explicitly tagged or aliased for Kimi, Qwen, GLM, TTS, etc.</p>`,
    matchNeedles: ['kimi', 'qwen', 'glm', 'tts', 'moonshot', '通义'],
  },
  {
    slug: 'crawl-scrape-llm',
    pageTitle: '爬虫 / 抓取与 LLM 数据管道 | GitHub Hot',
    pageTitleEn: 'Crawling & LLM data pipelines | GitHub Hot',
    metaDescription: '面向 LLM 与 RAG 的爬虫、抓取与数据管道类开源项目精选。',
    metaDescriptionEn: 'Curated crawling and data-pipeline OSS for LLMs and RAG.',
    h1: '爬虫 / LLM 数据',
    h1En: 'Crawling for LLMs',
    introHtml: `<p>与 <strong>Crawl4AI、爬虫、RAG、抓取</strong> 相关的仓库常与 AI 应用数据面结合。本页聚合对应标签与别名。</p>`,
    introHtmlEn: `<p>Groups crawling, scraping and RAG-oriented entries.</p>`,
    matchNeedles: ['crawl', '爬虫', 'scrape', 'rag', 'llm', '抓取'],
  },
];

export function normalizeSeoToken(s: string): string {
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

export function entryMatchesTopic(
  tags: string[],
  seoAliases: string[],
  topic: SeoTopic,
): boolean {
  const pool = [...tags, ...seoAliases].map(normalizeSeoToken);
  return topic.matchNeedles.some((needle) => {
    const n = normalizeSeoToken(needle);
    return pool.some((p) => p === n || p.includes(n) || n.includes(p));
  });
}

export function getTopicBySlug(slug: string): SeoTopic | undefined {
  return SEO_TOPICS.find((t) => t.slug === slug);
}
