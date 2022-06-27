---
title: Android 开发环境在 Windows7 下的部署安装
author: 高国良
type: posts
series: false
date: 2014-08-05T16:34:00.791Z
tags: [Android]
description: Android SDK 为 Android 应用的开发、测试和调试提了必要的API库和开发工具。如果你是一个 Android 开发新手，推荐你下载使用 ADT Bundle 以快速开始 Android 的开发，它提供了必要的 Android sdk 组件和一个内置 ADT 的 Eclipse 版本。
draft: false 
cover: false
---

## Android SDK

Android SDK 为 Android 应用的开发、测试和调试提了必要的API库和开发工具。

## ADT Bundle 下载

如果你是一个android 开发新手，推荐你下载使用 ADT Bundle 以快速开始android 的开发，它提供了必要的 android sdk 组件和一个内置 ADT 的 Eclipse 版本。

http://developer.android.com/sdk/index.html#win-bundle

> With a single download, the Eclipse ADT bundle includes everything you need to begin developing apps:
>
> * Eclipse + ADT plugin
> * Android SDK Tools
> * Android Platform-tools
> * A version of the Android platform
> * A version of the Android system image for the emulator

如果你已经安装了一个你更喜欢的另外版本的 Eclipse ，还可以只下载 android sdk tools 安装即可。下载地址为：http://dl.google.com/android/installer\_r23.0.2-windows.exe

## 操作系统及运行环境

Windows XP (32-bit), Vista (32- or 64-bit), or Windows 7 (32- or 64-bit)

需要系统安装JDK6以上版本（仅安装JRE是不够的）

Apache Ant 1.8 or later

## 下载安装JDK

http://www.oracle.com/technetwork/java/javase/downloads/index.html

选择适合你操作系统的版本下载即可，这里没什么可说的。

## 部署安装 ADT Bundle

完成 java jdk 的安装

解压 ADT Bundle 至你需要的位置。比如 `Program Files\ADT Bundle`.

打开 Eclipse，在工具栏找到 SDK Manager 单机打开，如果没有使用 Eclipse 可以到通过 SDK Manager.exe 管理 SDK 包。打开 SDK Manager 后剩下的就是选择一些你需要的包进行下载安装。这个过程可能会因网速限制变得缓慢。

由于 https 的链接有时会不稳定，如果无法下载更新包可以尝试下列方法。

第一步：修改系统host文件 `C:\Windows\System32\drivers\etc\hosts`

```bash
# 更新的内容从以下地址下载
203.208.46.146       dl.google.com
203.208.46.146       dl-ssl.google.com
```

第二步：点击 SDK Manager 工具条上的工具选项（tools），打开选项（option）菜单，勾选下图中红色背景的选项。然后关闭 SDK Manager 重新打开即可。

![](051740546623581.jpg)

**下面列出了，必须要安装的一些 包选项**

![](051631381621947.jpg)
