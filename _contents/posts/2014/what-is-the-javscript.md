---
title: JavaScript高级编程 (1) - javscript是什么
author: 高国良
type: posts
series: false
date: 2014-05-19T17:28:00.791Z
tags: [javascript]
description: 《重温javascript》这是一些列 javascript 的学习笔记，部分内容摘自书本或者网络，我这里只是基于自己的理解进行了梳理整理。
draft: false 
cover: false
---

《重温javascript》这是一系列 javascript 的学习笔记，部分内容摘自书本或者网络，我这里只是基于自己的理解进行了梳理整理。

一个完整的 javscript 实现是由以下3部分组成的 ：

* 核心 ECMAScript
* 文档对象模型 DOM
* 浏览器对象模型 BOM

## ECMAScript

- ECMAScript 并不与任何具体浏览器绑定，实际上，它没有提到用于任何用户输入输出的方法。
- ECMAScript 可以为不同种类的宿主环境提供核心的脚本编程能力，因此核心的脚本语言是与任何特定的宿主环境分开进行规定的
- WEB 浏览器对于 ECMAScript 来说是一个宿主环境，但它并不是唯一的宿主环境。事实上，还有不计其数的其他各种环境可以容纳 ECMAScript 的实现。
- ECMAScript 描述了如下内容：语法、类型、语句、关键字、保留字、运算符、对象；
- ECMAScript 仅仅是一个描述，定义了脚本语言的所有属性、方法和对象。其他的语言可以实现 ECMAScript 来作为功能的基准，javascript 就是这样。
- 何为 EMCAScript 复合型（conformance）有明确的定义。一个脚本语言必须满足以下四项基本原则：符合的实现必须按照 ECMA-262 中所描述的支持所有的**类型、值、对象、属性、函数和程序语法及语义**。

## DOM

DOM (文档对象模型)是 HTML 和 XML 的应用程序接口（API）。DOM 将把整个页面规划成由节点层级构成的文档。HTML 或 XML 页面的每个部分都是一个节点的衍生物。

DOM 通过创建树来表示文档，从而使开发者对文档的内容和机构具有空前的控制力。用 DOM API 可以轻松的删除、添加和替换节点。

DOM Level 1 是 W3C 于 1089 年 10 月提出的。他有两个模块构成，即 DOM Core 和 DOM HTML 。前者提供了基于 XML 的文档的结构图，以便方便访问和操作文档的任一部分；后者添加了一些 HTML 专用的对象和方法，从而扩展了 DOM Core 。

DOM Level 2 对原始 DOM 的扩展添加了对鼠标和用户界面事件（DHTML 对此有丰富的支持）、范围、遍历（重复执行 DOM 文档的方法）的支持，并通过对象接口添加了对 CSS (层叠样式)的支持。由 DOM Level 1 引入的原始 DOM Core 也加入了对 XML 命名空间的支持。

DOM Level 2 引入几种 DOM 新模块，用于处理新的接口类型：

1. DOM 视图 —— 描述跟踪该文档的各种视图（即 CSS 样式化之前和 CSS 样式化之后的文档）的接口；
2. DOM 事件 —— 描述事件的接口；
3. DOM 样式 —— 描述处理基于 CSS 样式的接口；
4. DOM 遍历和范围 —— 描述遍历和操作文档书的接口。

DOM Level 3 引入了统一的方式载入和保存文档的方法（包含在新模块 DOM Load and Save 中）以及验证文档（DOM Validation）的方法，从而进一步扩展了 DOM 。在 DOM Level 3 中，DOM Core 被扩展为支持所有的 XML 1.0 特性，包括 XML Infoset 、XPath 和 XML Base。

## 其他DOM

除了 DOM CORE 和 DOM HTML 外，还有其他语言发布了自己的 DOM 标准。这些语言都是基于 XML 的，每种 DOM 都给对应语言添加了特有的方法和接口：

1. 可缩放矢量图形（SVG）1.0
2. 数学标记语言 （MathML）1.0
3. 同步多媒体集成语言（SMIL）

此外，其他语言也开发了自己的 DOM 实现，如 Mozilla 的 XML 用户界面语言。不过，只有上面列出的几种语言是 W3C 的推荐标准。

DOM 在浏览器开始实现之前就已经是一种标准了。IE 首次尝试支持 DOM 是在 5.0 版本中，不过其实直到 5.5 版本才具有真正的 DOM 支持，IE5.5 实现了 DOM Level 1 。从那时起，IE就没有再引入新的 DOM 功能。

NetScape 知道 NetScape6（Mozilla 0.6.0）才引入 DOM 支持。目前 ，MOZILLA 具有最好的 DOM 支持，实现了完整的 DOM Level 1 、几乎所有的 DOM Level 2 以及一部分DOM Level 13。

就对DOM的支持而论，所有浏览器都远远落后于 mozilla。

## BOM

IE3.0 和 Netscape Navigator 3.0 提供了一种新特性 &mdash;&mdash; BOM (浏览器对象模型)，可以对浏览器窗口进行访问和操作。使用 BOM，开发者可以移动窗口、改变状态栏的文本以及执行其他与页面内容不直接相关的动作。使 BOM 独树一帜且又常常令人怀疑的地方在于，它只是 javascript 实现的一部分，没有任何相关的标准。

BOM 主要处理浏览器窗口和框架，不过通常浏览器特定的 javascript 扩展都被看做 BOM 的一部分。这些包括：

1. 弹出新的浏览器窗口
2. 移动、关闭浏览器窗口以及调整窗口大小
3. 提供WEB 浏览器详细信息的导航对象
4. 提供装载到浏览器中页面的详细信息的丁文对象
5. 提供用户屏幕分辨率详细信息的屏幕对象
6. 对 COOKIE 的支持
7. IE 扩展了BOM ,加入了activexobject类，可以通过javascript实例化activex对象。

由于没有相关的BOM标准，每种浏览器哦独有自己的BOM实现。有一些事实上的标准，如具有一个窗口对象和一个导航对象，不过每种浏览器可以为这些对象或其他对象定义自己的属性和方法。