---
title: Flex 布局知识点梳理
author: 高国良
type: posts
series: false
date: 2018-07-29T12:48:00.791Z
tags: [css, layout]
description: 传统的布局方案，在针对特殊布局时会很不方便，比如垂直居中，把一个容器等分为 N 列等等。自从 Flex 出现以后，这些都迎刃而解了。
draft: false 
cover: false
---

传统的布局方案，在针对特殊布局时会很不方便，比如垂直居中，把一个容器等分为 N 列等等。自从 Flex 出现以后，这些都迎刃而解了。

## 什么是 Flex

Flex 是 Flexible Box 的缩写，意为”弹性布局”，任何一个容器都可以指定为 Flex 布局。设为 Flex 布局以后，子元素的 `float`、`clear` 和 `vertical-align` 属性将失效。要设置一个元素采用 flex 布局，只需设置器 `display:flex` 即可。

```css
.flex-box{
    display:flex;     /* or inline-flex*/
}
```

## 常用术语

采用 Flex 布局的元素，称为 Flex 容器。其子元素为 **flex item**，本文称其为”项目”。容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。

1. flex container : Flex容器，简称 **容器**
1. flex item : Flex容器的子元素，可称其为 flex 项目，简称 **项目**
1. main axis : 主轴， 水平轴，起始位置称为 `main start`，结束位置称为 `main end`
1. cross axis: 交叉轴， 垂直轴，开始位置叫做 `cross start`，结束位置叫做 `cross end`

项目默认沿 main axis 排列，单个项目占据的主轴空间叫做 main size，占据的交叉轴空间叫做 cross size。

## 容器的属性

1. flex-direction :决定主轴的方向（即项目的排列方向）。
    - row（默认值）：主轴为水平方向，起点在左端。
    - row-reverse：主轴为水平方向，起点在右端。
    - column：主轴为垂直方向，起点在上沿。
    - column-reverse：主轴为垂直方向，起点在下沿。
1. flex-wrap: 默认情况下，项目都排在一条线（又称”轴线”）上。f`lex-wrap` 属性定义，如果一条轴线排不下，如何换行。
    - nowrap（默认）：不换行。
    - wrap：换行，第一行在上方。
    - wrap-reverse：换行，第一行在下方。
1. flex-flow : `flex-direction` 属性和 `flex-wrap` 属性的简写形式，默认值为 `row nowrap`。
    ```css
    .box {
      flex-flow: <flex-direction> || <flex-wrap>;
    }
    ```
1. justify-content: 定义了项目在主轴上的对齐方式。
1. align-items: 定义项目在交叉轴上如何对齐。
1. align-content: 定义多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。


## 项目的属性

1. order 定义项目的排列顺序，数值越小越靠前
1. flex-grow 定义项目的放大比例
1. flex-shrink 定义项目的缩小比例
1. flex-basis 定义在分配多余空间之前，项目占据的主轴空间
1. flex 是 grow shrink basis 的简写。取值 ` none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
1. align-self 定义当前项目的对其方式。取值 `auto | flex-start | flex-end | center | baseline | stretch`
