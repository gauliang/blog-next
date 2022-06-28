---
title: Ubuntu 常用配置指南
author: 高国良
type: posts
series: false
date: 2019-09-06T12:04:00.791Z
tags: [linux,ubuntu]
description: 配置指南
draft: false 
cover: false
---

![](cover.jpg)

## 一、基本系统设置

```bash

# 1. 移除桌面图标显示
sudo apt remove gnome-shell-extension-desktop-icons

# 2. 移除桌面边栏菜单
sudo apt remove gnome-shell-extension-ubuntu-dock
```

当前系统链接多个显示器，在桌面空间切换时，默认仅切换主显示器，如需同步切换，可通过安装 *gnome-tweaks* 软件
，在 Workspaces 菜单下 Display Handling 项选择 *Workspaces span displays* 即可。

```bash
sudo apt install gnome-tweaks
gnome-tweaks
```

安装 GNOME Shell Extension **Hide Top Bar** 可配置自动隐藏桌面顶部状态栏。

## 二、开发环境配置

### 1. 安装 Nodejs

参考 <https://github.com/nodejs/help/wiki/Installation> 下载二进制文件完成安装。
