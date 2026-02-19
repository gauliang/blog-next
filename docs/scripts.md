# scripts 目录脚本使用说明

本项目在 `scripts/` 目录下包含若干辅助脚本，`package.json` 中提供了便捷的 npm 脚本来调用它们。以下为每个脚本的说明与常用用法：

## 概览

- `scripts/make.js` — 生成静态站点或执行构建前的内容生产任务。对应的 npm 命令：

```bash
npm run make
```

- `scripts/spider.js` — 抓取或爬取内容（用于采集/更新文章或附件）。通常直接用 `node` 运行：

```bash
node scripts/spider.js
```

- `scripts/watch.js` — 监听文件变化并触发构建或热更新辅助任务。项目的 `dev` 命令会并行启动该脚本：

```bash
npm run dev
# 相当于先在后台运行 watch 脚本，再启动 next dev
```

## 运行方式

建议通过 `npm run` 使用，示例：

```bash
# 运行生成脚本
npm run make

# 启动开发（会并行运行 watch.js）
npm run dev
```

或者可以直接使用 `node` 执行脚本（适合调试）：

```bash
node scripts/make.js
node scripts/spider.js
node scripts/watch.js
```

## 环境与依赖

这些脚本可能依赖于项目依赖中的若干包（见 `package.json`）。运行前请先安装依赖：

```bash
npm install
```

如果需要在 macOS 上以后台方式启动 `watch.js`，你可以在 shell 中使用 `&` 或 `nohup`：

```bash
node scripts/watch.js &
# 或
nohup node scripts/watch.js &
```

## 日志与调试

- 脚本通常会在控制台输出日志；如需更详细调试，可在脚本顶部添加 `console.log` 或使用 `node --inspect`。

## 维护建议

- 若修改脚本，建议在 `docs/scripts.md` 记录变更与参数说明。
- 将常用复合命令写入 `package.json` 的 `scripts` 字段，便于团队统一使用。

