---
title: PHP 面向对象编程和设计模式 (1/5) - 抽象类、对象接口、instanceof 和契约式编程
author: 高国良
type: posts
series: false
date: 2014-06-09T01:31:00.791Z
tags: [php]
description: 本文将介绍抽象类、接口和一种称为契约式编程的技术。使用这些 OPP 机制，所编写的代码就不限于只能计算或者输出内容了。这些机制能够在概念层次上定义类之间交互作用的规则，也为应用程序的扩展和定制提供了基础。
draft: false 
cover: false
---

PHP高级程序设计 学习笔记 2014.06.09

## 什么是面向对象编程

面向对象编程（Object Oriented Programming，OOP）是一种计算机编程架构。OOP 的一条基本原则是计算机程序是由单个能够起到子程序作用的单元或对象组合而成。OOP 达到了软件工程的三个主要目标：重用性、灵活性和扩展性。为了实现整体运算，每个对象都能够接收信息、处理数据和向其它对象发送信息。

## PHP中的抽象类

PHP 5 支持抽象类和抽象方法。定义为抽象的类不能被实例化。任何一个类，如果它里面至少有一个方法是被声明为抽象的，那么这个类就必须被声明为抽象的。被定义为抽象的方法只是声明了其调用方式（参数），不能定义其具体的功能实现。在类的声明中使用 abstract 修饰符可以将某个类声明为抽象的。

可以这样理解，抽象类作为一个基类，它把特定的细节留给继承者来实现。通过抽象概念，可以在开发项目中创建扩展性很好的架构。

```php
abstract class AbstractClass{
    code...
}
```

## 抽象类的抽象方法

使用 abstract 关键字定义抽象方法。抽象方法只保留方法原型(方法的定义中剔除了方法体之后的签名），它包括存取级别、函数关键字、函数名称和参数。他不包含（{}）或者括号内部的任何代码。例如下面的代码就是一个抽象方法定义：

```php
abstract public function prototypeName($protoParam);
```

继承一个抽象类的时候，子类必须定义父类中的所有抽象方法；另外，这些方法的访问控制必须和父类中一样（或者更为宽松）。此外方法的调用方式必须匹配，即类型和所需参数数量必须一致。

## 关于抽象类

1. 某个类只要包含至少一个抽象方法就必须声明为抽象类
2. 声明为抽象的方法，在实现的时候必须包含相同的或者更低的访问级别。
3. 不能使用 new 关键字创建抽象类的实例。
4. 被声明为抽象的方法不能包含函数体。
5. 如果将扩展的类也声明为抽象类，在扩展抽象类时，可以不用实现所有的抽象方法。（如果某个类从抽象类继承，当它没有实现基类中所声明的所有抽象方法时，它就必须也被声明为抽象的。）

## 使用抽象类

```php
abstract class Car
{    
    abstract function getMaxSpeend();
}

class Roadster extends Car
{
    public $Speend;

    public function SetSpeend($speend = 0)
    {
        $this->Speend = $speend;
    }
    public function getMaxSpeend()
    {
        return $this->Speend;
    }
}

class Street
{
    public $Cars ;
    public $SpeendLimit ;

    function __construct( $speendLimit = 200)
    {
        $this -> SpeendLimit = $speendLimit;
        $this -> Cars = array();
    }
    
    protected function IsStreetLegal($car)
    {
        if ($car->getMaxSpeend() < $this -> SpeendLimit)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public function AddCar($car)
    {
        if($this->IsStreetLegal($car))
        {
            echo 'The Car was allowed on the road.';
            $this->Cars[] = $car;
        }
        else
        {
            echo 'The Car is too fast and was not allowed on the road.';
        }
    }
}

$Porsche911 = new Roadster();
$Porsche911->SetSpeend(340);

$FuWaiStreet = new Street(80);
$FuWaiStreet->AddCar($Porsche911);

/**
 *
 * @result
 * 
 * The Car is too fast and was not allowed on the road.[Finished in 0.1s]
 *
 */
```

## 对象接口

使用接口（interface），可以指定某个类必须实现哪些方法，但不需要定义这些方法的具体内容。

接口是通过*interface*关键字来定义的，就像定义一个标准的类一样，但其中定义所有的方法都是空的。

接口中定义的所有方法都必须是公有，这是接口的特性。

接口是一种类似于类的结构，可用于声明实现类所必须声明的方法。例如，接口通常用来声明API,而不用定义如何实现这个API。

> 大多数开发人员选择在接口名称前加上大写字母I作为前缀，以便在代码和生成的文档中将其与类区别开来。

## 接口实现（implements）

要实现一个接口，使用*implements*操作符（继承抽象类需要使用 extends 关键字不同），类中必须实现接口中定义的所有方法，否则会报一个致命错误。类可以实现多个接口，用逗号来分隔多个接口的名称。

1. 实现多个接口时，接口中的方法不能有重名。
2. 接口也可以继承，通过使用 extends 操作符。
3. 类要实现接口，必须使用和接口中所定义的方法完全一致的方式。否则会导致致命错误。
4. 接口中也可以定义常量。接口常量和类常量的使用完全相同，但是不能被子类或子接口所覆盖。

## 使用接口的案例

```php
abstract class Car
{    
    abstract function SetSpeend($speend = 0);
}

interface ISpeendInfo
{
    function GetMaxSpeend();
}

class Roadster extends Car implements ISpeendInfo
{

    public $Speend;

    public function SetSpeend($speend = 0)
    {
        $this->Speend = $speend;
    }

    public function getMaxSpeend()
    {
        return $this->Speend;
    }
}

class Street
{

    public $Cars ;
    public $SpeendLimit ;

    function __construct( $speendLimit = 200)
    {
        $this -> SpeendLimit = $speendLimit;
        $this -> Cars = array();
    }

    protected function IsStreetLegal($car)
    {
        if ($car->getMaxSpeend() < $this -> SpeendLimit)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public function AddCar($car)
    {
        if($this->IsStreetLegal($car))
        {
            echo 'The Car was allowed on the road.';
            $this->Cars[] = $car;
        }
        else
        {
            echo 'The Car is too fast and was not allowed on the road.';
        }
    }
}


$Porsche911 = new Roadster();
$Porsche911->SetSpeend(340);

$FuWaiStreet = new Street(80);
$FuWaiStreet->AddCar($Porsche911);

/**
 *
 * @result
 * 
 * The Car is too fast and was not allowed on the road.[Finished in 0.1s]
 *
 */
```

## 类型运算符 instanceof

instanceof 运算符是 PHP5 中的一个比较操作符。他接受左右两边的参数，并返回一个boolean值。

1. 确定一个 PHP 变量是否属于某个一类 CLASS 的实例
2. 检查对象是不是从某个类型继承
3. 检查对象是否属于某个类的实例
4. 确定一个变量是不是实现了某个接口的对象的实例

```php
echo $Porsche911 instanceof Car;
//result：1

echo $Porsche911 instanceof ISpeendInfo;
//result：1
```

## 契约式编程

契约式设计或者Design by Contract (DbC)是一种设计计算机软件的方法。这种方法要求软件设计者为软件组件定义正式的，精确的并且可验证的接口，这样，为传统的抽象数据类型又增加了先验条件、后验条件和不变式。这种方法的名字里用到的&ldquo;契约&rdquo;或者说&ldquo;契约&rdquo;是一种比喻，因为它和商业契约的情况有点类似。

在编写类之前实现声明接口的一种编程实践。这种方法在保证类的封装性方面非常有用。使用契约式编程技术，我们可以在创建应用程序之前定义出视图实现的功能，这和建筑师在修建大楼之前先画好蓝图的做法非常相似。

## 总结

抽象类是使用 abstract 关键字声明的类。通过将某个类标记为抽象类，我们可以推迟实现所声明的方法。要将某个方法声明为抽象方法，只要去掉包含所有大括号的方法实体，将方法声明的代码行用分号结束即可。

抽象类不能直接实例化，他们必须被继承。

如果某个类从抽象类继承，当它没有实现基类中所声明的所有抽象方法时，它就必须也被声明为抽象的。

在接口中，我们可以声明没有方法体的方法原型，这点与抽象类很相似。他们之间的区别在于，接口不能声明任何具有方法体的方法；并且他们使用的语法也不一样。为了将揭开规则强制加到某个类上，我们需要使用implements关键字，而不是extends关键字。

有些情况下我们需要确定某个类是否是特定类的类型，或者是否实现了特定的接口。 instanceof 分成适合完成这个任务。instanceof 检查三件事情：实例是否是某个特定的类型，实例是否从某个特定的类型继承，实例或者他的任何祖先类是否实现类特定的接口。

某些语言具有从多个类继承的能力，这称为多重继承。PHP不支持多重继承。想法，他提供了为一个类声明多个接口的功能。

接口在声明类必须遵循的规则时非常有用。契约式编程技术使用这一功能来增强封装性，优化工作流。
