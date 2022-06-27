---
title: PHP 高级编程(1/5) - 编码规范及文档编写
author: 高国良
type: posts
series: false
date: 2014-06-13T01:03:00.791Z
tags: [php, PHPDoc]
description: 软件开发中的一个重要环节就是文档编写。他可以帮助未来的程序维护人员和使用者理解你在开发时的思路。也便于日后重新查看代码时不至于无从下手。文档还有一个重要的作用，在不用了解要访问对象的细节情况下也能很好的在对象之间进行交互。文档的编写有一些成熟的行业标准格式，遵守这些行业标准将有助于创建易于阅读的代表，并使自动生成手册成为可能。
draft: false 
cover: false
---

PHP 高级程序设计学习笔记 20140612

软件开发中的一个重要环节就是文档编写。他可以帮助未来的程序维护人员和使用者理解你在开发时的思路。也便于日后重新查看代码时不至于无从下手。文档还有一个重要的作用，在不用了解要访问对象的细节情况下也能很好的在对象之间进行交互。文档的编写有一些成熟的行业标准格式，遵守这些行业标准将有助于创建易于阅读的代表，并使自动生成手册成为可能。

## 编码规范

编码规范可能很多开发人员都有各自的观点也意见，且大家不尽相同。其实只要团队成员之间达成一致，遵循同一个标准就好。

PHP社区百花齐放，拥有大量的函数库、框架和组件。PHP开发者通常会在自己的项目中使用若干个外部库，因而PHP代码遵循或尽量接近 同一个代码风格就非常重要，可以让开发者方便地把多个代码库集成在自己的项目中。框架互操作组(即PHP标准组)发布了一系列推荐风格。其中有部分是关于代码风格的，即PSR-0，PSR-1，PSR-2和PSR-4。通常情况下，你的PHP代码应该遵循其中一项或多项标准，从而其他开发者可以方便地阅读和使用你的代码。这些标准都是在前一个标准 上附加新的规则，所以使用PSR-1就同时要求遵循PSR-0，但可以不遵循PSR-2。

* [阅读PSR-0](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-0.md)
* [阅读PSR-1](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-1-basic-coding-standard.md)
* [阅读PSR-2](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md)
* [阅读PSR-4](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-4-autoloader.md)
* [Read about PEAR Coding Standards](http://pear.php.net/manual/en/standards.php)
* [Read about Zend Coding Standards](http://framework.zend.com/wiki/display/ZFDEV2/Coding+Standards)
* [Read about Symfony Coding Standards](http://symfony.com/doc/current/contributing/code/standards.html)

## 注释的类型

PHP 中常用的三种注释方法，注释是增加程序可读性、可维护性的一种方法，而不是唯一方法。可读性和可维护性主要还是在代码命名，项目组织处提高。

```php
//这是一个单行注释类型

/*
 这是一个多行注释类型
 第二行注释
*/

/**
 *
 * 这种形式的注释被称为 文档注释
 */
```

第一种注释可以说是给人看的，一般用来比较简短的注释。第二种，则用在需要大量注释的代码中。第三种注释被称为文档注释，可以被机器解释，且能以固定的格式放到手册中去。注释的种类主要包括：类的注释，属性注释、方法注释、变量注释以及关键算法、重要代码实现等。所有的这些部分编织在一起，使得人们在以后的时间里能够准确的知道你干了什么，为什么这么做。

## 文法解析

从编程语言到可执行代码的转换过程叫做文法解析。当文法解析器遇到一个正常的注释时，它会识别它并忽略它，并且清理掉注释中的数据，因此一般的注释是无法迁入元数据的。

## 元数据

元数据的定义是 data about data 。是一种广泛存在的现象，在许多领域有具体的定义和应用。其被定义为：描述数据的数据，对数据及信息资源的描述性信息。PHP包含了大多数编程元素的元数据。然而，你可能需要嵌入更多的元数据，因为元数据在自动生成文档方面非常有用。这种功能可以通过文档注释的解析来模拟。如果创建遵循特定格式的文档注释，解析器可以将注释自动转换称为有意义的文档。

## PHPDoc

PHPDoc 是用于维护PHP文档的解决方案。其为文档注释定一辆一种结构，允许解析器以一致的方式解析它们。有了 PHPDoc 就可以从嵌入文档中创建手册了。 和所有文档注释一样，PHPDoc 要求必须以 `/**` 注释声明开始。PHPDoc 的特殊之处在于标签。 标签由`@`开始加上一个预定义的标示符表示。关于 PHPDoc 的更多信息请参考 http://www.phpdoc.org/docs/latest/index.html

## 规范的注释

注释块必须以`/**`开始，以`*/`结束。

开始注释和结束之间的每行都以星号`\*`开始。

标签必须以 at-sign `@` 开头在新行书写，接着写标有几个标签支持或需要用类型来表示包含在相关元素的值的类型。
这方面的一个例子是 `@param` 标记，以确定一个方法或函数参数的类型。

**Here is a full listing：**

- `string：`A piece of text of an unspecified length.  
- `int or integer：`A whole number that may be either positive or negative.  
- `float：`A real, or decimal, number that may be either positive or negative.  
- `bool or boolean：`A variable that can only contain the state &lsquo;true&rsquo; or &lsquo;false&rsquo;.  
- `array：`A collection of variables of unknown type. It is possible to specify the types of array members, see the chapter on arrays for more information.  
- `resource：`A file handler or other system resource as described in the PHP manual.  
- `null：`The value contained, or returned, is literally null. This type is not to be confused with void, which is the total absence of a variable or value (usually used with the @return tag).  
- `callable：`A function or method that can be passed by a variable, see the PHP manual for more information on callables.

## PHPDoc标签

|||||||
|---|---|---|---|---|---|
|@api|@author|@category|@copyright|@deprecated|@example|
|@filesource|@global|@ignore|@internal|@license|@link|
|@method|@package|@param|@property|@property-read|@property-write|
|@return|@see|@since|@source|@subpackage|@throws|
|@todo|@uses|@var|@version|
