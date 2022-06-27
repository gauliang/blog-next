---
title: JavaScript高级编程 (2) - HTML 与 JavaScript
author: 高国良
type: posts
series: false
date: 2014-06-05T23:06:00.791Z
tags: [javascript, html]
description: 向HTML 页面中插入JavaScript 的主要方法，就是使用元素。这个元素由Netscape 创造并在Netscape Navigator 2 中首先实现。后来，这个元素被加入到正式的HTML 规范中。
draft: false 
cover: false
---

向 HTML 页面中插入 JavaScript 的主要方法，就是使用 `<script>` 元素。这个元素由 Netscape 创造并在 Netscape Navigator 2 中首先实现。后来，这个元素被加入到正式的 HTML 规范中。HTML 4.01 为 `<script>` 定义了下列6 个属性。

## 六个属性

- `async`：可选。表示应该立即下载脚本，但不应妨碍页面中的其他操作，比如下载其他资源或等待加载其他脚本。只对外部脚本文件有效。
- `charset`：可选。表示通过 `src` 属性指定的代码的字符集。由于大多数浏览器会忽略它的值，因此这个属性很少有人用。
- `defer`：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。IE7 及更早版本对嵌入脚本也支持这个属性。
- `language`：已废弃。原来用于表示编写代码使用的脚本语言（如 `JavaScript`、`JavaScript1.2`或`VBScript`）。大多数浏览器会忽略这个属性，因此也没有必要再用了。
- `src`：可选。表示包含要执行代码的外部文件。
- `type`：可选。可以看成是 `language` 的替代属性；表示编写代码使用的脚本语言的内容类型（也称为 `MIME` 类型）。虽然 `text/javascript` 和 `text/ecmascript` 都已经不被推荐使用，但人们一直以来使用的都还是 `text/javascript`。实际上，服务器在传送 `JavaScript` 文件时使用的 MIME 类型通常是 `application/x-javascript`，但在 type 中设置这个值却可能导致脚本被忽略。

> 按照惯例，外部 JavaScript 文件带有 `.js` 扩展名。但这个扩展名不是必需的，因为浏览器不会检查包含 JavaScript 的文件的扩展名。这样一来，使用 JSP、PHP 或其他服务器端语言动态生成 JavaScript 代码也就成为了可能。但是，服务器通常还是需要看扩展名决定为响应应用哪种 MIME 类型。如果不使用 `.js` 扩展名，请确保服务器能返回正确的 MIME 类型。

## 嵌入代码与外部文件

在 HTML 中嵌入 JavaScript 代码虽然没有问题，但一般认为最好的做法还是尽可能使用外部文件来包含 JavaScript 代码。不过，并不存在必须使用外部文件的硬性规定，但支持使用外部文件的人多会强调如下优点。

- **可维护性**：遍及不同HTML 页面的JavaScript 会造成维护问题。但把所有JavaScript 文件都放在一个文件夹中，维护起来就轻松多了。而且开发人员因此也能够在不触及HTML 标记的情况下，集中精力编辑JavaScript 代码。
- **可缓存**：浏览器能够根据具体的设置缓存链接的所有外部JavaScript 文件。也就是说，如果有两个页面都使用同一个文件，那么这个文件只需下载一次。因此，最终结果就是能够加快页面加载的速度。
- **适应未来**：通过外部文件来包含JavaScript 无须使用前面提到XHTML 或注释hack。HTML 和XHTML 包含外部文件的语法是相同的。

## 文档模式

IE5.5 引入了文档模式的概念，而这个概念是通过使用文档类型（doctype）切换实现的。最初的两种文档模式是：混杂模式（quirks mode）①和标准模式（standards mode）。混杂模式会让 IE 的行为与（包含非标准特性的）IE5 相同，而标准模式则让 IE 的行为更接近标准行为。虽然这两种模式主要影响 CSS 内容的呈现，但在某些情况下也会影响到 JavaScript 的解释执行。本书将在必要时再讨论这些因文档模式而影响 JavaScript 执行的情况。

在 IE 引入文档模式的概念后，其他浏览器也纷纷效仿。在此之后，IE 又提出一种所谓的准标准模式（almost standards mode）。这种模式下的浏览器特性有很多都是符合标准的，但也不尽然。不标准的地方主要体现在处理图片间隙的时候（在表格中使用图片时问题最明显）。

如果在文档开始处没有发现文档类型声明，则所有浏览器都会默认开启混杂模式。但采用混杂模式不是什么值得推荐的做法，因为不同浏览器在这种模式下的行为差异非常大，如果不使用某些 hack 技术，跨浏览器的行为根本就没有一致性可言。

对于标准模式，可以通过使用下面任何一种文档类型来开启：

```html
<!-- HTML 4.01 严格型 -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN""http://www.w3.org/TR/html4/strict.dtd">

<!-- XHTML 1.0 严格型 -->
<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Strict//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<!-- HTML 5 -->
<!DOCTYPE html>
```

而对于准标准模式，则可以通过使用过渡型（transitional）或框架集型（frameset）文档类型来触发，如下所示：

```html
<!-- HTML 4.01 过渡型 -->
<!DOCTYPE HTML PUBLIC"-//W3C//DTD HTML 4.01 Transitional//EN""http://www.w3.org/TR/html4/loose.dtd">

<!-- HTML 4.01 框架集型 -->
<!DOCTYPE HTML PUBLIC"-//W3C//DTD HTML 4.01 Frameset//EN""http://www.w3.org/TR/html4/frameset.dtd">

<!-- XHTML 1.0 过渡型 -->
<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Transitional//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<!-- XHTML 1.0 框架集型 -->
<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Frameset//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

## Noscript 元素

早期浏览器都面临一个特殊的问题，即当浏览器不支持 JavaScript 时如何让页面平稳地退化。对这个问题的最终解决方案就是创造一个 `<noscript>` 元素，用以在不支持JavaScript 的浏览器中显示替代的内容。这个元素可以包含能够出现在文档 `<body>` 中的任何 HTML 元素 —— `<script>` 元素除外。

包含在 `<noscript>` 元素中的内容只有在下列情况下才会显示出来：

1. 浏览器不支持脚本
2. 浏览器支持脚本，但脚本被禁用

符合上述任何一个条件，浏览器都会显示 `<noscript>` 中的内容。而在除此之外的其他情况下，浏览器不会呈现 `<noscript>` 中的内容。
