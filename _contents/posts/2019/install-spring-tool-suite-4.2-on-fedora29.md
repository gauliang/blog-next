---
title: Fedora29 安装 spring tool suite 4.2
author: 高国良
type: posts
series: false
date: 2019-04-04T21:27:00.791Z
tags: [spring,java]
description: 下载安装包 下载地址：https__ERR__//spring.io/tools 文件：STS 4.2.0.RELEASE.tar.gz 解压部署软件包 解压文件至 目录。 添加启动图标 创建文件 ，输入下面内容：
draft: false 
cover: false
---

## 下载安装包

下载地址：https://spring.io/tools
文件：STS-4.2.0.RELEASE.tar.gz

## 解压部署软件包

解压文件至 `/opt/STS-4.2.0.RELEASE/` 目录。

## 添加启动图标

创建文件 `/usr/share/applications/spring-toolsuite-4.desktop` ，输入下面内容：

```
[Desktop Entry]
Name=Spring Tool Suite 4
Type=Application
Comment=Spring Tool Suite 4
Exec=/opt/STS-4.2.0.RELEASE/SpringToolSuite4
Icon=/opt/STS-4.2.0.RELEASE/icon.xpm
StartupNotify=false
Categories=Development;IDE;Java;
Keywords=STS;
StartupWMClass=SpringToolSuite4
```
