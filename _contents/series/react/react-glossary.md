---
title: React 术语表
author: GauLiang
type: series
series: react
date: 2022-06-25T00:46:37.294Z
tags: [react]
description: 收集、整理 React 相关术语及其解释。
draft: false
cover: false     # image name
---

收集、整理 React 相关术语及其解释，本文将持续更新。

| 版本 | 状态 |
| --- | --- |
| React 17 | 收录中 |
| React 18 | 收录中 |

## Elements

在 React 中，元素是描述组件实例或 DOM 节点及其所需属性的普通对象。它仅包含有关组件类型（例如 a Button）、
其属性（例如 its color）以及其中的任何子元素的信息。

当一个元素的 type 是一个字符串时，它代表一个具有该标签名称的 DOM 节点，props 对应于它的属性。例如：

```js
{
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      props: {
        children: 'OK!'
      }
    }
  }
}
```

此元素只是将以下 HTML 表示为普通对象的一种方式：

```jsx
<button class='button button-blue'>
  <b>OK!</b>
</button>
```

当 `type` 是一个 `function` 或 `class` 时，它是 React 组建，React 组建的描述与此相通。如：

```js
{
  type: Button,
  props: {
    color: 'blue',
    children: 'OK!'
  }
}

// 当 React 渲染 Button 元素时，Button 将返回如下

{
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      props: {
        children: 'OK!'
      }
    }
  }
}
```

一个用于描述组件的元素也是一个元素，就像一个用于描述 DOM 节点的元素一样。它们可以彼此嵌套，互相混合。
React 将重复这个过程直到它知道了页面上每一个组件之下的 DOM 标签元素。

[摘自] https://zh-hans.reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html

## Renderer

React 最初只是服务于 DOM，但是这之后被改编成也能同时支持原生平台的 React Native。
因此，在 React 内部机制中引入了 **渲染器** 这个概念。

渲染器位于 `packages/` 目录下：

- `React DOM Renderer` 将 React 组件渲染成 DOM。它实现了全局 ReactDOMAPI，这在npm上作为 react-dom 包。
这也可以作为单独浏览器版本使用，称为 react-dom.js，导出一个 ReactDOM 的全局对象.
- `React Native Renderer` 将 React 组件渲染为 Native 视图。此渲染器在 React Native 内部使用。
- `React Test Renderer` 将 React 组件渲染为 JSON 树。这用于 Jest 的快照测试特性。在 npm 上作为 react-test-renderer 包发布。

[摘自]https://zh-hans.reactjs.org/docs/codebase-overview.html#renderers

## Reconcilers

即便 React DOM 和 React Native 渲染器的区别很大，但也需要共享一些逻辑。
特别是 [协调](https://zh-hans.reactjs.org/docs/reconciliation.html) 算法需要尽可能相似，
这样可以让声明式渲染，自定义组件，state，生命周期方法和 refs 等特性，保持跨平台工作一致。

### > Stack reconciler

Stack reconciler 是 React 15 及更早的解决方案。虽然已经停止了对它的使用, 
但是这在 [implementation-notes](https://zh-hans.reactjs.org/docs/implementation-notes.html) 有详细的文档。

### > Fiber reconciler

Fiber reconciler 是一个新尝试，致力于解决 stack reconciler 中固有的问题，同时解决一些历史遗留问题。Fiber 从 React 16 开始变成了默认的 reconciler。

源代码在 `packages/react-reconciler` 目录下

Fiber 相关资料：
[React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture) 
[Inside Fiber](https://medium.com/react-in-depth/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react-e1c04700ef6e)

## Event System

React 在原生事件基础上进行了封装，以抹平浏览器间差异。其源码在 `packages/react-dom/src/events` 目录下。

## 参考

- https://reactjs.org/docs/codebase-overview.html#renderers
- https://reactjs.org/docs/implementation-notes.html
