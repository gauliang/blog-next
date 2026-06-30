# AGENTS.md

## 构建 / 检查 / 测试 命令

- **开发服务器**: `npm run dev` — 运行 `scripts/watch.js` (WebSocket 热重载 Markdown) + `next dev`
- **构建**: `npm run build` — `next build`
- **静态导出**: `npm run export` — `next export`，输出到 `out/`
- **启动生产服务器**: `npm run start` — `next start`
- **代码检查**: `npm run lint` — `next lint` (继承 `next/core-web-vitals`)
- **创建新文章**: `npm run make` — 交互式 CLI，从模板创建 Markdown 文件
- **部署**: `npm run deploy` — 执行 `deploy.sh` (复制 `out/` 到 `gauliang.github.io/` 子模块，提交两个仓库)
- **此项目无测试框架** — 不要添加或假定存在测试

## 项目架构

```
next-blog/
├── _contents/posts/{year}/  # Markdown 博客文章
├── components/               # 可复用 UI 组件
├── lib/                      # 工具库 (文章处理、remark 插件、配置)
├── pages/                    # Next.js 页面 (基于文件的路由)
│   ├── blogs/[...id].tsx     # 文章详情 (catch-all 路由)
│   ├── blogs/page/[page].tsx # 分页文章列表
│   ├── series/[...id].tsx    # 系列详情
│   ├── tags/[tag].tsx        # 标签筛选页
│   ├── api/preview.ts        # 仅开发环境的热重载预览 API
│   └── _app.tsx              # 应用包装 (ThemeProvider)
├── scripts/                  # 开发工具 (make, watch, spider)
├── styles/                   # Tailwind + 自定义 CSS
└── public/                   # 静态资源
```

### 核心依赖库

- **Next.js 12** (SSG: `getStaticProps` + `getStaticPaths`, `trailingSlash: true`)
- **Tailwind CSS 3** (通过 `class` 策略实现深色模式)
- **react-icons/bs** (Bootstrap Icons)
- **next-themes** (主题切换)
- **unified + remark** 处理管道: `remark-parse` → `remark-gfm` → `remark-html` → `remark-prism` → 自定义 remark 插件
- **gray-matter** 解析 Markdown 头信息
- **dayjs** 日期格式化

## 代码风格指南

### 导入规范

- 导入顺序: 外部库 → 内部模块 → 相对路径组件
- 类型导入使用 `import type`
- Next.js 类型从 `next/dist/server/router` 导入 (Params)，而非 `next`
- React Icons 导入: `import { BsXxx } from 'react-icons/bs'`
- 组件导入使用相对路径 `../components/X`
- 务必先检查 `package.json` 确认某个库是否存在

### 格式与缩进

- 缩进 4 个空格 (不使用 Tab)
- 分号: 现有代码风格不一致 — 遵循文件中的既有风格；不确定时省略（多数风格）
- JSX 属性字符串使用单引号: `className='mx-5'`
- 对象/数组末尾不加逗号

### 类型与类型定义

- `any` 类型广泛使用 — 在此项目中可以接受，但新代码中应尽量少用
- 页面组件 props 类型使用 `Params` (来自 `next/dist/server/router`)，其他组件用行内类型 `{ propName: any }`
- 保持类型定义简洁
- TypeScript 配置未覆盖严格模式 — `strict: true` (tsconfig)
- 模块声明放在 `lib/declare.d.ts`

### 命名约定

- **文件**: kebab-case (`post-list.tsx`, `theme-switch.tsx`, `back-to-top.tsx`)
- **组件 (默认导出)**: PascalCase，用于页面 (`Home`, `Post`, `Tags`) 和布局组件 (`Layout`, `Navbar`, `Footer`)
- **组件 (具名导出)**: PascalCase，用于可复用 UI (`PostList`, `PostContent`, `HeroBanner`, `BackToTop`, `ThemeSwitch`, `Pagination`)
- **函数**: camelCase (`getStaticProps`, `getAllFrontMatterByType`, `getPostData`, `setThemeHandler`)
- **变量/常量**: camelCase，真正的常量值用大写 (`PAGE_SIZE`, `BLOG_LOGO`)
- **不使用 barrel 文件** (`index.ts`) — 直接从具体文件导入

### 组件模式

- **页面组件**: `export default function PageName({ props }: Params) { ... }` 配合 `getStaticProps` + 可选的 `getStaticPaths`
- **可复用组件**: `export function ComponentName({ props }: any) { ... }`
- **布局包装**: 每个页面都将内容包裹在 `<Layout><Head>...</Head>...<BackToTop /></Layout>` 中
- **页面标题**: 通过 `next/head` 的 `<Head><title>页面名 - Gauliang</title></Head>` 设置
- **Hero 区域**: 页面顶部使用 `<HeroBanner title='...' abstract='...' tag='...' />`
- **状态管理**: 仅使用 `useState` + `useEffect` (无全局状态)
- 除非性能分析表明需要，否则避免使用 `useCallback`/`useMemo`

### 样式

- **主要**: Tailwind 工具类。除非无法避免，否则不要在 `globals.css` 中添加任意 CSS
- **响应式**: 移动端优先 (`md:` 断点为 `768px`, `xl:` 断点为 `1280px`)
- **深色模式**: 使用 Tailwind 的 `dark:` 前缀；自定义 CSS 中使用 `:root.dark .selector`
- **颜色调色板**: 蓝色 (`#0069ff`), slate/灰色 用于文字，紫色用于系列卡片
- **Z-index 层次**: `z-5` (表格), `z-8` (代码块), `z-10` (导航栏), `z-50` (返回顶部)

### 数据获取 (SSG)

- `getStaticProps` 返回 `{ props: { ... } }`
- `getStaticPaths` 返回 `{ paths: [...], fallback: false }`
- 使用 `getAllFrontMatterByType(type)` 获取排序后的头信息列表
- 使用 `getPostData(id)` 获取带 HTML + TOC 的文章完整内容
- 使用 `getAllPostIdByType(type)` 生成静态路径
- `getAllTags()` 返回带有文章计数的聚合标签数据
- `process.env.NODE_ENV === 'development'` 用于仅开发环境的检查 (草稿过滤, 预览 API)

### Markdown 内容约定

- 头信息: `title`, `date` (ISO 8601), `draft` (布尔值), `description`, `type` (posts/series), `tags` (数组), `series` (字符串或 false), `author`, `cover`
- 图片: 与 `.md` 文件放在同一目录；引用方式为 `image.jpg`；路径会被 `remarkImage` 插件重写为 `/attachments/posts/{year}/{slug}.files/image.jpg`
- 代码块: 指定语言 (\`\`\`ts, \`\`\`js 等) — 使用 Prism.js 渲染
- 目录: 通过 `generateToc` 插件从 `<h2>` 标题自动生成
- 自定义嵌入: `{{codepen://user/penId?theme=dark}}` — 由 `remarkCodepen` 插件渲染

### 热重载 (仅开发环境)

文章详情页的 `HotLoad` 组件连接到 WebSocket (端口 80)，当 Markdown 文件发生变化时，通过 `/api/preview` 重新获取文章数据。

### 错误处理

- 简约模式: 空值/提前返回检查 (`if(buttonRef.current===null) return`)
- 偶尔使用可选链
- 脚本级代码之外不使用 try/catch
- 保持错误处理简单 — 不要在尚未使用的地方添加 try/catch

### 需要遵循的约定

1. 新页面必须包裹在 `<Layout>` 中，包含 `<Head>` 标题，并添加 `<BackToTop />`
2. 所有布局/样式使用 Tailwind — 仅在 `globals.css` 中添加复杂文章内容样式
3. 导入路径: 嵌套路由中的页面使用 `../../components/X`，顶层页面使用 `../components/X`
4. Markdown 文章 URL 遵循模式: `/blogs/2020/javascript-closure/`
5. 新系列文章放入 `_contents/series/{系列名称}/`，新博客文章放入 `_contents/posts/{年份}/`
6. 生产环境隐藏草稿 — 在头信息中设置 `draft: true`
7. 不要添加测试 — 此项目没有测试框架或测试运行器
