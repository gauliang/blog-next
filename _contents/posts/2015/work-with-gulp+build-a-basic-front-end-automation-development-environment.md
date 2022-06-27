---
title: 构建一个基本的前端自动化开发环境 —— 基于 Gulp 的前端集成解决方案（四）
author: 高国良
type: posts
series: false
date: 2015-11-25T08:25:00.791Z
tags: [gulp, sass, npm, nodejs]
description: 在对于 npm / node / gulp 有了基本的认识之后，本文主要介绍如何构建一个基本的前端自动化开发环境。下面将逐步构建一个可以自动编译 sass 文件、压缩 javascript 文件、多终端多浏览器同步测试的开发环境，并且还可以通过 piblish 命令对项目下的文件进行打包操作。
draft: false 
cover: false
---

通过前面几节的准备工作，对于npm / node / gulp 应该已经有了基本的认识，本节主要介绍如何构建一个基本的前端自动化开发环境。 下面将逐步构建一个可以自动编译 sass 文件、压缩 javascript 文件、多终端多浏览器同步测试的开发环境，并且还可以通过 piblish 命令对项目下的文件进行打包操作。

> 相关连接导航
>
> [在windows下安装gulp &mdash;&mdash; 基于 Gulp 的前端集成解决方案（一）](http://www.cnblogs.com/kelsen/p/4608119.html)
>
> [执行 $Gulp 时发生了什么 &mdash;&mdash; 基于 Gulp 的前端集成解决方案（二）](http://www.cnblogs.com/kelsen/p/4611102.html)
>
> [常用 Gulp 插件汇总 &mdash;&mdash; 基于 Gulp 的前端集成解决方案（三）](http://www.cnblogs.com/kelsen/p/4643762.html)
>
> [构建一个基本的前端自动化开发环境 &mdash;&mdash; 基于 Gulp 的前端集成解决方案（四）](http://www.cnblogs.com/kelsen/p/4993169.html)

## 一、创建目录结构

建立如下目录结构，learn-gulp 作为我们的项目根目录。

```
learn-gulp/├── app/│   ├── sass/│   │   └─ main.scss│   ├── scripts/│   │   └─ javascript.js│   └── index.html├── dist/└── release/
```

app 为工作目录，所有操作都在该目录下进行。gulp 检测到文件变动会自动对文件进行处理并分发至 dist 目录。

dist 目标文件目录，这里是编译、压缩过的文件。

release 可以发布至服务器的文件。

## 二、初始化npm软件包信息

在learn-gulp 目录下执行 npm init。这一步主要是创建一个 package.json 文件，便于与开发团队其他成员分享当前环境信息。

运行 npm init 会要求输入项目名称、版本号、描述、入口程序名称、关键字、作者、license 等信息，根据实际情况输入即可。下面是我输入相关信息后生成的 package.json 文件，供参考：

```
{  "name": "fedis",  "version": "1.0.4",  "description": "fedis - Front-End development integration solution",  "main": "index.js",  "keywords": [    "gulp",    "sass",    "browser-sync",    "style",    "html"  ],  "author": "kelsen",  "license": "MIT",  "bugs": {    "url": ""  },  "homepage": "",  "repository": {    "type": "git",    "url": "https://github.com/"  }}
```

注意：部分选项可以不填写，如 git 仓库选项。

## 三、安装 npm 软件包

通过命令 npm install package-name 安装 npm 软件包，建议带上--save 参数，这样就会把你安装的软件都记录在dependencies 字段下，便于分享你的开发环境给其他人。关于 install 以及--save 参数的相关信息请参考[NPM 入门 - 基础使用](http://www.cnblogs.com/kelsen/p/4947859.html)。

下面列出了要安装的软件包

```
"dependencies": {    "browser-sync": "2.10.0",    "browsersync-ssi": "0.2.4",    "gulp": "^3.9.0",    "gulp-concat": "^2.6.0",    "gulp-minify": "0.0.5","gulp-plumber": "^1.0.1","gulp-sass": "2.1.0",    "gulp-zip": "^3.0.2"}
```

这些软件包的基本介绍请参考[常用 Gulp 插件汇总 &mdash;&mdash; 基于 Gulp 的前端集成解决方案（三）](http://www.cnblogs.com/kelsen/p/4643762.html)。

## 四、构建 gulp 任务

安装完所有软件包后，在项目目录 learn-gulp 中新建一个javascript文件，命名为 gulpfile.js ，在该文件中定义任务。如果要了解更详细的有关 **任务** 的信息，请参考[执行 $Gulp 时发生了什么 &mdash;&mdash; 基于 Gulp 的前端集成解决方案（二）](http://www.cnblogs.com/kelsen/p/4611102.html)。

1、加载 gulp 插件。

```
'use strict';var gulp        = require('gulp'),    browserSync = require('browser-sync').create(),    SSI         = require('browsersync-ssi'),    concat      = require('gulp-concat'),    minify      = require('gulp-minify'),    plumber     = require('gulp-plumber'),    sass        = require('gulp-sass'),    zip         = require('gulp-zip');
```

这里注意，第一行的'use strict';

2、构建一个处理静态文件的 server ，并监听工作目录，当工作目录有文件变化时立即进行相关操作并执行 browserSync.reload重新加载页面。

```
gulp.task('serve', function() {    browserSync.init({        server: {            baseDir:["./dist"],            middleware:SSI({                baseDir:'./dist',                ext:'.shtml',                version:'2.10.0'            })        }    });    gulp.watch("app/scss/**/*.scss", ['sass']);    gulp.watch("app/scripts/**/*.js", ['js']);    gulp.watch("app/**/*.html", ['html']);    gulp.watch("dist/**/*.html").on("change",browserSync.reload);});
```

如有疑问可参考官网文档：browsersync.io

3、编译 sass 文件、并自动注入到浏览器

```
// Compile sass into CSS & auto-inject into browsersgulp.task('sass', function() {        return gulp.src("app/scss/**/*.scss")        .pipe(plumber())        .pipe(sass.sync().on('error', sass.logError))        .pipe(sass({outputStyle:"compact"}))        .pipe(gulp.dest("dist/styles"))        .pipe(browserSync.stream());});
```

这里需要注意app/scss/\*\*/\*.scss ，是app/scss/ 目录下所有SCSS文件的意思。

4、压缩 javascript 文件

```
// javscript files operategulp.task('js', function(){    return gulp.src('app/scripts/**/*.js')        .pipe(plumber())        .pipe(minify())        .pipe(gulp.dest("dist/scripts"))        .pipe(browserSync.stream());});
```

对 learn-gulp/app/scripts/ 下的所有 javascript 文件进行压缩处理并分发至learn-gulp/dist/scripts/ 目录下，每个文件都会对应的生成相应的压缩文件, 如 file.js & file.min.js

5、处理 html 文件

```
gulp.task('html', function() {        return gulp.src("app/*.html")        .pipe(plumber())                .pipe(gulp.dest("dist/"))        .pipe(browserSync.stream());});
```

这里并未对 html 文件做任何改动，你可以根据实际情况进行一些操作。

6、打包发布目标文件

```
// publishgulp.task('publish', function(){    return gulp.src('dist/**/*')        .pipe(plumber())        .pipe(zip('publish.zip'))        .pipe(gulp.dest('release'))});
```

该任务负责把 learn-gulp/dist 目录下的文件打包成一个 zip 文件并分发至 learn-gulp/release 目录下。

运行命令 *$ gulp publish* 可执行该任务。

7、编辑默认任务

```
gulp.task('default', ['html','serve']);
```

default 任务是运行 gulp 时执行的第一个任务。我们通过 default 任务来执行 serve 任务。

## 五、开始工作

1、运行 gulp 命令，如果没有异常 gulp 就已经开始工作了，浏览器会自动打开。

2、打开 learn-gulp/app/scss/main.scss 输入如下内容

```
.fedis-main{    background-image: linear-gradient(135deg, #573e81, #133259 40%, #133259);    color: #FFF;    padding: 80px;        h1{font-size: 6em; font-family: Arial, Helvetica, sans-serif; text-align: center;font-weight: 100; }}.footer{color:#888 }
```

当按下 Ctrl+S 保存时，sass 任务会自动执行，执行完成后 learn-gulp/dist/styles/ 目录下会生成css文件 main.css

3、打开编辑器在 learn-gulp/app/index.html 文件中输入下面内容

```
<!DOCTYPE html><html lang="en"><head>    <meta charset="UTF-8">    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">    <title>Welcome - Fedis</title>    <link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">    <link rel="stylesheet" href="//cdn.bootcss.com/font-awesome/4.4.0/css/font-awesome.css">    <link rel="stylesheet" href="styles/main.css"></head><body>    <div class="container" id="main">        <div class="row">            <div class="col-md-12">                <div class="jumbotron text-center fedis-main">                    <h1>Fedis</h1>                                        <p>Front-End development integration solution</p>                    <small>                        <a class="btn btn-success" href="http://shang.qq.com/wpa/qunwpa?idkey=1aab8e1fc1e992b7390185551e84701163bb9dbdc32a769b185d9f8fd6e70262" target="_blank"><i class="fa fa-qq"></i>加入Q 群<br>221702761</a>                    </small>                </div>                <hr>                <div class="footer text-center">                    <small>Fedis 1.0.0 &middot; Created by Kelsen</small>                </div>            </div>        </div>    </div>        <script src="http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js"></script>    <script src="scripts/javascript.js"></script></body></html>
```

此时按下Ctrl+S 后 learn-gulp/dist/ 下相应位置的 index.html 文件将被新版本替换，紧接着浏览器会自动显示最新效果。

## 写在最后

如果您有任何建议或疑问请在下面留言交流。
