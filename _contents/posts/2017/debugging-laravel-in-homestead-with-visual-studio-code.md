---
title: 用 Visual Studio Code 调试运行在 homestead 环境中的 laravel 程序
author: 高国良
type: posts
series: false
date: 2017-02-05T21:58:00.791Z
tags: [laravel, php, vagrant, Nginx, debug, vscode]
description: 通过 visualstudio 实现对基于 homestead 环境的 laravel 项目进行开发调试。本文重点讨论如何通过配置 visualstudio code、 homestead、Xdebug 以实现对 laravel 项目的调试，并不讨论涉本文中涉及到的其他软件的安装及部署细节。
draft: false 
cover: false
---

![](634103-20170205214846386-672049439.jpg)

由于之前做 .net 开发比较熟悉 visualstudio，所以自 visualstudio code 发布后就一直在不同场合使用 vscode ，比如前端、node等等。最近在做 laravel 项目，需要通过 vscode 来调试 homestead 中的 laravel 代码。做了一些有关 laravel 调试环境安装部署的尝试，本文是一个简要记录。

## 基本环境

阅读本文之前，你应该安装好了基本的开发环境，比如 visualstudio code、VirtualBox 、vagrant、homestead、laravel 等等。原则上本文只讨论如何通过配置这些应用以实现对 laravel 项目的 debug ，不讨论安装相关软件的细节。

laravel 版本 5.3

homestead 版本 v1.0.1

php 版本 7.1（homestead已集成）

xdebug 版本 2.5（homestead已集成）

vscode 版本 1.9.0

vagrant 版本 1.9.1

VirtualBox版本 5.1.12

## 安装和配置 vscode 插件 PHP Debug

通过marketplace 平台安装插件 phpdebug。 1.9.0 版的 vscode 集成了插件管理功能在左侧的菜单栏，点击扩展按钮 > 输入 PHP Debug > 在搜索结果中找到 PHP debug > 点击安装，安装后重启 vscode 使其生效。

打开调试界面。点击右上角的齿轮按钮配置 launch.json 文件，选择 PHP 选项。此时会生成 launch.json 文件，左侧的 debug 类型默认选中了 listen for xdebug 选项。修改 launch.json 配置如下：

```
{
    "version": "0.2.0",
    "configurations": [        
        {
            "name": "Listen for XDebug",
            "type": "php",
            "request": "launch",
            "port": 9000,
            "stopOnEntry":false,
            "localSourceRoot": "${workspaceRoot}/public",
            "serverSourceRoot": "/home/vagrant/Code/Laravel/public",
            "log": false
        },
        {
            "name": "Launch currently open script",
            "type": "php",
            "request": "launch",
            "program": "${workspaceRoot}/public/index.php",
            "cwd": "${workspaceRoot}/public/",
            "port": 9000
        }
    ]
}
```

这里主要添加了 `localSourceRoot` 和 `serverSourceRoot` 两个配置项：

1. `localSourceRoot` 配置的是 laravel 项目程序入口位置，`${workspaceRoot}` 表示当前工程项目根目录，所以取值 `"${workspaceRoot}/public"` ；
2. `serverSourceRoot` 配置的是远程服务器端 laravel 站点根目录位置，该目录必须与 `localSourceRoot` 位置对应。根据 homestead 环境，这里取值 `"/home/vagrant/Code/Laravel/public"`；

## 启动Homestead

打开命令行终端，依次执行下列命令：

```
$ vagrant up 
$ vagrant ssh
```

## 安装 XDebug

```
注：homestead 已集成了 XDebug，文件位置在 /usr/lib/php/20160303/xdebug.so 目录中。如果你不需要更新版本的 Xdebug 功能，可以忽略此步骤。
```

建议你在 laravel 项目程序入口目录 public 下创建一个临时文件（如 test.php），输入 ***`phpinfo()`***。把 PHPinfo 的执行结果复制并粘贴到***[XDebug installation wizard](https://xdebug.org/wizard.php)，***程序会根据你的系统环境给出相应的安装向导。

1\. 下载 [xdebug-2.5.0.tgz](http://xdebug.org/files/xdebug-2.5.0.tgz)

2\. 解压文件**tar -xvzf xdebug-2.5.0.tgz**

3\. 执行 **cd xdebug-2.5.0**

4\. 执行 **./configure**

5\. 执行 **make**

6\. 执行 **cp modules/xdebug.so /usr/lib/php/20160303**

## 配置 XDebug

打开文件 **/etc/php/7.1/fpm/php.ini**， 添加如下配置：

```
zend_extension = /usr/lib/php/20160303/xdebug.so
[XDebug]
xdebug.remote_enable = 1
xdebug.remote_autostart = 1
xdebug.remote_host = 192.168.10.1
xdebug.remote_port = 9000
```

主要有五项配置：

**zend\_extension** 指定要加载的 xdebug 扩展文件；

**xdebug.remote\_enable** 启用远程调试；

**xdebug.remote\_autostart** 默认情况下需要通过指定 HTTP GET/POST 变量来启用远程调试，通过把该选项配置为 1 可以使所有请求自动连接至调试终端而无需指定专属变量信息。详情见：[Remote Debugging](https://xdebug.org/docs/remote)；

**xdebug.remote\_host** 默认取值 localhost ，由于我们的 homestead 在虚拟机中，并且以`config.vm.network "private_network"`形式配置了IP ，所以这里不能配置 localhost。需要手动指定 PC 机 IP 192.168.10.1；

**xdebug.remote\_port** 默认端口号是 9000，这个在前面的 vscode 配置文件 launch.json 中有设置，与其对应即可。

## 重启web服务 Nginx

```
$ nginx -s reload
```

## 启动 xdebug 调试

在 vscode 中进入 debug 界面，点击**开始调试** 按钮，PHPdebug 插件将在本机的 9000 端口监听来自 192.168.10.10 的网络请求；

在项目文件 public/index.php 文件中打个断点，然后通过浏览器访问 http://homestead.app ；

一旦 homestead 中有网络请求到 laravel 站点 ，vscode 编辑器即可接收到debug信息并在断点位置暂停下来，同时打印出相关的执行环境上下文信息。

## 最后

本文地址：http://www.cnblogs.com/kelsen/p/6368550.html