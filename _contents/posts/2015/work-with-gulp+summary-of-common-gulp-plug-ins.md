---
title: 常用 Gulp 插件汇总 —— 基于 Gulp 的前端集成解决方案（三）
author: 高国良
type: posts
series: false
date: 2015-11-15T17:50:00.791Z
tags: [gulp, npm, nodejs]
description: 前两篇文章讨论了 Gulp 的安装部署及基本概念，借助于 Gulp 强大的 插件生态 可以完成很多常见的和不常见的任务。本文主要汇总常用的 Gulp 插件及其基本使用，需要读者对 Gulp 有一个基本的了解。如果你对 Gulp 还不是很了解，可以通过下面两篇文章快速了解 Gulp 。 由于几乎所有的
draft: false 
cover: false
---

前两篇文章讨论了 Gulp 的安装部署及基本概念，借助于 Gulp 强大的 [**插件生态**](http://gulpjs.com/) 可以完成很多常见的和不常见的任务。本文主要汇总常用的 Gulp 插件及其基本使用，需要读者对 Gulp 有一个基本的了解。如果你对 Gulp 还不是很了解，可以通过下面两篇文章快速了解 Gulp 。

由于几乎所有的插件都有非常友好的使用文档，所以本文不讨论涉及插件使用的东西，仅是一个汇总、排名不分先后。

> 相关连接导航
>
> [在windows下安装gulp &mdash;&mdash; 基于 Gulp 的前端集成解决方案（一）](http://www.cnblogs.com/kelsen/p/4608119.html)
>
> [执行 $Gulp 时发生了什么 &mdash;&mdash; 基于 Gulp 的前端集成解决方案（二）](http://www.cnblogs.com/kelsen/p/4611102.html)
>
> [常用 Gulp 插件汇总 &mdash;&mdash; 基于 Gulp 的前端集成解决方案（三）](http://www.cnblogs.com/kelsen/p/4643762.html)
>
> [构建一个基本的前端自动化开发环境 &mdash;&mdash; 基于 Gulp 的前端集成解决方案（四）](http://www.cnblogs.com/kelsen/p/4993169.html)

# **插件安装**

gulp 插件基于 nodejs ，安装一个Gulp 插件和安装普通 Nodejs 包的方法是一样的。只需 ***$npm --save-dev install 插件名***就可以完成安装。

### 1、gulp-sass

预编译 sass 文件为 css 文件，SASS 不多说，如果项目中有使用 sass ，那么这个插件应该是必备的。前面的一篇文章中，已经对该插件有所使用了，可配置编译后输出风格、是否输出sourcemap 等常用选项。类似的项目还有 gulp-scss / gulp-sassdoc / compass

安装：*$npm install --save-dev gulp-sass*

文档：https://www.npmjs.com/package/gulp-sass/

**2、browser-sync**

保持多浏览器、多设备同步、在前端开发是非常有用，可谓是必备组件。

安装：npm install browser-sync

文档：http://www.browsersync.io

**3、gulp-imagemin**

压缩 png/jpg/git/svg 格式图片文件

安装：$npminstall--save-devgulp-imagemin

文档：github.com/sindresorhus/gulp-imagemin

**4、gulp-gzip**

Gzip 插件

安装：npm install gulp-gzip

文档：github.com/jstuckey/gulp-gzip

**5、gulp-inject**

一个 js/css/webComponet注入插件，browser-sync里面继承了该组件，如果使用browser-sync就不必要再单独安装gulp-inject了

安装：npm install gulp-inject

文档：github.com/klei/gulp-inject

**6、gulp-markdown**

markdown 不用多说，这个基本上都要用到。

安装：npm install gulp-markdown

文档：github.com/sindresorhus/gulp-markdown

**7、gulp-plumber**

错误处理插件，如果不希望总是因为错误而中断任务的话，那么它几乎是必备组件。

安装：npm install gulp-plumber

文档：github.com/floatdrop/gulp-plumber

**8、gulp-minify-css**

压缩CSS文件，几乎也是必备

安装：npm install gulp-minify-css

文档：github.com/murphydanger/gulp-minify-css

**9、gulp-rename**

重命名文件的插件，当要把一个文件存储为不同版本时可以使用。比如在需要一个style.css同时你有需要一个style.min.css

安装：npm install gulp-rename

文档：github.com/hparra/gulp-rename

**10、gulp-concat**

顾名思义，用来整合文件用的。很常用

安装：npm install gulp-concat

文档：github.com/wearefractal/gulp-concat

# 写在最后

本文将持续更新，以收录一些非常有趣或常用的gulp插件。
