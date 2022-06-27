---
title: PHP 面向对象编程和设计模式 (2/5) - 静态变量、属性和方法及延迟绑定
author: 高国良
type: posts
series: false
date: 2014-06-10T00:28:00.791Z
tags: [php, static, self, this]
description: 当希望指向最终的实现功能的类时，就可以使用 static，这个限定符会在代码执行之前立即计算出继承层次结构上最后那个类的成员。这一过程被称作延迟绑定。
draft: false 
cover: false
---

PHP高级程序设计 学习笔记 2014.06.10

Static（静态）关键字用来定义静态方法和属性，static 也可用于定义静态变量以及后期静态绑定。

## 静态变量 static variable

静态变量仅在局部函数域中存在，但当程序执行离开此作用域时，其值并不丢失。也就是说，在下一次执行这个函数时，变量仍然会记得原来的值。要将某个变量定义为静态的，只需要在变量前加上static关键字即可。

```php
function testing()
{
    static $a = 1;
    $a *= 2;
    echo $a."\n";
}

testing();
testing();
testing();
testing();

/**
 *    2
 *    4
 *    8
 *    16
 *    [Finished in 0.1s]
*/
```

静态变量也提供了一种处理递归函数的方法。递归函数是一种调用自己的函数。写递归函数时要小心，因为可能会无穷递归下去。必须确保有充分的方法来中止递归。

本例中 `testing()` 函数在每次执行之后，都会在内部保存 $a 变量的值。在下一次 `testing()`函数被调用时，$a 的值就会恢复，然后 `testing()` 函数会将这个值乘以2，并打印。变量的初始默认值为1，这一赋值操作只会在变量第一次被初始化时发生。函数每次执行的过程中，这一操作不会被调用。

## 类中静态元素的使用

在类中 static 关键字有两种主要的用法，一种是用来定义静态成员，另一种是用来定义静态方法。声明类属性或方法为静态，就可以不实例化类而直接访问。静态属性不能通过一个类已实例化的对象来访问（但静态方法可以）。静态属性不可以由对象通过 -> 操作符来访问。在类的内部我们可以使用作用域限定操作符来访问不同层次作用域的变量。

### 静态属性

由于静态方法不需要通过对象即可调用，所以伪变量 $this 在静态方法中不可用。可以把静态变量看成是属于整个类而不是属于类的某个实例。与一般的实例变量不同的是，静态属性只保留一个变量值，而这个变量值对所有的实例都有效，也就是说所有实例共享这一个属性。

```php
class MyObject
{
    public static $a = 0;
    function MyMethod()
    {
        self::$a += 2;
        echo self::$a . "\n";
    }
}

$instance1 = new MyObject();
$instance1 -> MyMethod();

$instance2 = new MyObject();
$instance2 -> MyMethod();

/**
 *
 * 2
 * 4
 * [Finished in 0.1s]
 *
 */
```

**$this** 指标是类的当前实例，是一个到主叫对象的引用。

**self::** 表示的是类本身，使用 self:: 作用域限定符时必须在操作符后面加上 $ 符号，在类之外的代码中不能使用这个操作符，而且它不能识别自己在继承树层次结构中的位置。在扩展类中使用 self:: 作用域时， self 可以调用基类中声明的方法，但它调用的总是已经在扩展类中重写的方法。

**parent::** 在扩展类中，在基类的方法被重写的情况下，如果你要访问基类的方法，可以使用 parent::

**static::** 使我们不再需要使用 self:: 和 parent:: 。当希望指向最终的实现功能的类时，就可以使用static，这个限定符会在代码执行之前立即计算出继承层次结构上最后那个类的成员。

### 静态方法

静态方法的规则和静态变量是相同的。使用static关键字可以将方法标记为静态方法，而通过类的名称 和 作用域限定操作符 (::)可以访问静态方法。

静态方法和非静态方法之间有一个很重要的区别：在调用静态方法时，我们不在需要拥有类的实例。

```php
class MyObjectBase
{
    static function MyMethod()
    {
        static::MyOtherMethod();
    }

    static function MyOtherMethod()
    {
        echo 'called from MyObject.';
    }
}

class MyExtendObject extends MyObjectBase
{
    static function MyOtherMethod()
    {
        echo 'called from MyExtendObject.';
    }
}

MyExtendObject::MyMethod();
```

上例代码会正确的调用MyExtendObject中的 MyOtherMethod 方法，输出called from MyExtendObject. \[Finished in 0.1s\]。

如果某个方法中不包含$this 变量，那么这个方法就应该是静态方法。如果不需要类的实例，那么还应该使用静态类，这样可以免去实例化的工作。另外，在静态方法中是不能使用 $this 变量的，因为静态方法不属于某个特定的实例。

### 延迟绑定

static:: 使我们不再需要使用 self:: 和 parent:: 。当希望指向最终的实现功能的类时，就可以使用static，这个限定符会在代码执行之前立即计算出继承层次结构上最后那个类的成员。这一过程被称作延迟绑定。

## 总结

使用static关键字可以创建静态变量，同时还可以提供一个默认的初始化值。静态变量是经过修饰的函数变量，在某个函数执行完成之后，他的值仍保持不丢失。

static关键字还可以用在类中来修饰属性和方法。用在属性上时，它使属性不再为某个实例保存一个值，而是为整个类自身保存一个值，静态属性可以在成员间共享。

要访问静态方法可以用(::)，它被称作作用域限定符。这个操作符的左边可以是一个类名或者某个预定义作用域，预定义作用域包括 self parent static。操作符的右边是一个静态方法、属性。
