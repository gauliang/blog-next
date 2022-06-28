---
title: npm 私有模块的管理使用
author: 高国良
type: posts
series: false
date: 2015-11-14T16:20:00.791Z
tags: [npm]
description: 你可以使用 NPM 命令行工具来管理你在 NPM 仓库的私有模块代码，这使得在项目中使用公共模块变的更加方便。 开始前的工作 你需要一个 2.7.0 以上版本的 npm ，并且需要有一个可以登陆 npm 仓库的账号。
draft: false
cover: false
---

你可以使用 NPM 命令行工具来管理你在 NPM 仓库的私有模块代码，这使得在项目中使用公共模块变的更加方便。

## 开始前的工作

你需要一个 2.7.0 以上版本的 npm ，并且需要有一个可以登陆 npm 仓库的账号。

```bash
npm install -g npmnpm login
```

## 软件包设置

所有的私有模块都是 scoped package 的。

scope 是 npm 的新特性。如果一个模块的名字以 "@" 开始，那么他就是一个 scoped package。scope 就是"@"与"/"之间的部分。

```bash
@scope/project-name
```

当你注册私有模块到一个用户下时，你的 scope 就是当前用户的用户名。

```bash
@username/project-name
```

如果要使用 npm init 初始化一个软件包，你可以通过自定义 --scope 选项设置你的 scope

```bash
npm init --scope=<your_scope>
```

如果你在大多数时候使用的 scope 都是相同的，可以设置一个默认的 scope ，这样在我们初始化的时候会自动使用该 scope。

```bash
npm config set scope <your_scope>
```

## 发布模块

发布一个模块的操作是非常简单的

```bash
npm publish
```

默认情况下，scoped package 会发布为私有模块，发布为私有模块是需要付费的，费用是每个月 \$7 。更详细的信息可参考[NPM (node package manager) 入门 - 基础使用](http://www.cnblogs.com/kelsen/p/4947859.html)

一旦完成发布，你将会在 npm 库站点上看到你的 scoped package，有 private 标志，说明是非公共的模块，他人无法使用。

## 授权其他成员访问

如果你要授权给其他人使用你的模块，你可以在 package 的权限设置页面设置哪些用户可以拥有 只读或读写权限。也可以通过命令行进行相关设置

```bash
npm owner add <user> <package name>
```

**安装私有模块**

如果要安装私有模块，你必须要有权限访问到要安装的私有模块。安装的时候可以使用 scope package name

```bash
npm install @scope/project-name
```

当你在项目中使用这些代码模块时可以如下使用

```bash
var project = require('@scope/project-name')
```

## 设置私有模块为共有的

所有的 scoped packages 默认都是私有状态的，这确保了无关人员不能访问到该模块。也可以修改改模块为 public 状态。

![](make-private-ui.gif)

也可以使用命令行进行操作

```bash
npm access restricted <package_name>
```

这个操作可能需要几分钟才能生效，网站会将该模块从私有列表中删除。

## 写在后面

关于本译文如有任何疑问请在下面留言交流。

本文译自 npm 官方文档https://docs.npmjs.com/private-modules/intro
