---
title: 执行 $Gulp 时发生了什么 —— 基于 Gulp 的前端集成解决方案（二）
author: 高国良
type: posts
series: false
date: 2015-07-11T00:05:00.791Z
tags: [gulp, sass]
description: Gulp 是一个构建工具，通过自动化处理常用任务以提高工作效率。其基于 Node.js 构建，可以使用 javascript 定义任务。Gulp 本身并不做任何事情，但他提供了定义任务、执行任务的能力，以及加载插件的机制。通过编写任务以让 Gulp 替我们自动完成诸如 SASS 文件预编译、JS文件压缩及合并、浏览器同步等日常事务。
draft: false 
cover: false
---

### **前言**

文章***[在windows下安装gulp &mdash;&mdash; 基于 Gulp 的前端集成解决方案（一）](http://www.cnblogs.com/leonkao/p/4608119.html)***中，已经完成对 gulp 的安装，由于是window环境，文中特意提到了可以通过安装gitbash 来代替 window 系统的 CMD 命令行工具。本节主要围绕 **如何使用 Gulp 完成一个预编译 SASS 文件的任务**来逐步熟悉 Gulp 。

本文地址：http://www.cnblogs.com/leonkao/p/4611102.html

> 相关连接导航
>
> [在windows下安装gulp &mdash;&mdash; 基于 Gulp 的前端集成解决方案（一）](http://www.cnblogs.com/kelsen/p/4608119.html)
>
> [执行 $Gulp 时发生了什么 &mdash;&mdash; 基于 Gulp 的前端集成解决方案（二）](http://www.cnblogs.com/kelsen/p/4611102.html)
>
> [常用 Gulp 插件汇总 &mdash;&mdash; 基于 Gulp 的前端集成解决方案（三）](http://www.cnblogs.com/kelsen/p/4643762.html)
>
> [构建一个基本的前端自动化开发环境 &mdash;&mdash; 基于 Gulp 的前端集成解决方案（四）](http://www.cnblogs.com/kelsen/p/4993169.html)

### **Gulp 概述**

Gulp 是一个构建工具，通过自动化处理常用任务以提高工作效率。其基于 Node.js 构建，可以使用 javascript 定义任务。Gulp 本身并不做任何事情，但他提供了定义任务、执行任务的能力，以及加载插件的机制。通过编写任务以让 Gulp 替我们自动完成诸如 SASS 文件预编译、JS文件压缩及合并、浏览器同步等日常事务。

### **Gulp 入门**

要使 Gulp 开始工作，需要先创建一个 gulpfile.js 文件，所有的任务都在这里头定义。然后通过 ***$Gulp 任务名称*** 或 ***$gulp*** 执行任务。下面，假设有一个预编译 SASS 文件的任务，以这个小任务为牵引逐步了解 Gulp。

1、创建项目文件夹 learning-gulp ，随后为其创建 scss 和 styles 子目录，分别用于存储 SASS 文件和 CSS 文件。并创建一个 sass.scss 文件到 scss 目录中。输入一段 sass 代码：

```
$color: #FF0000;body{    background-color:$color;}
```

2、启动 gitbash 执行 ***$ cd /d/learning-gulp***进入项目目录。

3、在当前项目下安装 Gulp ，***$ npm install --save-dev gulp***，随后安装 Gulp-sass 插件***$ npm install --save-dev gulp-sass***。

4、在项目目录下创建文件 gulpfile.js ,并输入下面内容：

```
'use strict';var gulp  = require('gulp'),      sass  = require('gulp-sass');gulp.task('sass', function() {    return gulp.src("scss/*.scss")        .pipe(sass())        .pipe(gulp.dest("styles"));});gulp.task('default', ['sass']);    
```

5、执行 ***$ gulp***或 ***$ gulp "sass"***命令，不出意外会输出以下结果：

```
$ gulp[22:06:10] Using gulpfile d:\learning-gulp\gulpf[22:06:10] Starting 'sass'...[22:06:10] Finished 'sass' after 18 ms[22:06:10] Starting 'default'...[22:06:10] Finished 'default' after 8.27 &mu;s
```

这个时候，打开 styles 文件夹，会发现里面多了个名为sass.css 的文件，其内容为我们上面第一步中 scss 文件的编译结果。那么，执行***$ gulp***时都发生了什么呢？

### **执行 $ Gulp 时发生了什么**

前面提到 Gulp 本身并不会做任何事情，但可以执行任务，所以，我们通过编写任务，把任务交给gulp去执行。上面例子第四步，创建了一个文件 gulpfile.js ，gulpfile.js 就是我们定义任务的地方。一开始加载了 gulp 和 gulp-sass 模块：

```
var gulp    = require('gulp'),    sass    = require('gulp-sass');
```

紧接着，定义了一个名字叫做 sass 的任务，当执行 sass 任务的时候会执行 task 的的第二个参数(匿名函数)

```
gulp.task('sass', function() {});
```

下面看这个匿名函数体，这里需要一点点 stream 基础。

```
return gulp.src("scss/*.scss")      .pipe(sass())      .pipe(gulp.dest("styles"));
```

### Stream

stream 允许你传递数据给一些函数，函数将对数据进行修改，然后将修改后的数据传递给下一个函数。上面的例子中 gulp.src() 函数通过字符串"scss/\*.scss" 匹配到所有的 sass 文件，然后创建一个 stream 对象。随后将其传递给 sass() 函数，sass() 对数据进行修改后再返回一个 stream 对象传递给 gulp.dest(), gulp.dest() 将文件输出到 styles 目录中。

要理解这段代码其实也不难，只要适当了解一下 nodejs 中 stream 的概念即可。这里给几个关于stream的文章，供学习参考：

> https://github.com/substack/stream-handbook  
> http://nodejs.org/docs/v0.4.7/api/streams.html  
> http://my.oschina.net/sundq/blog/192276

### gulp.src(globs\[, options\])

该方法将匹配到的文件返回为一个可以通过pipe传送给plugin 的 stream。

### 定义任务（task）

可以使用 gulp.task() 函数定义任务。

下面代码演示如何创建一个任务，传递两个参数给gulp.task()：string 任务名字，funciton(){}任务业务逻辑。运行***$gulp hi***控制台将输出 &ldquo;Hello Gulp!&rdquo;

```
gulp.task('hi', function () {   console.log('Hello Gulp!');});
```

也可以创建一个用来执行一个任务列表的任务，说起来有点绕口，看代码就一目了然了。下面创建一个 build 任务，当执行该任务时会依次执行 sass/jshint任务。

```
gulp.task('build', ['sass', 'jshint']);
```

有时可能需要在执行一个任务前，先确保另一个任务已经执行完毕，此时我们只需在任务名和当前任务体之间插入要提前执行的任务列表（数组形式）即可，如下：

```
gulp.task('newtask', ['hi'], function () {});
```

这会在执行newtask之前先执行完毕 hi 任务。

### default 任务

上面例子第五步中提到，执行$ gulp或$ gulp "sass"命令。其实执行 $ gulp 与 $gulp default 是一样的效果，Gulp 在没有提供任务名的时候会执行名为 default 的任务。上例中我们把 sass 任务放在 default 前执行，所以直接执行 $ gulp 就会编译 SCSS 文件。

### gulp.dest()

将传输进来的数据生成为文件/文件夹，不存在的文件夹将会被创建。新文件路径就是传递进去的路径参数。看下面的例子有助于更好的理解 gulp.dest()

```
gulp.src('./client/templates/*.jade')  .pipe(jade())  .pipe(gulp.dest('./build/templates'))  .pipe(minify())  .pipe(gulp.dest('./build/minified_templates'));
```

### 文件监控

Gulp 提供文件监控的能力，它允许我们监控一个或一组文件的状态，当这些文件发生变化时触发一个任务。这是一个非常实用和常用的功能，比如，可以通过监控 sass 文件，来做到当修改并完成保存 scss 文件变化后自动变异 scss 文件为 css 文件，然后注入或刷新页面。

通过 gulp.watch() 函数可实现对文件的监控，该函数有两个参数，第一个参数用于匹配（类似gulp.src()）待监控的文件，第二个参数是一个数组\[当文件变化时要执行的任务队列\]，或回调函数。

继续上面 **gulp 入门**章节的例子，假设我们希望在修改 sass 文件时，在按下Ctrl + S 后自动编译 SASS 文件，而不是通过手动执行 ***$ gulp sass***命令。我们可以向下面这样使用 gulp.watch()

```
gulp.task('watch', function () {   gulp.watch('scss/*.scss', ['sass']);});
```

运行 $gulp watch 执行该任务后，只要我们修改 sass 文件，当我们完成保存时，gulp 会自动编译 Sass 文件到styles目录下。

我们还可以给 gulp.watch() 传递一个回调函数，替换掉刚才的那个任务列表数组 \['sass'\]，下面的例子中回调函数传递了一个对象 event，它包含一些触发回调函数的事件信息。

```
gulp.watch('scss/*.scss', function (event) {   console.log('Event type: ' + event.type);   console.log('Event path: ' + event.path);});
```

gulp.watch() 返回一个事件发射器(EventEmitter)，通过事件发射器可以监听 类似Change 、end 、error、ready、nomatch等事件。

### **插件**

上面例子中我们用到了 gulp-sass 插件，该插件实现对 sass.scss 文件的编译，最终生成 css 文件。要使用一个 gulp 插件非常方便，只需在使用前加载该插件，然后pipe传递数据给插件就可以，gulp中几乎全部的插件，在不做任何配置的情况下，都是可以直接使用的。gulp-sass 插件功能非常完善，通过修改改配置可以改变其行为，本节只为熟悉 gulp 的基本运行流程，暂不讨论某一个插件如何使用。后续章节会挑选出最常/实用的插件仔细讨论，以及如何通过多个插件来完成一组任务。最后会仔细探索插件机制以及如何开发一个插件并提交到gulp插件库。

### 总结

1. Gulp 任务在 Gulpfile.js 中定义
2. 在 gulpfile.js 中通过 require 加载第三方模块/插件
3. 通过 gulp.task() 函数可以定义任务，通过传递任务名字和一个匿名函数可以快速定义一个简单任务。
4. 还可以通过在任务名称后再传递一个数组来定义任务列表，或���前任务执行前需执行完毕的任务。
5. 通过 gulp.src() 可以选择文件，并将其生成为 stream 对象。
6. stream 可以传递给一些函数，函数会对数据进行修改，并将修改改的数据以 stream 形式返回，便于传递给下一个函数使用。
7. 要执行 Gulp 任务，只需要在命令行输入 ***gulp "任务名"***即可，如果没有指定要执行的任务名，gulp 将默认执行 名字为 default 的任务。

### **参考资料**

由于个人能力和语言水平限制，某些知识点可能说的还不够准确严谨，欢迎纠错。大家对文中内容有任何疑点均可在评论中提出，或直接查阅本文参考资料。

> http://gulpjs.com/
>
> http://www.smashingmagazine.com/2014/06/11/building-with-gulp/
>
> https://markgoodyear.com/2014/01/getting-started-with-gulp/

## 写在后面

关于本文如果您有任何建议或疑问请在下面留言交流。
