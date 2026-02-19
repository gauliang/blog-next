这是一个使用 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 启动的 [Next.js](https://nextjs.org/) 项目。

## 快速开始

首先启动开发服务器：

```bash
npm run dev
# 或者
yarn dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看效果。

编辑 `pages/index.tsx` 来开始修改页面。保存后页面会自动更新。

[API 路由](https://nextjs.org/docs/api-routes/introduction) 可通过 [http://localhost:3000/api/hello](http://localhost:3000/api/hello) 访问。该接口文件位于 `pages/api/hello.ts`，可以在此修改。

`pages/api` 目录会映射为 `/api/*`，该目录下的文件会被视为 [API 路由](https://nextjs.org/docs/api-routes/introduction)，而不是 React 页面。

## 了解更多

想了解 Next.js 的更多内容，可参考以下资源：

- [Next.js 文档](https://nextjs.org/docs) - 了解 Next.js 的特性和 API。
- [Learn Next.js](https://nextjs.org/learn) - 交互式的 Next.js 教程。

你也可以查看 [Next.js 的 GitHub 仓库](https://github.com/vercel/next.js/)，欢迎反馈和贡献！

## 在 Vercel 上部署

将 Next.js 应用部署到线上最简单的方法是使用 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)，它由 Next.js 的创建者提供。

更多部署细节请参阅我们的 [Next.js 部署文档](https://nextjs.org/docs/deployment)。

## 在 Github 上部署

```bash
npm run build
npm run export

rm -rf gauliang.github.io/_next/
cp -rf out/ gauliang.github.io/

cd gauliang.github.io/
git checkout master
git add -f .
git commit -m "Rebuilding site $(date)"
git push origin master

cd ..
git add .
git commit -m "Rebuilding site $(date)"
git push origin master

```