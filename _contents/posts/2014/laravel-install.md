---
title: Laravel - 安装与配置
author: 高国良
type: posts
series: false
date: 2014-06-23T12:07:00.791Z
tags: [php, laravel]
description: 有多重途径可以安装 Laravel，下面是通过 Composer 安装 Laravel 的方法。Composer 是 PHP 的一个依赖管理工具。它允许你申明项目所依赖的代码库，它会在你的项目中为你安装他们。
draft: false 
cover: false
---

有多重途径可以安装 Laravel，下面是通过 Composer 安装 Laravel 的方法。Composer 是 PHP 的一个依赖管理工具。它允许你申明项目所依赖的代码库，它会在你的项目中为你安装他们。Composer 下载及相关使用说明见：https://getcomposer.org/

Composer Windows 安装包 https://getcomposer.org/Composer-Setup.exe，下载后只需根据安装向导提示，点击下一步就好。
安装过程很简单，安装包会自动设置环境变量，你可以在任意目录下使用 composer 命令。

> The installer will download composer for you and set up your PATH environment variable so you can simply call`composer`from any directory.

安装完 Composer 就可以开始安装 Laravel 了，Laravel 要求系统 PHP 版本要在 5.3.7 以上，且开启 MCrypt PHP 扩展。

## create-project 安装

打开 CMD，CD 到要安装 Laravel 的目录，然后运行下面的命令。安装过程可能需要五六分钟，这个由你的网速来决定。

```bash
composer create-project laravel/laravel --prefer-dist
```

## Laravel 包安装

这个需要事先从 Github 下载 laravel 包，这个包里有一个 composer.json 文件，打开 CMD，CD 到 laravel 的解压目录，运行下面的命令，Composer 即可检测并下载相关依赖项。安装完成，会在文件夹里看到一个 `vendor` 目录，该目录包含了全部的 Laravel 需要的依赖项。

```bash
php composer.phar install
```

如果网速比较慢的话，安装时间会比较长，我们可以备份这个目录，这样下次安装的时候直接复制这个文件夹过来就好，毕竟这里面的依赖项也不是更新的很频繁。

## 权限设置

需要为 `app/storage` 目录下的文件设置写权限。一些框架目录路径是可以设置的。如果需要改变这些目录的位置，可以查看 `bootstrap/paths.php` 文件中的设置。
