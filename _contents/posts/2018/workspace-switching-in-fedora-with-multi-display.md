---
title: Fedora  中多显示器环境下的工作区切换
author: 高国良
type: posts
series: false
date: 2018-08-04T11:10:00.791Z
tags: [linux, gnome]
description: 默认情况下，fedora中 Gnome 桌面环境在切换工作去的时候，只会在 Primary display 上切换， 其他显示器保持不变。如果要实现多显示器同时切换，需对 GNOME 进行相关配置。
draft: false 
cover: false
---

[Dual monitor workspaces]

默认情况下，fedora中 Gnome 桌面环境在切换工作去的时候，只会在 Primary display 上切换， 其他显示器保持不变。如果要实现多显示器同时切换，需对 GNOME 进行相关配置。下面两种方法而选一即可。

## CLI

通过命令行操作，只需打开 terminal 执行下面命令即可：

```bash
$ gsettings set org.gnome.shell.overrides workspaces-only-on-primary false
```

## GUI

如果不习惯使用命令行，可在安装 Gnome-tweaks-tool 后通过可视化界面操作。打开 `Software Center ` 搜索到 `Tweaks`，并完成安装。

启动 `Gnome-tweaks` 切换到 Worksaces 进行如下设置：

1. Dynamic Worksaces 选中
2. Display Handling > Worksaces span displays 选中

## 系统环境

```
OS：Fedora 28
OS type：64-bit
GNOME：Version 3.28.2
```
