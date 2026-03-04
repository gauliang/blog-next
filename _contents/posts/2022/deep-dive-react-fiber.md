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

## 引言：从“一气呵成”到“分片协作”

在 React 16 版本之前，React 的更新机制是同步且不可中断的。当组件状态变化时，React 会通过递归的方式遍历虚拟 DOM 树，找出差异并一次性更新。这个过程就像是一个庞大的、必须一口气执行完毕的任务——一旦开始，就会一直占用浏览器主线程，直到整个组件树计算完成。如果组件层级较深，这种“一口气做完”的方式可能会导致页面卡顿，用户的输入或动画效果无法得到及时响应。

为了解决这个问题，React 团队花费了两年多的时间，在 React 16 中推出了全新的核心算法架构——**Fiber**。它不是一项具体的功能，而是一次底层重构，旨在**将同步的、不可中断的更新，变为异步的、可中断的分片更新**，从而解决大型应用中的性能瓶颈问题。

## 一、为什么需要 Fiber？—— 浏览器的“16毫秒”法则

要理解 Fiber 的价值，首先需要了解浏览器的渲染机制。通常，设备的屏幕刷新率为 60 次/秒，这意味着浏览器需要在 **16.6 毫秒**内完成一帧的所有任务，才能保证页面流畅运行。在这一帧中，浏览器需要处理用户输入、执行定时器、运行动画帧（`requestAnimationFrame`）、进行布局（Layout）和绘制（Paint）等操作。

然而，JavaScript 引擎和页面渲染引擎是互斥的。如果 JavaScript 代码执行时间过长，超过了 16 毫秒，这一帧就没有时间进行样式计算和绘制，从而出现“掉帧”现象，用户会感觉到卡顿。在旧版 React 中，当组件更新时，Reconciliation（协调）过程采用递归遍历，一旦开始就无法停止，这无疑增加了长任务阻塞主线程的风险。

## 二、Fiber 是什么？—— 既是执行单元，也是数据结构

Fiber 可以理解为两件事：**一个工作单元**和**一种数据结构**。

### 1. 一个执行单元
Fiber 的核心设计理念是将大的渲染任务拆分成无数个小的任务片。每个 Fiber 节点代表一个工作任务。React 在处理完一个 Fiber 后，会检查当前帧是否还有剩余时间，如果没有时间了，就会主动让出控制权给浏览器，等待下一帧的空闲时间再继续执行未完成的任务。这种机制让 React 的协调阶段变得“可中断”。

### 2. 一种数据结构
为了实现可中断的任务恢复，Fiber 采用了**链表**的结构。每个 Fiber 节点包含了`child`（第一个子节点）、`sibling`（兄弟节点）和`return`（父节点）三个关键的指针属性。通过这种链表结构，React 在执行完一个节点后，可以迅速找到下一个需要处理的节点，即使任务被中断，下次恢复时也能通过链表记录继续往下执行，而不需要重新从头开始递归。

一个典型的 Fiber 节点包含以下关键信息：
- **`stateNode`**：对应到页面上的真实 DOM 节点或组件实例。
- **`type` 与 `tag`**：定义了组件的类型（如 ClassComponent、FunctionComponent、HostComponent 等）。
- **`updateQueue`**：一个链表，用于存放 `setState` 等更新任务。
- **`memoizedState`**：上一次渲染时使用的 state。
- **`effectTag`**：标记当前节点需要进行的 DOM 操作类型（如更新、删除、新增）。

## 三、Fiber 的核心工作机制：时间分片与双缓冲

Fiber 架构之所以能提升性能，主要依赖于两大关键技术：**时间分片（Time Slicing）** 和 **双缓冲（Double Buffering）**。

### 1. 时间分片与调度器（Scheduler）
React Fiber 引入了 **Scheduler（调度器）** 模块，它是整个异步渲染的“大脑”。Scheduler 的设计灵感来源于浏览器的 `requestIdleCallback` API，该 API 允许开发者在浏览器的空闲时段执行低优先级任务。

由于 `requestIdleCallback` 的兼容性和触发频率限制，React 并没有直接使用它，而是通过 `requestAnimationFrame` 和消息通道（MessageChannel）模拟实现了一套自己的调度机制。这套机制会为每个任务分配一个过期时间（`expirationTime` 或新的 `lane` 模型）。优先级越高的任务（如同步更新或用户输入），过期时间越短，必须尽快执行；而优先级较低的任务（如网络数据预加载），可以在空闲时慢慢处理。

### 2. 双缓冲机制（Double Buffering）
在更新过程中，Fiber 采用了图形学中常见的“双缓冲”技术。具体来说，React 维护了两棵 Fiber 树：
- **`current` 树**：当前屏幕上显示内容对应的 Fiber 树。
- **`workInProgress` 树**：在内存中构建的、准备下一次渲染的 Fiber 树。

当触发更新时，React 会从 `current` 树的根节点开始，克隆出一个 `alternate` 节点并构建 `workInProgress` 树。所有的 `diff` 计算和副作用收集都在 `workInProgress` 树上进行，这期间即使计算被中断或取消，也不会影响 `current` 树对应的真实页面。当 `workInProgress` 树构建完成，并进入提交阶段（Commit Phase）后，React 会将 `fiberRoot` 的 `current` 指针直接指向 `workInProgress` 树，瞬间完成新旧树的切换。

这种机制不仅避免了构建一半的树导致页面错乱，还通过复用 `alternate` 节点减少了重复创建对象的内存开销，极大地提升了性能。

## 四、Fiber 的生命周期与执行阶段

Fiber 架构将更新流程清晰地划分为两个阶段：

### 1. 协调阶段（Render Phase）
这个阶段是**可中断**的。React 通过 `workLoop` 循环遍历 Fiber 树，收集所有需要执行的更新任务。在这个阶段，React 会调用组件的 `render` 方法，执行 `diff` 算法，找出差异并打上 `effectTag` 标记，但并不会操作真实的 DOM。需要注意的是，由于该阶段可以被打断，传统的 `componentWillMount`、`componentWillReceiveProps` 等生命周期函数可能会被多次调用，因此它们被标记为“不安全”，建议使用静态方法 `getDerivedStateFromProps` 替代。

### 2. 提交阶段（Commit Phase）
当协调阶段完成，所有的变更都被收集到 Effect List 中后，便进入提交阶段。这个阶段是**同步且不可中断**的。React 会遍历 Effect List，将 `effectTag` 对应的 DOM 操作一次性批量执行（如节点插入、更新、删除），并更新 refs。这一阶段对应了 `componentDidMount` 和 `componentDidUpdate` 生命周期。

这种将“计算”与“提交”分离的设计，确保了用户看到的界面永远是完整的、一致的状态，避免了渐进式渲染带来的视觉抖动。

## 五、Fiber 的深远影响

Fiber 的出现不仅仅是为了解决卡顿问题，它为 React 未来的发展奠定了基础：
1. **Concurrent Mode（并发模式）**：使得 React 可以同时准备多版本 UI 更新，根据优先级高低动态调整渲染顺序。
2. **Suspense**：让组件可以“等待”异步数据，在数据加载完成前显示 fallback 内容，极大改善了数据获取时的用户体验。
3. **优先级调度**：确保了用户交互等高优先级任务能打断冗长的数据渲染任务，保持界面的高响应性。

## 结语

React Fiber 是一次对“响应式”的深度探索。它没有魔法，而是巧妙地利用了浏览器的运行机制，通过链表遍历替代递归，通过时间分片和双缓冲，将被动的主线程阻塞转变为主动的任务调度。理解 Fiber，不仅能帮助我们写出更高效的 React 代码，更能让我们对前端性能优化的本质有更深层次的思考。
