# GitHub Hot

精选 **GitHub 热门开源项目** 与 **Agent Skills**（Cursor / Codex 等）的静态收录站。内容由 `src/content` 下 Markdown 维护，构建为纯静态站点。

需求说明见 [PRD.md](./PRD.md)。

## 本地开发

```bash
npm install
npm run dev
```

访问 `http://localhost:4321`。

## 构建与预览

```bash
npm run build
npm run preview
```

## 全文搜索（Pagefind）

搜索依赖构建后的索引。生产或本地预览搜索时请使用：

```bash
npm run build:search
npm run preview
```

`build:search` = `astro build` + 将 Pagefind 索引输出到 `dist/pagefind/`。部署时请用同一命令或等价流水线，否则 `/search/` 页面无法加载索引。

## 部署到 Cloudflare Pages

### 方式 A：控制台连接 Git（推荐入门）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**。
2. 授权并选择本仓库；项目名称建议 **`github-hot`**（与 `deploy:cf` 脚本一致）。**请勿**在仓库根目录提交 `wrangler.toml`（仅用 Git 集成部署时），否则易触发「构建成功、部署到全球网络失败」；本地 Wrangler 可参考 [`wrangler.toml.example`](wrangler.toml.example)。
3. **构建设置**：
   - **Framework preset**：None 或 Astro（若可选）
   - **Build command**：`npm run build:search`
   - **Build output directory**：`dist`
   - **Root directory**：`/`（仓库根目录）
4. **环境变量**（Production / Preview 均可按需配置）：
   - `PUBLIC_SITE_URL`：填生产地址，例如 `https://github-hot.pages.dev` 或你的自定义域名（**不要**末尾多余斜杠与引号）。用于 sitemap、canonical、OG 绝对 URL。
   - `PUBLIC_GITHUB_REPO`：可选，`owner/repo`，用于「推荐收录」外链。
5. **Node 版本**：在 Pages 项目 **Settings → Environment variables** 添加 `NODE_VERSION` = `20`，或使用仓库根目录 [`.nvmrc`](.nvmrc)（若 Cloudflare 已支持自动读取）。
6. 保存后触发首次部署；在 **Custom domains** 中绑定自己的域名（可选）。

### 方式 B：本地 Wrangler 直传

```bash
npm install
npx wrangler login
npm run deploy:cf
```

默认项目名为 `github-hot`。若项目名称不同，请修改 [`package.json`](package.json) 中 `deploy:cf` 的 `--project-name=`，或首次在控制台创建同名 Pages 项目。

### 方式 C：GitHub Actions 自动部署

已提供 [`.github/workflows/deploy-cloudflare-pages.yml`](.github/workflows/deploy-cloudflare-pages.yml)：在 push 到 `main` 时执行 `npm ci` → `npm run build:search` → 上传到 Pages。

1. Cloudflare：**My Profile → API Tokens** 创建 Token，权限需包含 **Cloudflare Pages — Edit**（及账户读权限）；记下 **Account ID**（仪表盘首页右侧）。
2. GitHub 仓库：**Settings → Secrets and variables → Actions**  
   - 新建 Secret：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`  
3. （推荐）**Variables** 中添加 `PUBLIC_SITE_URL`（及可选 `PUBLIC_GITHUB_REPO`），并在工作流里「Build site + Pagefind」步骤下自行增加 `env` 传入（与本地 `astro.config` 一致）。
4. 将工作流中的 `projectName: github-hot` 改成你在 Cloudflare 上实际的 Pages 项目名（若不同）。

### 部署阶段失败（构建成功、Deploying 红叉）

常见原因与处理：

1. **根目录存在 `wrangler.toml`**：Pages 通过 Git 构建时可能按 Workers 解析，导致上传阶段失败。解决：删除仓库中的 `wrangler.toml`（本仓库已移除），仅保留 `wrangler.toml.example` 供本地参考。
2. **输出目录错误**：须为 **`dist`**，构建命令须为 **`npm run build:search`**（或等价的 `build` + Pagefind）。
3. 在 Cloudflare 该次部署里 **Download log**，查看 `Deploying` 步骤后的具体报错；若与权限、配额相关，需检查账户与 Token。

## Phase 3 能力（增长与体验）

- **RSS**：构建后访问 `/rss.xml`；`<head>` 内已声明 `rel="alternate"` 便于阅读器发现。
- **暗色模式**：页眉右侧切换，偏好保存在 `localStorage`；无记录时跟随系统 `prefers-color-scheme`。
- **推荐收录**：配置 `PUBLIC_GITHUB_REPO=owner/repo` 后，导航与页脚出现指向 `issues/new?template=recommend.md` 的链接（需仓库内已有对应 Issue 模板）。
- **英文入口**：路由 `/en/`（`src/pages/en/index.astro`）提供英文概览与导航；正文收录仍以中文为主。

邮件周刊、评论/点赞、GitHub Trending 自动发现等仍为规划项，见 [PRD.md](./PRD.md) Phase 3。

## SEO 话题维护（Similarweb 导向）

- **话题配置**：[`src/data/seo-topics.ts`](src/data/seo-topics.ts) 定义 `/topics/{slug}/` 与 `/en/topics/{slug}/` 的文案、匹配词与聚合逻辑。
- **条目匹配**：在 Markdown frontmatter 中填写 `tags` 与 `seo_aliases`（英文词、空格短语请加 YAML 引号）。匹配规则为归一化后的子串包含关系，详见 `entryMatchesTopic`。
- **可选覆盖**：`seo_title` / `seo_description` 可覆盖详情页的 `<title>` 与 meta description。
- **技术项**：`public` 下无静态 `robots.txt`，构建生成 [`src/pages/robots.txt.ts`](src/pages/robots.txt.ts)；sitemap 在 [`astro.config.mjs`](astro.config.mjs) 的 `serialize` 中为话题页提高 `priority`。Git 集成部署时不要提交根目录 `wrangler.toml`。

## 环境变量

复制 [`.env.example`](./.env.example) 为 `.env`（本地可选）：

| 变量 | 说明 |
|------|------|
| `PUBLIC_SITE_URL` | 生产站点根 URL，用于 sitemap 与绝对链接。也可在构建环境中注入。 |
| `PUBLIC_GITHUB_REPO` | `owner/repo`。设置后显示「推荐收录」外链；不设则隐藏（关于页有说明）。 |
| `GITHUB_TOKEN` | 仅运行 `node scripts/sync-github.mjs` 时使用，更新 frontmatter 中的 Star 等字段。 |

`astro.config.mjs` 会读取 `process.env.PUBLIC_SITE_URL`，未设置时使用占位域名 `https://github-hot.example.com`，上线前请改掉。

## 内容维护

- 开源项目：`src/content/projects/*.md`
- Skills：`src/content/skills/*.md`

Frontmatter 字段见 `src/content/config.ts`。注意：**自定义 URL 路径**请在 frontmatter 中写 `slug: "your-slug"`（带连字符请加引号），页面里使用 `entry.slug` 访问。

含 `/` 的分类名、描述等建议使用 YAML 双引号包裹，避免解析歧义。

## 定时同步 GitHub 数据

仓库启用 [`.github/workflows/sync-github.yml`](.github/workflows/sync-github.yml) 后，将每日拉取各 `repo_url` 的 Star / Fork / 语言 / 最近推送日期并写回 Markdown。也可在 Actions 里手动 **Run workflow**。

## 技术栈

- [Astro 5](https://astro.build/)（静态输出）
- Tailwind CSS + @tailwindcss/typography
- @astrojs/sitemap、[@astrojs/rss](https://docs.astro.build/en/guides/rss/)（RSS）
- [Pagefind](https://pagefind.app/)（静态全文搜索）

## 许可证

内容条目版权归原作者所有；本站代码可按需自行约定许可证。
