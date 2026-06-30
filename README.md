# next-blog

基于 [Next.js](https://nextjs.org/) 的个人博客，使用 SSG 静态生成，支持深色模式，内容由 Markdown 驱动。

## 快速开始

```bash
npm install
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 项目结构

```
next-blog/
├── _contents/
│   ├── posts/{年份}/  # 博客文章
│   └── series/        # 系列文章
├── components/        # 可复用 UI 组件
├── lib/               # 工具库与配置
│   ├── posts.tsx      # 文章数据读取
│   ├── snippets.tsx   # 常量与共用代码
│   ├── remark-plugins.ts  # Markdown 解析插件
│   └── config.json    # 系列定义配置
├── pages/             # Next.js 页面路由
├── scripts/           # 辅助脚本
├── styles/            # Tailwind + 自定义 CSS
└── public/            # 静态资源
```

## 可用命令

| 命令 | 说明 |
|---|---|
| `npm run dev` | 启动开发服务器，并行运行 `watch.js`（监听 Markdown 变化热重载）和 `next dev` |
| `npm run build` | `next build`，构建生产版本 |
| `npm run export` | `next export`，导出为静态文件至 `out/` |
| `npm run start` | `next start`，启动生产服务器 |
| `npm run lint` | `next lint`，代码检查 |
| `npm run make` | 交互式 CLI，创建新文章 |
| `npm run deploy` | 一键部署到 GitHub Pages |

脚本也可直接使用 `node` 运行（适合调试）：

```bash
node scripts/make.js
node scripts/spider.js
node scripts/watch.js
```

> `spider.js` 是从博客园抓取历史文章的采集脚本，日常开发无需关注。

## 新增内容

### 博客文章

使用交互式 CLI：

```bash
npm run make
```

按提示选择 `posts` 类型，输入文件名即可。系统自动在 `_contents/posts/{当前年份}/` 下生成 Markdown 文件。

也可手动创建：在 `_contents/posts/{年份}/` 目录下新建 `{slug}.md`，头信息格式如下：

```yaml
---
title: "文章标题"
author: GauLiang
type: posts
series: false
date: 2024-01-01T00:00:00+08:00
tags: [tag1, tag2]
description: 文章简介
draft: true
cover: false
---
```

草稿（`draft: true`）在生产环境构建时会被自动隐藏。

#### 图片插入

图片文件放在 `.md` 文件同级目录，引用时直接写文件名：

```markdown
![图片描述](image-name.jpg)
```

构建时 `remarkImage` 插件会自动将路径重写为 `/attachments/posts/{年份}/{slug}.files/{文件名}`。支持 jpg、png、gif、webp 等格式。

文章封面在头信息的 `cover` 字段指定，同样放在文章同级目录下。

### 系列文章

先在 `lib/config.json` 中定义系列：

```json
{
    "name": "react",
    "title": "深入 React",
    "description": "深入 React 系列之源码",
    "status": "进行中",
    "image": "/attachments/series/react.jpg"
}
```

然后用 `npm run make` 选择 `series` 类型并指定所属系列；或手动在 `_contents/series/{系列标识}/` 下创建 Markdown 文件，头信息中设置 `type: series` 和 `series: {系列标识}`。

## 部署

一键部署（需先配置好 `gauliang.github.io` 子模块）：

```bash
npm run deploy
```

手动部署：

```bash
npm run build && npm run export
rm -rf gauliang.github.io/_next/
cp -rf out/ gauliang.github.io/
cd gauliang.github.io/ && git add -f . && git commit -m "Rebuilding site $(date)" && git push origin master
cd .. && git add . && git commit -m "Rebuilding site $(date)" && git push origin master
```
