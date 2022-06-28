---
title: 常用 Gulp 插件汇总 —— 基于 Gulp 的前端集成解决方案（三）
author: 高国良
type: posts
series: false
date: 2015-11-15T17:50:00.791Z
tags: [gulp, npm]
description: 前两篇文章讨论了 Gulp 的安装部署及基本概念，借助于 Gulp 强大的 插件生态 可以完成很多常见的和不常见的任务。本文主要汇总常用的 Gulp 插件及其基本使用，需要读者对 Gulp 有一个基本的了解。
cover: false
---

前两篇文章讨论了 Gulp 的安装部署及基本概念，借助于 Gulp 强大的 [**插件生态**](http://gulpjs.com/) 可以完成很多常见的和不常见的任务。本文主要汇总常用的 Gulp 插件及其基本使用，需要读者对 Gulp 有一个基本的了解。

gulp 插件基于 nodejs ，安装一个Gulp 插件和安装普通 Nodejs 包的方法是一样的。只需 ***npm --save-dev install 插件名***就可以完成安装。

## gulp-sass

预编译 sass 文件为 css 文件，SASS 不多说，如果项目中有使用 sass ，那么这个插件应该是必备的。前面的一篇文章中，已经对该插件有所使用了，可配置编译后输出风格、是否输出sourcemap 等常用选项。类似的项目还有 `gulp-scss/gulp-sassdoc/compass`

安装：`npm install --save-dev gulp-sass`

文档：https://www.npmjs.com/package/gulp-sass/

## browser-sync

保持多浏览器、多设备同步、在前端开发是非常有用，可谓是必备组件。

安装：`npm install browser-sync`

文档：http://www.browsersync.io

## gulp-imagemin

压缩 png/jpg/git/svg 格式图片文件

安装：`npm install --save-dev gulp-imagemin`

文档：github.com/sindresorhus/gulp-imagemin

## gulp-gzip

Gzip 插件

安装：`npm install gulp-gzip`

文档：github.com/jstuckey/gulp-gzip

## gulp-inject

一个 js/css/webComponet注入插件，browser-sync里面继承了该组件，如果使用browser-sync就不必要再单独安装gulp-inject了

安装：`npm install gulp-inject`

文档：github.com/klei/gulp-inject

## gulp-markdown

markdown 不用多说，这个基本上都要用到。

安装：`npm install gulp-markdown`

文档：github.com/sindresorhus/gulp-markdown

## gulp-plumber

错误处理插件，如果不希望总是因为错误而中断任务的话，那么它几乎是必备组件。

安装：`npm install gulp-plumber`

文档：github.com/floatdrop/gulp-plumber

## gulp-minify-css

压缩CSS文件，几乎也是必备

安装：`npm install gulp-minify-css`

文档：github.com/murphydanger/gulp-minify-css

## gulp-rename

重命名文件的插件，当要把一个文件存储为不同版本时可以使用。比如在需要一个style.css同时你有需要一个style.min.css

安装：`npm install gulp-rename`

文档：github.com/hparra/gulp-rename

## gulp-concat

顾名思义，用来整合文件用的。很常用

安装：`npm install gulp-concat`

文档：github.com/wearefractal/gulp-concat