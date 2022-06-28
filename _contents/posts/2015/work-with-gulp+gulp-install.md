---
title: 在 windows 下安装 gulp —— 基于 Gulp 的前端集成解决方案（一）
author: 高国良
type: posts
series: false
date: 2015-06-30T11:25:00.791Z
tags: [gulp]
description: 基于 Gulp 构建一个基本的前端自动化开发环境
draft: false 
cover: false
---


## 一、准备工作

1、什么是 npm?

npm 是 nodejs 的包管理工具，主要功能就是管理、更新、搜索、发布node的包。Gulp 就是通过 NPM 安装的。
关于 NPM 中文介绍，这里有一篇非常不错的文章：http://www.cnblogs.com/chyingp/p/npm.html

完整的 NPM 文档请看这里 ：https://docs.npmjs.com

2、安装 Node.js 并升级 NPM 到最新版本

nodejs 安装：打开nodejs.org 下载 nodejs 安装包，并根据提示安装，这里不做赘述。

npm 升级：当安装完 nodejs 后，npm 就已经可用，打开命令行执行 *npm -v* 如果正确显示版本号，则说明安装没有问题。
由于npm的更新速度比nodejs 要快，所以输入*npm install npm -g*升级npm 。

3、gitbash

windows 下的命令行工具 CMD 实在难用，这里推荐一个替代方案，建议安装 gitbash 。反正少不了使用 GIT ，只需在安装 GIT 时选择gitbash 组件即可。
GIT 的安装这里也不做太多说明，有疑问的可以在回复中提问。

4、什么是 gulp

gulp 官方的介绍是 *用自动化构建工具增强你的工作流程！ —— Automate and enhance your workflow！* 其有着易于使用、构建快速、高质量插件丰富、易于学习等众多优势。
下一节中会仔细讨论和领略 gulp 的风采！

## 二、安装 gulp

千呼万唤始出来，终于到 gulp 登场的时候了。如果你已经对前面的三个步骤感到疲倦，那么安装 gulp 这一步就是让你稍作休息的绝佳时机。
Gulp 的开发团队将其安装过程做的相当完美，不需要复杂的配置，不需要漫长的等待。废话不说，进入正题：

首先，打开gitbash 这个利器，找一个位置，创建并进入一个项目文件夹，并输入下列命令来完成 gulp 的安装。

```bash
# 全局安装请执行
$ npm install --global gulp

# 在项目目录安装请输入
$ npm install --save-dev gulp
```

然后，创建一个名为 gulpfile.js 的配置文件在当前目录下，并输入下面的代码，这里创建了一个空的任务（仅作为用于测试gulp是否正常工作）

```js
var gulp = require('gulp');
gulp.task('default', function() {
    // place code for your default task here
});
```

最后，执行 `gulp`，如果正确输出类似下面的信息，则说明gulp 已经正确安装并运行。

```bash
gulp
[11:13:17] Using gulpfile xxx\gulpfile.js
[11:13:17] Starting 'default'...
[11:13:17] Finished 'default' after 44 μs
```

至此，gulp 就已经安装完毕，下面要做的就是熟悉如何使用gulp，以及其周边生态。
