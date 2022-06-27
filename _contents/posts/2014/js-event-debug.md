---
title: JS 事件调试 - 查找 HTML 元素绑定的事件以及绑定代码所在位置
author: 高国良
type: posts
series: false
date: 2014-06-26T11:03:00.791Z
tags: [javascript, event, debug]
description: 日常的网页开发调试工作中，经常需要知道指定的某个网页元素绑定了哪些事件以及绑定代码的位置，下面介绍三种用来跟踪页面中的事件的方法。
draft: false 
cover: false
---

日常的网页开发调试工作中，经常需要知道指定的某个网页元素绑定了哪些事件以及绑定代码的位置，下面介绍三种用来跟踪页面中的事件的方法。

## 使用firefox调试

我们可以使用 Firefox 的 debug 工具，找到指定元素，然后查看事件面板

![](261028556272514.png)

## 使用 chrome 调试

在要检查的元素上单击右键选择查看元素，然后，右边的面板中切换到 EventListenrs 标签，可以看到相关的事件绑定信息。点击最右边的文件名称还可以跳转到事件定义代码在脚本文件中的位置。不过这种方法并非总是可用，下面会提到。

![](261028417211132.png)

## Visual Event

上面的两种方法，当我们定位定义事件的代码位置时，如果我们使用了JS库（比如jquery）的话调试工作又会变得复杂，程序往往会把我们引导到 jquery 库中，这样的话仍然是不方便找到在哪个文件的那个行中 addEventListener 了事件。这个时候就需要 Visual Event 闪亮登场了...

安装完 Visual Event后，工具条上会有 Visual Event 的图标。然后打开我们要调试的页面，在工具栏上点击他那个火眼金睛一样的眼睛图标，网页上所有绑定了事件的 HTML 元素都会由一个半透明的蓝色遮罩层覆盖，鼠标移动到相应的元素上即可看到事件绑定信息。

![](261052055023562.jpg)

刚才说了，在使用了 Js 库的时候，visual event 依然很好用，下面列出它支持的几个库的名字及版本信息：

* DOM 0 events
* jQuery 1.2.x +
* YUI 2.6.x (2.x might work!)
* MooTools 1.2.x
* Prototype 1.6.x
* JAK (Events 2.2)
* Glow

## 获取 Visual Event

VisualEvent 在GitHub上的位置 ：https://github.com/DataTables/VisualEvent

VisualEvent 在Chrome webstore上的位置：https://chrome.google.com/webstore/detail/visual-event/pbmmieigblcbldgdokdjpioljjninaim

## 参考资料

- http://www.softwareishard.com/blog/firebug/eventbug-alpha-released/
- http://www.sprymedia.co.uk/article/Visual+Event
