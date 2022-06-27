---
title: VisualStudio2013 如何打开之前版本开发的（.vdproj ）安装项目
author: 高国良
type: posts
series: false
date: 2014-11-22T18:55:00.791Z
tags: [visualstudio]
description: 当你的项目使用早于 visualstudio2013 的版本开发并且使用 Visual Studio Installer 制作安装项目时，在升级至 VS2013 后会发现新安装项目无法打开， VS2013 已经不再对 VDProj 提供支持，这里有几个解决方案。
draft: false 
cover: false
---

当你的项目使用早于 visualstudio2013 的版本开发并且使用 Visual Studio Installer 制作安装项目时，在升级至 VS2013 后会发现新安装项目无法打开， VS2013 已经不再对VDProj 的支持。

## 三选一

这里有三个解决方案，随便哪个都可以解决该问题

1. 安装一个Microsoft Visual Studio Installer Projects 扩展工具（[安装](https://visualstudiogallery.msdn.microsoft.com/9abe329c-9bba-44a1-be59-0fbf6151054d)完成后，可直接打开并使用之前的 vdproj 项目）
2. VDProj to WiX Converter （[点击下载](https://visualstudiogallery.msdn.microsoft.com/0f8ff662-c844-4c3c-9c7b-b170cea16baf)）
3. 启用 InstallShield Limited Edition 重新制作安装包


## 扩展工具

Microsoft Visual Studio Installer Projects 概述

UPDATE: We have released the RTM version of this extension - v1.0.0.0. This release addresses:

* Warnings when building with Microsoft.bcl.async
* Error 2727 occuring with more than 1 content file
* Some cases of the `0x8000000A` when using the command line

Unfortunately we couldn't address all cases of the command line issue for this release as we're still investigating the appropriate way to address them. What we do have is a workaround that we believe will work for almost all of them. If you are still suffering this issue then you can try to change the DWORD value for `HKEY_CURRENT_USER\Software\Microsoft\VisualStudio\12.0_Config\MSBuild\EnableOutOfProcBuild` registry value to 0. If this doesn't exist you can create it as a DWORD.

UPDATE: The 0.9.1.0 version addresses a number issues reported by customers including

* Error 1001 - InstallUtilLib.dll, custom installer actions failure
* Cases of an unclosable modal dialog appearing
* Builds causing the VS Repair dialog to appear

Please try this extension update and let us know if it doesn't address the above.

**ORIGINAL:**

This extension provides the same functionality that currently exists in Visual Studio 2010 for Visual Studio Installer projects. To use this extension you can either open the Extensions and Updates dialog, select the online node and search for `Visual Studio Installer Projects Extension` or you can download directly from this page.

Once you have finished installing the extension and restarted Visual Studio you will be able to open existing Visual Studio Installer Projects or create new ones.

For those of you looking for an improved deployment experience in Visual Studio we are continuing our partnership with Flexera to provide InstallShield Limited Edition (ISLE) as our in-box solution. ISLE is a great solution for those customers looking for added capabilities not found in Visual Studio Installer Projects, such as TFS and MSBuild integration, support for creating new web sites and ISO 19770-2 Tagging support, etc.

Please note that this release is a Preview version so please try this out with your existing Visual Studio Installer projects and provide general feedback via UserVoice and bugs via the Q&A section here. We will be releasing a fully supported RTM version of this extension after we have addressed your Preview version feedback.

## VDProj to WiX Converter

从 Visual Studio 2005 开始，vdproj 作为最基本的部署解决方案一直伴随我们至今。不过微软宣布 vdproj 废弃，在 VS 2012 之后版本将不会支持。如果你试图打开一个 vdproj 设置打开解决方案，将会得到一个 `找不到此项目类型所基于的应用程序。` 的错误提示。

- 相关文章：http://www.add-in-express.com/vdproj-wix-converter/
- 下载地址：https://visualstudiogallery.msdn.microsoft.com/0f8ff662-c844-4c3c-9c7b-b170cea16baf
