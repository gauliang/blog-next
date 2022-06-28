---
title: 让 windows 下的命令行程序 cmd.exe 用起来更顺手
author: 高国良
type: posts
series: false
date: 2014-12-05T15:25:00.791Z
tags: [php, Composer, laravel, cmd.exe]
description: 在 Windows 下使用 Larave 框架做开发，从 Composer 到 artisan 总是避免不了和 cmd.exe 打交道，系统默认的命令行界面却是不怎么好看，且每行显示的字符数是做了限制。伟大的 cmd.exe ，就是这么任性！
draft: false 
cover: false
---

在 Windows 下使用 Larave 框架做开发，从 Composer 到 artisan 总是避免不了和 cmd.exe 打交道，系统默认的命令行界面却是不怎么好看，且每行显示的字符数是做了限制。伟大的 cmd.exe ，就是这么任性！

一些情况下，我们需要让每行显示更多的字符，从而避免频繁的换行导致界面出现出现一堆乱糟糟的字符串。当然，你或许也已经看烦了黑底白字的 cmd.exe 界面。

那么，如何改善这种现状呢？其实很简单， cmd.exe 具备一些基本的设置功能，只是不常用而已。

## 配置

1. 在 cmd.exe 窗口标题栏点击鼠标右键，选择&ldquo;默认值&rdquo;，打开 \*\*控制台窗口属性\*\* 设置界面。
2. 选项标签，命令行记录可以适当增大，根据需要设置就好。建议勾选 \*\*自动完成\*\* 选项,这样就可以 Tab 键补全命令了。点击确定保存。
3. 在 cmd.exe 窗口标题栏点击鼠标右键，选择&ldquo;属性&rdquo;，打开 \*\*属性\*\* 设置界面。
4. 进入字体标签，这个建议采用默认设置。当然，已经预置几种方案，你可以根据需求选择。
5. 布局标签，屏幕缓冲区大小-宽度设置，这里决定了每行可以显示多少字符。我设置150
6. 窗口大小-宽度设置，这里设置和方面的宽度一样，不然要出现横向滚动条的。这里同样设置150
7. 颜色标签：这里我测试了几个颜色，个人感觉还不错，后面推荐给大家。
8. 设置完成后，按下\*\*确定\*\*，重启 cmd.exe 即可看到其新面孔了。

## 关于起始位置

启动 cmd.exe 后，你会发现起始位置在 C:\\Users\\Username 中，每次都需要 cd 到你的 laravel 项目位置，这个步骤能不能简化呢？当然可以：

1. 打开 cmd.exe
2. 在任务栏找到其图标点击右键， 单击&ldquo;**将此程序锁定到任务栏**&rdquo;。
3. 在任务栏找到其图标点击右键， 在菜单中右键点击 **命令提示符** 选项，单击&ldquo;**属性**&rdquo;选项打开 &ldquo;**命令提示符 属性**&rdquo; 窗口
4. 选择起始位置标签，修改起始位置，如：D:\\wwwroot\\laravel
5. 按下**&ldquo;确定&rdquo;**按钮保存

##推荐颜色配置

```
屏幕文字：R(230)G(219)B(116)屏幕背景：R(39)G(40)B(34)
```

![](051525377803980.jpg)