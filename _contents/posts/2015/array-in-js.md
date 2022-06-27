---
title: "Javascript 中的数组"
date: 2015-10-01T19:34:00.791Z
draft: false
description: "Array 是 javascript 中经常用到的数据类型。本文主要讨论 javascript 中数组的声明、转换、排序、合并、迭代等基本操作。"
type: "posts"    # posts | series
tags: [array, javascript]
series: false
author: "Gl"
cover: false
---

Array 是 javascript 中经常用到的数据类型。Javascript 的数组与其他语言中数组的最大的区别是其每个数组项都可以保存任何类型的数据。本文主要讨论 javascript 中数组的声明、转换、排序、合并、迭代等基本操作。

原文：[https://www.cnblogs.com/kelsen/p/4850274.html](https://www.cnblogs.com/leonkao/p/4850274.html)

## 创建数组

1、**使用 Array 构造函数** 创建数组。

```js
//创建一个空数组
var cars = new Array();

//创建一个指定长度的数组
var cars = new Array(20);

//向构造函数传递数组项
var cars = new Array('Mercedes-benz','BMW','Audi');
```

这里要注意的是，当只传递一个参数给Array构造函数时，如果参数是数字则会创建一个指定长度的数组，如果参数是一个字符串则创建一个只包含该字符串的长度为1 的数组。

```js
var cars = new Array(1);        //[undefined × 1]
var cars = new Array('BMW');    //["BMW"]    
```

另外使用 Array 构造函数创建数组时也可以省略掉 new 操作符，和上面的一样只是去掉new关键字即可，这里不做演示。

2、使用 **数组字面量法** 创建数组

这种方法使用一对方括号 `[]` 表示数组，直接把数组项书写在方括号中，多个数组项之间用逗号 `,` 隔开。注意：为避免兼容性问题请不要在最后一个项后面添加 `,` 。

```js
//创建一个空数组
var cars = [];

//创建一个包含3个项的数组
var cars = ['Mercedes-benz','BMW','Audi'];
```

在读取和设置数组的值时，只需通过方括号提供相应项的索引即可

```js
var cars = ['Mercedes-benz','BMW','Audi'];

console.log(cars[0]);        // "Mercedes-benz"

cars[2] = 'Jeep';            // 把Audi修改为Jeep
cars[3] = 'Audi';            // 增加第四项 Audi
```

通过数组的 `length` 属性可读取数组的长度，但是该属性不是只读的，通过修改该属性可以变更数组的长度。如果新 `length` 小于原 `length` 则会删掉原数组中多余的数组项；
若新 `length` 大于原 `length` 则数组中仍保持原来的数组项，但是 `length` 被增加到了新 `length`,当访问这些不存在的项时会返回 `undefined`。

```js
var cars = ['Mercedes-benz','BMW','Audi'];
console.log(cars.length)    // 3
console.log(cars)           // ["Mercedes-benz", "BMW", "Audi"]
cars.length = 2;
console.log(cars)           // ["Mercedes-benz", "BMW"]
cars.length = 4;
console.log(cars)           // ["Mercedes-benz", "BMW"]
cars                        // ["Mercedes-benz", "BMW", undefined × 2]
```

## 检测数组

有两种方法可以检测某个对象是否为数组 `value instanceof Array` 和 `Array.isArray(value)`。
`Array.isArray()` 方法是ES5中新增的方法，其优势在于当页面中的多个框架间传递数组时，仍可正确返回数据类型。

## 数组转换

`toString()` 方法可以返回由数组中项组成的字符串，项与项之间由 `,` 连接。当进行转换时会调用数组中每个项的 `toString()` 方法；`toLocaleString()` 会返回与 `tostring` 类似的结果，只不过其调用的是数组中每项的 `toLocaleString()`； `valueOf` 会返回数组本身； `join()` 函数接受一个字符串类型的参数，返回之类似 `tostring()`，不同之处在于该函数使用传递给他的参数作为数组项之间的连接符。

## 队列和栈

通过 `push()` 和 `pop()` 函数可实现 LIFO（Last-in-first-out）。`push()` 方法接收任意数量的参数，把它们逐个添加到当前数组的末尾，返回修改后数组的长度。而 `pop()` 方法则从数组末尾移出最后一项，减少数组的 `length` 值，然后返回数组移除的项。

```js
var cars = new Array();

cars.push('Mercedes-benz','BMW');     // 2
console.log(cars);                    // ["Mercedes-benz", "BMW"]

cars.push('Audi');                    // 3
console.log(cars);                    // ["Mercedes-benz", "BMW", "Audi"]

cars.pop();                           // "Audi"
console.log(cars);                    // ["Mercedes-benz", "BMW"]
```

与 `pop()` 类似，还有 `shift()` 方法，不同之处在于，`shift()` 从数组的前端移除项。两者使用可以实现 FIFO(First-In-First-Out)。

```js
var cars = new Array();

cars.push('Mercedes-benz','BMW');     // 2
console.log(cars);                    // ["Mercedes-benz", "BMW"]

cars.push('Audi');                    // 3
console.log(cars);                    // ["Mercedes-benz", "BMW", "Audi"]

cars.shift();                         // "Mercedes-benz"
console.log(cars);                    // ["BMW", "Audi"]
```

## 数组合并

该方法会基于当前数组中的所有项创建一个新数组，先创建一个当前数组的副本，然后将接受到的参数添加到这个副本的末尾，最后返回新构建的数组。如果没有为方法提供参数，则会仅复制当前数组并返回该副本。传递给`concat()` 的参数可以是一个或多个数组，该方法会将这些数组中的项都添加到新构建的结果数组中。如果传递的参数不是数组，这些值会被简单的添加到结果数组的末尾处。

## 数组拼接

上面提到的方法都是在数组的结尾或头部进行操作，`splice()` 不同，它可用于在数组的任意位置删除指定数量的项并在当前位置插入新项。

删除任意数量的项，需指定两个参数：第一个参数指定要删除的第一个项的位置，第二个参数是要删除的项数。如 `splice(0,2)` 会删除当前数组的前两项。

插入任意数量的项，需指定三个参数：第一个参数指定要插入的第一个项的位置，第二个参数是 0，第三至 n 个参数是需要插入的任意的项。如 `splice(2,0,'a','b')`

替换任意数量的项，需指定三个参数：第一个参数指定需替换的第一个项的位置，第二个参数指定需替换的项的个数，第三个以后的参数为要替换的新项。如 `splice(2,2,'a','b')`

```js
var cars = ['Mercedes-benz','BMW','Audi'];
cars.splice(0,1);                    // ['BMW','Audi'];
cars.splice(0,0,"Mercedes-benz");    // ["Mercedes-benz", "BMW", "Audi"]
cars.splice(2,1,"Tesla");            // ["Mercedes-benz", "BMW", "Tesla"]
```

## 项的位置

ES5中提供了两个位置方法 `indexOf()` 和 `lastIndexOf()`。这两个方法都接收两个参数，第一个参数为要查找的项，第二个参数为在数组中查找时的起点位置。
这两个方法的唯一区别在于 `indexOf()` 由前往后查找，`lastindexof()` 是由后往前查找。它们都返回要查找的项在数组中的位置，如果没找到则返回 -1 。
在比较参数是否与数组中的项相等时是使用全等操作符 `===`。

```js
var cars = ['Mercedes-benz','BMW','Audi','Tesla'];
cars.indexOf('BMW');        // 1
cars.indexOf('bmw');        // -1
cars.indexOf('BMW',1);      // 1
cars.indexOf('BMW',2);      // -1

var cars = ['Mercedes-benz','BMW','Audi','Tesla'];
cars.lastIndexOf('BMW');     // 1
cars.lastIndexOf('bmw');     // -1
cars.lastIndexOf('BMW',0);   // -1
cars.lastIndexOf('BMW',2);   // 1
```

## 数组排序

实际应用中经常会遇到要对数组进行排序的情况，javascript 中有两个可以直接用来排序的法 `reverse()` 和 `sort()`。一个用来反转数组排序，另一个用来排序。

```js
var cars = ['Mercedes-benz', 'BMW', 'Audi', 'Tesla'];
var numbers = [1, 2, 3, 14, 15, 16];

cars.sort();            // ["Audi", "BMW", "Mercedes-benz", "Tesla"]
numbers.sort();         // [1, 14, 15, 16, 2, 3]
cars.reverse();         // ["Tesla", "Mercedes-benz", "BMW", "Audi"]
numbers.reverse();      // [3, 2, 16, 15, 14, 1]
```

`reverse()` 方法可以反转数组中的项。`sort()` 方法在排序时会调用较数组中各项的 `toString()` 然后进行比较，所以在对 numbers 排序后，数组项 `16` 排在了 `2` 和 `3` 前面。
由此可见，默认情况下 `sort()` 在排序时并不总是如人所愿。其实 `sort()` 方法还可以接收一个比较函数作为参数以干预 `sort()` 的排序行为。

比较函数接受两个参数，第一个参数应该位于第二个参数前则返回`负数`，如果两个参数相等返回 `0`，如果第一个参数应该位于第二个参数后面则返回 `正数`。

```js
numbers.sort(compare);    // [1, 2, 3, 14, 15, 16]

function compare(item1,item2){
    return item1 - item2;
}
```

## 数组迭代

ES5 中定义了迭代数组的方法，每个方法都接受两个参数，第一个参数为要在每个项上执行的函数，第二个参数为作用域对象（可选）。传入这些方法的函数接受3个参数：数组中的项、该项在数组中的索引、数组本身。

- `every()` 对数组中的每个项执行给定函数，如果每项都返回true则返回true。
- `some()` 对数组中的每个项执行给定函数，如果任何一项返回true则返回true。
- `filter()` 对数组中的每个项执行给定函数，返回所有返回值为true的项组成的数组。
- `map()` 对数组中的每个项执行给定函数，返回每个数组项的执行结果组成的数组。
- `forEach()` 对数组中的每个项执行给定函数。

```js
var cars = ['Mercedes-benz','BMW','Audi','Tesla'];

cars.every(function(item, index, arr){return item.length>4});       // false
cars.some(function(item, index, arr){return item.length>4});        // true
cars.filter(function(item, index, arr){return item.length>4});      // ["Mercedes-benz", "Tesla"]
cars.map(function(item, index, arr){return 'New-' + item});         // ["New-Mercedes-benz", "New-BMW", "New-Audi", "New-Tesla"]
cars.forEach(function(item, index, arr){ 
    // code
});
```

`reduce()` 和 `reduceRight()` 会逐个遍历数组中的每个项，并用给定函数将前两项的计算结果作为基础参与下一个项的计算，依次递归，直至结束。`reduceRight` 与 `reduce` 的不同之处仅仅在于递归顺序的不同， `reduceRight` 是从结尾向前递归。

```js
var numbers = [1, 2, 3, 4, 5, 6, 7];
var sum = numbers.reduce(function(pre, cur, index, arr){
    return pre + cur;
});
console.log(sum);    // 28
```

## 总结

Javascript 中有很多对数组进行操作的方法，熟练使用它们非常有助提高写代码的速度和代码执行的效率（一般情况下，要尽量避免自己实现JS已有的方法），需要注意的是对于部分新增方法，使用时需考虑浏览器支持情况。