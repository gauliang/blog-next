---
title: Post-installation steps for Chromium | Fedora
author: 高国良
type: posts
series: false
date: 2018-08-04T15:56:00.791Z
tags: [chromium, linux, chrome]
description: Flash 插件安装 网址： https__ERR__//fedora.pkgs.org/ 下载： chromium pepper flash version.fc28.x86_64.rpm 安装后重启浏览器 解码 H264 视频 CHROMIUM 已移除对 的支持，如果要在浏览器中播放 mp4 格式视频，可通
draft: false 
cover: false
---

## Flash 插件安装

- 网址： https://fedora.pkgs.org/
- 下载： chromium-pepper-flash-version.fc28.x86_64.rpm
- 安装后重启浏览器

## 解码 H264 视频

CHROMIUM 已移除对 ` H.264 video codec` 的支持，如果要在浏览器中播放 mp4 格式视频，可通过自行安装相关软件包实现。

**Search**

```bash
$ sudo dnf search chromium
```

```
Last metadata expiration check: 0:54:46 ago on Sat 04 Aug 2018 02:46:58 PM CST.
======================== Name Exactly Matched: chromium ========================
chromium.x86_64 : A WebKit (Blink) powered web browser
======================= Summary & Name Matched: chromium =======================
chromium-headless.x86_64 : A minimal headless shell built from Chromium
lightspark-chromium-plugin.i686 : Chromium compatible plugin for lightspark
lightspark-chromium-plugin.x86_64 : Chromium compatible plugin for lightspark
chromium-libs-media.x86_64 : Shared libraries used by the chromium media
                           : subsystem
chromium-common.x86_64 : Files needed for both the headless_shell and full
                       : Chromium
chromium-libs.x86_64 : Shared libraries used by chromium (and
                     : chrome-remote-desktop)
chromium-libs-media-freeworld.i686 : Chromium media libraries built with all
                                   : possible codecs
chromium-libs-media-freeworld.x86_64 : Chromium media libraries built with all
                                     : possible codecs
============================ Name Matched: chromium ============================
chromium-bsu.x86_64 : Fast paced, arcade-style, top-scrolling space shooter
========================== Summary Matched: chromium ===========================
chromedriver.x86_64 : WebDriver for Google Chrome/Chromium
vboot-utils.x86_64 : Verified Boot Utility from Chromium OS
chrome-remote-desktop.x86_64 : Remote desktop support for google-chrome &
                             : chromium
fedora-user-agent-chrome.noarch : User-Agent Fedora branding for Google
                                : Chrome/Chromium browser
```

**Install** 

找出与当前安装 chromium 版本匹配的软件包 安装

```
sudo dnf install chromium-libs-media-freeworld-67.0.3396.79-1.fc28.x86_64
```
