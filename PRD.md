# GitHub Hot — 热门开源项目与 Skills 收录平台

## 1. 项目概述

### 1.1 项目背景

GitHub 上每天涌现大量优质开源项目和 Agent Skills 仓库，但缺少一个专注于**中文用户视角**的精选收录平台。用户往往需要在 GitHub Trending、社交媒体、技术社区之间反复跳转，才能发现真正值得关注的项目。

### 1.2 项目定位

**GitHub Hot** 是一个面向开发者和 AI 工具爱好者的精选项目收录站，聚焦两大内容：

- **热门开源项目**：如 小龙虾（Crawl4AI）、opencode、sub2api 等具有实用价值的仓库
- **Skills 仓库**：适配 Cursor / Codex / Claude Code 等 AI 编程助手的技能包

为每个收录项目提供独立的内容详情页，帮助用户快速了解项目价值、使用方式和社区热度。

### 1.3 目标用户

| 用户类型 | 描述 |
|---------|------|
| 开发者 | 想发现优质工具和库，提高开发效率 |
| AI 工具玩家 | 关注 Cursor / Claude Code 生态，寻找好用的 Skills |
| 技术博主 / 自媒体 | 需要追踪热门项目做内容输出 |
| 产品经理 / 技术管理者 | 了解技术趋势，评估技术选型 |

---

## 2. 功能需求

### 2.1 内容收录与管理

#### 2.1.1 项目收录

每个收录项目包含以下信息：

| 字段 | 说明 | 是否必填 |
|------|------|---------|
| `name` | 项目名称 | 是 |
| `slug` | URL 友好标识（如 `crawl4ai`） | 是 |
| `repo_url` | GitHub 仓库地址 | 是 |
| `category` | 分类（见 2.1.3） | 是 |
| `tags` | 标签列表（如 `爬虫`、`AI`、`CLI`） | 是 |
| `description` | 一句话描述 | 是 |
| `content` | 详细介绍（Markdown 格式） | 是 |
| `logo` | 项目 Logo / 截图 | 否 |
| `homepage` | 项目官网 | 否 |
| `stars` | GitHub Star 数（定期同步） | 自动 |
| `forks` | Fork 数（定期同步） | 自动 |
| `language` | 主要编程语言（自动获取） | 自动 |
| `last_updated` | 仓库最近更新时间 | 自动 |
| `added_at` | 收录时间 | 自动 |
| `is_featured` | 是否推荐/置顶 | 否 |

#### 2.1.2 Skills 收录

Skills 在项目字段基础上额外包含：

| 字段 | 说明 |
|------|------|
| `compatible_with` | 兼容平台（Cursor / Codex / Claude Code 等） |
| `install_command` | 安装命令或方式 |
| `skill_type` | 类型（代码生成 / 设计 / 部署 / 研究 等） |

#### 2.1.3 分类体系

**开源项目分类：**

- AI / 机器学习
- 开发工具 / CLI
- Web 框架 / 前端
- API / 后端服务
- 数据 / 爬虫
- DevOps / 部署
- 效率工具
- 其他

**Skills 分类：**

- 代码生成
- 前端设计
- 部署运维
- 搜索研究
- 图片生成
- 文档写作
- 其他

### 2.2 首页

- **Hero 区域**：平台 Slogan + 搜索框
- **精选推荐**：编辑精选的 3-6 个项目卡片（轮播或网格）
- **最新收录**：按收录时间倒序展示
- **热门项目**：按 Star 数 / 近期增长排序
- **Skills 专区**：独立展示 Skills 类内容
- **分类导航**：快速跳转各分类

### 2.3 项目列表页

- 支持按分类筛选（开源项目 / Skills）
- 支持按标签筛选
- 支持按排序方式切换：最新收录 / 最多 Star / 最近更新
- 每个项目以卡片形式展示：名称、描述、Star 数、标签、语言
- 分页或无限滚动加载

### 2.4 项目详情页

每个项目拥有独立 URL（如 `/projects/crawl4ai`），包含：

- 项目基本信息（名称、描述、Logo）
- GitHub 数据面板：Star / Fork / 语言 / 最近更新
- 详细介绍（Markdown 渲染）
- 快速链接：GitHub 仓库、官网、文档
- 标签列表（可点击跳转）
- 相关推荐：同分类 / 同标签的其他项目
- （Skills 特有）兼容平台、安装方式

### 2.5 搜索功能

- 全局搜索框（首页 + 导航栏常驻）
- 支持搜索项目名称、描述、标签
- 搜索结果高亮匹配关键词
- 搜索建议 / 自动补全（可选，后期迭代）

### 2.6 推荐功能

- **相关推荐**：基于标签和分类的相似项目推荐
- **编辑精选**：手动标记的 `is_featured` 项目
- **趋势推荐**：近期 Star 增长快的项目（需定期同步 GitHub 数据）

---

## 3. 非功能需求

### 3.1 性能

- 首页加载时间 < 2 秒（LCP）
- 静态生成（SSG）为主，保证 SEO 和加载速度
- 图片懒加载 + WebP 格式优化

### 3.2 SEO

- 每个项目详情页有独立的 title / description / OG 标签
- 生成 sitemap.xml
- 结构化数据（JSON-LD）

### 3.3 响应式设计

- 适配桌面端（>1024px）、平板（768-1024px）、手机（<768px）
- 移动端优先设计

### 3.4 可维护性

- 项目数据以 Markdown + Frontmatter 文件管理（无需数据库）
- 通过 Git 管理内容更新，新增项目只需添加 Markdown 文件
- GitHub Actions 自动构建和部署

---

## 4. 技术方案

### 4.1 推荐技术栈

| 层面 | 技术选型 | 理由 |
|------|---------|------|
| 框架 | Astro | 静态优先、内容驱动、构建速度快 |
| 样式 | Tailwind CSS | 快速开发、一致的设计系统 |
| 交互增强 | React（Islands） | 搜索、筛选等交互组件按需加载 |
| 内容管理 | Markdown + Frontmatter | 简单、Git 友好、无需数据库 |
| 搜索 | Pagefind / Fuse.js | 客户端全文搜索，零后端依赖 |
| 部署 | Cloudflare Pages | 免费、全球 CDN、构建快 |
| GitHub 数据同步 | GitHub Actions + API | 定时任务更新 Star/Fork 等数据 |

### 4.2 项目目录结构（初步）

```
github_hot/
├── src/
│   ├── content/
│   │   ├── projects/          # 开源项目 Markdown 文件
│   │   │   ├── crawl4ai.md
│   │   │   ├── opencode.md
│   │   │   └── sub2api.md
│   │   └── skills/            # Skills Markdown 文件
│   │       ├── deep-research.md
│   │       └── frontend-design.md
│   ├── components/            # UI 组件
│   ├── layouts/               # 页面布局
│   ├── pages/                 # 路由页面
│   └── styles/                # 全局样式
├── public/                    # 静态资源
├── scripts/                   # GitHub 数据同步脚本
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── README.md
```

### 4.3 内容文件示例

```markdown
---
name: Crawl4AI (小龙虾)
slug: crawl4ai
repo_url: https://github.com/unclecode/crawl4ai
category: 数据 / 爬虫
tags: [爬虫, AI, LLM, Python]
description: 为 LLM 和 AI 应用打造的高性能异步爬虫框架
homepage: https://crawl4ai.com
logo: /images/projects/crawl4ai.png
is_featured: true
---

## 简介

Crawl4AI（小龙虾）是一个开源的异步网页爬虫框架，专为大语言模型和 AI 应用设计...

## 核心特性

- 异步架构，高性能并发爬取
- 内置 LLM 友好的内容提取
- 支持 JavaScript 渲染
- ...

## 快速上手

...
```

---

## 5. 页面清单

| 页面 | 路由 | 说明 |
|------|------|------|
| 首页 | `/` | 精选推荐 + 最新 + 分类入口 |
| 项目列表 | `/projects` | 全部开源项目，支持筛选排序 |
| Skills 列表 | `/skills` | 全部 Skills，支持筛选排序 |
| 项目详情 | `/projects/[slug]` | 单个项目详细介绍 |
| Skill 详情 | `/skills/[slug]` | 单个 Skill 详细介绍 |
| 分类页 | `/category/[name]` | 某分类下的所有内容 |
| 标签页 | `/tags/[name]` | 某标签下的所有内容 |
| 搜索结果 | `/search?q=xxx` | 搜索结果页 |
| 关于 | `/about` | 平台介绍、提交项目说明 |

---

## 6. 数据流与自动化

### 6.1 GitHub 数据同步

```
GitHub Actions (每日定时)
    │
    ▼
调用 GitHub API 获取每个收录项目的最新数据
    │
    ▼
更新 Markdown Frontmatter 中的 stars / forks / last_updated
    │
    ▼
自动提交 commit → 触发重新构建部署
```

### 6.2 内容发布流程

```
撰写 Markdown 文件（手动或脚本辅助）
    │
    ▼
Push 到 main 分支
    │
    ▼
Cloudflare Pages 自动构建
    │
    ▼
网站更新上线
```

---

## 7. 迭代计划

### Phase 1 — MVP（1-2 周）

- [x] 项目初始化（Astro + Tailwind）
- [x] 首页基本布局
- [x] 项目列表页 + 分类筛选
- [x] 项目详情页（Markdown 渲染）
- [x] 收录 10-20 个初始项目和 5-10 个 Skills（当前为 7 项目 + 4 Skills，可持续扩充）
- [ ] 部署上线（由维护者在目标平台完成）

### Phase 2 — 完善体验（第 3-4 周）

- [x] 搜索功能（Pagefind / Fuse.js）
- [x] 标签系统 + 标签页
- [x] 相关推荐
- [x] GitHub 数据自动同步（Actions）
- [x] SEO 优化（OG 标签、sitemap、结构化数据）
- [x] 响应式适配优化

### Phase 3 — 增长扩展（后续）

- [x] RSS 订阅（`/rss.xml`，全站 `<head>` 内 `alternate`）
- [x] 项目提交入口（Issue 模板 + 可选环境变量 `PUBLIC_GITHUB_REPO` 生成「推荐收录」链接）
- [ ] 邮件周刊 / Newsletter（页脚/关于页标明规划中；现阶段以 RSS 为订阅渠道）
- [x] 暗色模式（`class` + `localStorage` + 系统偏好）
- [x] 国际化（英文摘要站 `/en/`；条目正文仍以中文为主，非全站逐页翻译）
- [ ] 评论 / 点赞功能（可选，未实现）
- [ ] 接入 GitHub Trending 数据自动发现新项目（未实现）

---

## 8. 初始收录项目清单（示例）

### 开源项目

| 项目 | 仓库 | 分类 | 简介 |
|------|------|------|------|
| Crawl4AI (小龙虾) | unclecode/crawl4ai | 数据 / 爬虫 | 为 LLM 打造的异步爬虫框架 |
| opencode | nicepkg/opencode | 开发工具 / CLI | 终端里的 AI 编程助手 |
| sub2api | sub2api/sub2api | API / 后端服务 | 订阅转 API 代理工具 |
| （待补充） | — | — | — |

### Skills 仓库

| Skill | 来源 | 兼容平台 | 简介 |
|-------|------|---------|------|
| deep-research | codex 内置 | Codex | 多源深度研究与报告生成 |
| frontend-design | cursor 内置 | Cursor | 高质量前端界面设计生成 |
| agent-reach | 自定义 | Cursor / Codex | 多平台搜索与内容获取 |
| （待补充） | — | — | — |

---

## 9. 成功指标

| 指标 | 目标（上线 1 个月） |
|------|-------------------|
| 收录项目数 | ≥ 50 |
| 收录 Skills 数 | ≥ 20 |
| 页面加载速度（LCP） | < 2s |
| Lighthouse 评分 | > 90 |
| 搜索引擎收录页面数 | ≥ 80% 的详情页 |
