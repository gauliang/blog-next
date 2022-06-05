---
title: "Javascript 模块化概述"
date: 2020-09-05T16:04:37+08:00
draft: false
description: "当我们提及**模块化**时，通常意味着是由一组高度分离的，不同的功能块存储在模块中组成的。在可能的情况下，通过松散耦合消除依赖关系简化应用程序的可维护性。
本文概述集中流行的模块化规范，以便在不同应用场景中能够快速决策选型。"
type: "posts"    # posts | series
tags: [javascript, node.js, CommonJS, esm, amd, umd]
series: []
author: "Gl"
cover: '001.jpg'     # image name
---

当我们提及**模块化**时，通常意味着是由一组高度分离的，不同的功能块存储在模块中组成的。
在可能的情况下，通过松散耦合消除依赖关系简化应用程序的可维护性。
本文概述集中流行的模块化规范，以便在不同应用场景中能够快速决策选型。

## CommonJS

CommonJS 是同步导入，主要用于服务器端，无法在浏览器中直接运行。
导入 CJS 时，它将为你提供导入对象的副本，不支持 Tree-shaking。
通过 **require** 和 **exports** 与模块系统交互。

```javascript
//importing
const doSomething = require('./doSomething.js');

//exporting
module.exports = function doSomething(n) {
  // do something
}
```

## AMD

AMD 全称 Asynchronous Module Definition —— 异步模块定义，由 RequireJS 实现，可在浏览器直接使用，语法相对复杂。

```javascript
define(['dep1', 'dep2'], function (dep1, dep2) {
    //Define the module value by returning a value.
    return function () {};
});

//Or

// "simplified CommonJS wrapping" https://requirejs.org/docs/whyamd.html
define(function (require) {
    var dep1 = require('dep1'),
        dep2 = require('dep2');
    return function () {};
});
```

## UMD

通用模块定义，可以在前端和后端工作。与 CJS 和 AMD 不同，UMD 更像是一种配置多个模块系统的模式。
UMD 本质上创建了一种使用这两种方法之一的方式，同时还支持全局变量定义。结果就是，UMD 模块能够在客户端和服务器上工作。

```javascript
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "underscore"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"), require("underscore"));
    } else {
        root.Requester = factory(root.$, root._);
    }
}(this, function ($, _) {
    // this is where I defined my module implementation

    var Requester = { // ... };

    return Requester;
}));
```

## ESM

ES 模块，在许多现代浏览器中均可使用。他具有类似 CJS 的简单语法和 AMD 的异步能力。支持模块的运行时/静态加载。
由于 ES6 的静态模块结构，ESM 可以通过 tree-shaking 优化。允许像 Rollup 这样的打包程序删除不必要的代码，从而加快加载速度。

```javascript
import React from 'react';
import {foo, bar} from './myLib';

export default function() {
  // your Function
};
export const function1() {...};
export const function2() {...};
```

## 参考

1. <https://www.freecodecamp.org/news/anatomy-of-js-module-systems-and-building-libraries-fadcd8dbd0e/>
1. <https://irian.to/blogs/what-are-cjs-amd-umd-and-esm-in-javascript/>
1. <http://www.commonjs.org/>
1. <https://requirejs.org/>
1. <https://addyosmani.com/writing-modular-js/>
