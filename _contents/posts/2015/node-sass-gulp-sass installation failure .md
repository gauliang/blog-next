---
title: 网络原因导致 npm 软件包 node-sass / gulp-sass 安装失败的处理办法
author: 高国良
type: posts
series: false
date: 2015-11-18T22:07:00.791Z
tags: [install, sass, npm, nodejs, node-sass]
description: 如果你正在构建一个基于 gulp 的前端自动化开发环境，那么极有可能会用到 gulp-sass ,由于网络原因你可能会安装失败，因为安装过程中部分细节会到亚马逊云服务器上获取文件。本文主要讨论在不变更网络环境的前提下安装 gulp-sass / node-sass 。
draft: false 
cover: false
---

如果你正在构建一个基于 gulp 的前端自动化开发环境，那么极有可能会用到 gulp-sass ,由于网络原因你可能会安装失败，因为安装过程中部分细节会到亚马逊云服务器上获取文件。本文主要讨论在不变更网络环境的前提下安装 gulp-sass / node-sass 。

# 问题描述

执行 npm install 安装软件包 gulp-sass

```
$ npm install gulp-sass
```

这个过程中会先安装 node-sass ，因为 gulp-sass 依赖于 node-sass 。中间出现的错误信息类似下面这样：

```
Cannot download https://github.com/sass/node-sass/releases/download/v3.4.2/win32-x64-46_binding.nodeHint: If github.com is not accessible in your locationtry setting a proxy via HTTP_PROXY, e.g. export HTTP_PROXY=http://example.com:1234or configure npm proxy vianpm config set proxy http://example.com:8080'
```

# 处理思路

看现象很有可能是这些二进制文件使用了GitHub 的 lfs 服务，而 lfs 使用的是亚马逊云，由于网络原因，这些服务器无法访问。

现在解决问题的办法思路就很清晰了，下载源码自己编译一个这样的二进制文件，或下载官方的二进制文件。只要解决该文件的下载问题就可以继续往后安装。

打开 github 看一下该项目https://github.com/sass/node-sass，在releases 页面能找到下失败的文件 win32-x64-46\_binding.node，这里还可以下载到 source code，下载后里头有 C++ 项目 使用 visualstudio2015 自己编译一个就可以了。

同时，在https://github.com/sass 下，还发现一个名字叫node-sass-binaries 的项目，这里头其实也有刚才的那个二进制文件，并且这里的是可以直接下载的（貌似没使用 lfs）。

我不想自找麻烦，所以下面说一下直接使用该项目中的二进制文件进行安装 node-sass 过程。

# 操作

npm 是一个功能超级强悍的工具，安装一个软件包的方式也当然不仅仅是 npm install packagename 这一种方式，当然这是最快捷的使用公共软件包的安装方式。

首先到官网（https://github.com/sass/node-sass/releases）下载 node-sass 项目源码，下载后解压至相应的 node\_modules 目录中。

接下来，打开 package.json 文件，检查 script 字段

```
"scripts": {    "coverage": "node scripts/coverage.js",    "install": "node scripts/install.js",    "postinstall": "node scripts/build.js",    "pretest": "node_modules/.bin/jshint bin lib scripts test",    "test": "node_modules/.bin/mocha test"  },
```

打开 install 字段对应的文件scripts/install.js，可以看到checkAndDownloadBinary() 在下载这个二进制文件，URL使用的是process.sass.binaryUrl，我们可以直接在这里覆盖这个变量，把改地址修改为上面提到的那个能够下载的二进制文件地址。

```
download(process.sass.binaryUrl, process.sass.binaryPath, function(err) {    ....}
```

或者，找出上面提到的sass.binaryUrl() 方法，打开../lib/extensions.js 文件，大约108行左右，修改为如下样子即可

```
function getBinaryUrl() {  var site = flags['--sass-binary-site'] ||             process.env.SASS_BINARY_SITE  ||             process.env.npm_config_sass_binary_site ||             (pkg.nodeSassConfig && pkg.nodeSassConfig.binarySite) ||             'https://github.com/sass/node-sass/releases/download';    //return [site, 'v' + pkg.version, sass.binaryName].join('/');  return 'https://github.com/sass/node-sass-binaries/blob/master/win32-x64-46_binding.node';}
```

# 重新安装

进入node-sass 项目根目录执行 install 命令：

```
$ cd node_modules/node-sass$ npm install 
```

如果不出意外，这个安装过程很快就会结束。

node-sass 安装完成后，gulp-sass 的依赖问题也就解决了，然后跳出去 node\_modules 目录继续安装 gulp 。

```
$ cd ../..npm install gulp-sass
```

# 写在最后

关于本文如果您有任何建议或疑问请在下面留言交流。
