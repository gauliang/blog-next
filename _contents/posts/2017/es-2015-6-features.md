---
title: ES 2015/6 新特性汇总
author: 高国良
type: posts
series: false
date: 2017-06-19T00:20:00.791Z
tags: [javascript, web, ES6, ES2015]
description: ES 2015/6 新增内容还是比较多的，这里仅大纲性的列举一下（不一定全面）这些特性。其实，每个点挖进去都会有很多学问在里头，本文旨在汇总，所以不对这些特性进行深层次的讨论及研究。随后有时间的话，在单独写几篇博客对常用的点进行深挖，与大家进行深度交流。
draft: false 
cover: false
---

ES 2015/6 新增内容还是比较多的，这里仅大纲性的列举一下（不一定全面）这些特性。其实，每个点挖进去都会有很多学问在里头，本文旨在汇总，所以不对这些特性进行深层次的讨论及研究。随后若有时间，再单独写几篇博客对常用的点进行深挖，与大家进行深度交流。

## 箭头函数

箭头函数，通过 `=>` 语法实现的函数简写形式，C#/JAVA8/CoffeeScript 中都有类似语法。与函数不同，箭头函数与其执行下文环境共享同一个 `this`。如果一个箭头函数出现在一个函数对象内部，它会与这个函数共享 `arguments` 变量。

```javascript
// Expression bodies
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);

// Statement bodies
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});

// Lexical this
var bob = {
  _name: "Bob",
  _friends: ['jim'],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f)); // Bob knows jim
  }
};

// Lexical arguments
function square() {
  let example = () => {
    let numbers = [];
    for (let number of arguments) {
      numbers.push(number * number);
    }

    return numbers;
  };

  return example();
}

square(2, 4, 7.5, 8, 11.5, 21); // returns: [4, 16, 56.25, 64, 132.25, 441]
```

## 类 Class

Javascript `类` 并不是引入了一个新的面向对象的对象继承模型，而是基于原型继承的语法糖。其提供了一个更简单和清晰的语法来创建对象并处理继承。

```javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```
类没有声明提升，必须确保在调用前已经进行了声明。

构造函数 `constructor` 是一个特殊的方法，其用于创建和初始化类的实例。

静态方法 `static` 关键字用于声明静态方法

创建子类 `extends` 关键字用于创建子类，这里要注意：extends 不能用于扩展常规对象(不可构造/非构造的)，如果要继承常规对象，可使用 `Object.setPrototypeOf()`。

调用超类 `super` 关键字可以用来调用父类中的方法

`Mix-ins` 混合

## 增强的对象���面量

通过字面量形式可以实现，定义prototype、键值对简写、定义方法等、动态属性名称。

```javascript
var obj = {
    // Sets the prototype. "__proto__" or '__proto__' would also work.
    __proto__: theProtoObj,
    // Computed property name does not set prototype or trigger early error for
    // duplicate __proto__ properties.
    ['__proto__']: somethingElse,
    // Shorthand for ‘handler: handler’
    handler,
    // Methods
    toString() {
     // Super calls
     return "d " + super.toString();
    },
    // Computed (dynamic) property names
    [ "prop_" + (() => 42)() ]: 42
};
```
## 模板字符串

模板字符串 提供构造字符串的语法糖，在 Prel/python 等语言中也都有类似特性。

```javascript
// Basic literal string creation
`This is a pretty little template string.`

// Multiline strings
`In ES5 this is
 not legal.`

// Interpolate variable bindings
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

// Unescaped template strings
String.raw`In ES5 "\n" is a line-feed.`

// Construct an HTTP request prefix is used to interpret the replacements and construction
GET`http://foo.org/bar?a=${a}&b=${b}
    Content-Type: application/json
    X-Credentials: ${credentials}
    { "foo": ${foo},
      "bar": ${bar}}`(myOnReadyStateChangeHandler);
```

## 解构赋值

Destructuring 法是一个Javascript表达式，这使得可以将值从数组或属性从对象提取到不同的变量中。

```javascript
// list matching
var [a, ,b] = [1,2,3];
a === 1;
b === 3;

// object matching (用新变量名赋值)
var { op: a, lhs: { op: b }, rhs: c }
       = getASTNode()

// object matching shorthand
// binds `op`, `lhs` and `rhs` in scope
var {op, lhs, rhs} = getASTNode()

// Can be used in parameter position
function g({name: x}) {
  console.log(x);
}
g({name: 5})

// Fail-soft destructuring
var [a] = [];
a === undefined;

// Fail-soft destructuring with defaults
var [a = 1] = [];
a === 1;

// 变量可以先赋予默认值。当要提取的对象没有对应的属性，变量就被赋予默认值。
var {a = 10, b = 5} = {a: 3};
console.log(a); // 3
console.log(b); // 5

// Destructuring + defaults arguments
function r({x, y, w = 10, h = 10}) {
  return x + y + w + h;
}
r({x:1, y:2}) === 23

// 对象属性计算名和解构
let key = "z";
let { [key]: foo } = { z: "bar" };

console.log(foo); // "bar"

```

## Default + Rest + Spread

为函数参数提供默认值 & `...` 定数量参数 

```javascript
function f(x, y=12) {
  // y is 12 if not passed (or passed as undefined)
  return x + y;
}
f(3) == 15


function f(x, ...y) {
  // y is an Array
  return x * y.length;
}
f(3, "hello", true) == 6



function f(x, y, z) {
  return x + y + z;
}
// Pass each elem of array as argument
f(...[1,2,3]) == 6
```

## Let + Const

`let` 用于声明块级作用域变量。 `const` 用于声明常量。

```javascript
function f() {
  {
    let x;
    {
      // this is ok since it's a block scoped name
      const x = "sneaky";
      // error, was just defined with `const` above
      x = "foo";
    }
    // this is ok since it was declared with `let`
    x = "bar";
    // error, already declared above in this block
    let x = "inner";
  }
}
```

## 迭代器

通过 symbol.iterator 可创建自定义迭代器。
```javascript
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
      }
    }
  }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
}
```

## 生成器 Generators

普通函数使用function声明，而生成器函数使用function*声明。

在生成器函数内部，有一种类似return的语法：关键字yield。二者的区别是，普通函数只可以return一次，而生成器函数可以yield多次（当然也可以只yield一次）。在生成器的执行过程中，遇到yield表达式立即暂停，后续可恢复执行状态。

```javascript
function* quips(name) {
  yield "你好 " + name + "!";
  yield "希望你能喜欢这篇介绍ES6的译文";
  if (name.startsWith("X")) {
    yield "你的名字 " + name + "  首字母是X，这很酷！";
  }
  yield "我们下次再见！";
}
```

## Unicode

```javascript
// same as ES5.1
"𠮷".length == 2

// new RegExp behaviour, opt-in ‘u’
"𠮷".match(/./u)[0].length == 2

// new form
"\u{20BB7}" == "𠮷" == "\uD842\uDFB7"

// new String ops
"𠮷".codePointAt(0) == 0x20BB7

// for-of iterates code points
for(var c of "𠮷") {
  console.log(c);
}
```

## Modules 的原生支持

从语言层面支持了模块和组件，类似 AMD CMD 的机制。隐式的同步加载机制——当模块加载完成前不会向后执行。

```javascript
// lib/math.js
export function sum(x, y) {
  return x + y;
}
export var pi = 3.141593;

// app.js
import * as math from "lib/math";
console.log("2π = " + math.sum(math.pi, math.pi));

// otherApp.js
import {sum, pi} from "lib/math";
console.log("2π = " + sum(pi, pi));

// lib/mathplusplus.js
export * from "lib/math";
export var e = 2.71828182846;
export default function(x) {
    return Math.exp(x);
}

// app.js
import exp, {pi, e} from "lib/mathplusplus";
console.log("e^π = " + exp(pi));
```

## Map + Set + WeakMap + WeakSet
```javascript
// Sets
var s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;
s.has("hello") === true;

// Maps
var m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;

// Weak Maps
var wm = new WeakMap();
wm.set(s, { extra: 42 });
wm.size === undefined

// Weak Sets
var ws = new WeakSet();
ws.add({ data: 42 });
// Because the added object has no other references, it will not be held in the set
```


## Proxies

Proxies enable creation of objects with the full range of behaviors available to host objects. Can be used for interception, object virtualization, logging/profiling, etc.

```javascript 
// Proxying a normal object
var target = {};
var handler = {
  get: function (receiver, name) {
    return `Hello, ${name}!`;
  }
};

var p = new Proxy(target, handler);
p.world === "Hello, world!";


// Proxying a function object
var target = function () { return "I am the target"; };
var handler = {
  apply: function (receiver, ...args) {
    return "I am the proxy";
  }
};

var p = new Proxy(target, handler);
p() === "I am the proxy";
There are traps available for all of the runtime-level meta-operations:


var handler =
{
  // target.prop
  get: ...,
  // target.prop = value
  set: ...,
  // 'prop' in target
  has: ...,
  // delete target.prop
  deleteProperty: ...,
  // target(...args)
  apply: ...,
  // new target(...args)
  construct: ...,
  // Object.getOwnPropertyDescriptor(target, 'prop')
  getOwnPropertyDescriptor: ...,
  // Object.defineProperty(target, 'prop', descriptor)
  defineProperty: ...,
  // Object.getPrototypeOf(target), Reflect.getPrototypeOf(target),
  // target.__proto__, object.isPrototypeOf(target), object instanceof target
  getPrototypeOf: ...,
  // Object.setPrototypeOf(target), Reflect.setPrototypeOf(target)
  setPrototypeOf: ...,
  // for (let i in target) {}
  enumerate: ...,
  // Object.keys(target)
  ownKeys: ...,
  // Object.preventExtensions(target)
  preventExtensions: ...,
  // Object.isExtensible(target)
  isExtensible :...
}

```

## Symbols

这里有一篇讲 symbols 的文章，非常不错。
http://www.infoq.com/cn/articles/es6-in-depth-symbols

``` javascript
(function() {

  // module scoped symbol
  var key = Symbol("key");

  function MyClass(privateData) {
    this[key] = privateData;
  }

  MyClass.prototype = {
    doStuff: function() {
      ... this[key] ...
    }
  };

  // Limited support from Babel, full support requires native implementation.
  typeof key === "symbol"
})();

var c = new MyClass("hello")
c["key"] === undefined
```

## Subclassable Built-ins

```javascript
// User code of Array subclass
class MyArray extends Array {
    constructor(...args) { super(...args); }
}

var arr = new MyArray();
arr[1] = 12;
arr.length == 2
```

## Math + Number + String + Object APIs

```javascript
Number.EPSILON
Number.isInteger(Infinity) // false
Number.isNaN("NaN") // false

Math.acosh(3) // 1.762747174039086
Math.hypot(3, 4) // 5
Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2) // 2

"abcde".includes("cd") // true
"abc".repeat(3) // "abcabcabc"

Array.from(document.querySelectorAll("*")) // Returns a real Array
Array.of(1, 2, 3) // Similar to new Array(...), but without special one-arg behavior
[0, 0, 0].fill(7, 1) // [0,7,7]
[1,2,3].findIndex(x => x == 2) // 1
["a", "b", "c"].entries() // iterator [0, "a"], [1,"b"], [2,"c"]
["a", "b", "c"].keys() // iterator 0, 1, 2
["a", "b", "c"].values() // iterator "a", "b", "c"

Object.assign(Point, { origin: new Point(0,0) })
```

## Promises

Promises are a library for asynchronous programming. Promises are a first class representation of a value that may be made available in the future. Promises are used in many existing JavaScript libraries.

```javascript
function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}

var p = timeout(1000).then(() => {
    return timeout(2000);
}).then(() => {
    throw new Error("hmm");
}).catch(err => {
    return Promise.all([timeout(100), timeout(200)]);
})
```

## Reflect API

Full reflection API exposing the runtime-level meta-operations on objects. This is effectively the inverse of the Proxy API, and allows making calls corresponding to the same meta-operations as the proxy traps. Especially useful for implementing proxies.

```javascript
var O = {a: 1};
Object.defineProperty(O, 'b', {value: 2});
O[Symbol('c')] = 3;

Reflect.ownKeys(O); // ['a', 'b', Symbol(c)]

function C(a, b){
  this.c = a + b;
}
var instance = Reflect.construct(C, [20, 22]);
instance.c; // 42
```

## Tail Calls
Calls in tail-position are guaranteed to not grow the stack unboundedly. Makes recursive algorithms safe in the face of unbounded inputs.

```javascript
function factorial(n, acc = 1) {
    "use strict";
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}

// Stack overflow in most implementations today,
// but safe on arbitrary inputs in ES2015
factorial(100000)
```

有关 ES6/2015 的特性就先汇总到这里，后面补一些常用工具

---

## 常用工具 - 持续更新
如果你想在老版本浏览器使用 import()，请记得使用 polyfill（例如 es6-promise 或 promise-polyfill）来 shim Promise。import() 在内部依赖于 Promise。

## 写在后面

本文地址：[https://www.cnblogs.com/kelsen/p/7046004.html](https://www.cnblogs.com/kelsen/p/7046004.html)

如果您有任何建议或疑问请在下面留言交流。
