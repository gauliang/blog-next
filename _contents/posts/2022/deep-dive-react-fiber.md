---
title: 深入了解 React Fiber 
author: GauLiang
type: posts
series: false
date: 2022-07-03T10:53:37.480Z
tags: []
description: description
draft: true
cover: false
---

英文原文：https://blog.logrocket.com/deep-dive-react-fiber/

> 编者注： 这篇文章于 2022 年 3 月 14 日更新，删除了所有过时的信息并添加了什么是 React Fiber？部分。

有没有想过当你调用 `ReactDOM.render(<App />, document.getElementById('root'))` 时会发生什么？

我们知道 ReactDOM 在底层构建 DOM 树并将应用程序呈现在屏幕上。
但是 React 是如何构建 DOM 树的呢？当应用程序的状态发生变化时，它如何更新树？

在这篇文章中，我们将了解 React Fiber 是什么，
以及 React 如何在 React v15.0.0 之前构建 DOM 树，该模型的缺陷，
以及从 React v16.0.0 到当前版本的新模型如何解决这些问题。

这篇文章将涵盖广泛的概念，这些概念纯粹是内部实现细节，对于使用 React 进行实际前端开发并不是绝对必要的。

## React Fiber 是什么

