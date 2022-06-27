---
title: PHP 面向对象编程和设计模式 (3/5) - 单例模式和工厂模式
author: 高国良
type: posts
series: false
date: 2014-06-11T10:40:00.791Z
tags: [php, static, self]
description: 设计模式（Design pattern）是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了可重用代码、让代码更容易被他人理解、保证代码可靠性。 毫无疑问，设计模式于己于他人于系统都是多赢的；设计模式使代码编制真正工...
draft: false 
cover: false
---

PHP高级程序设计 学习笔记 2014.06.11

设计模式（Design pattern）是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了可重用代码、让代码更容易被他人理解、保证代码可靠性。 毫无疑问，设计模式于己于他人于系统都是多赢的；设计模式使代码编制真正工程化；设计模式是软件工程的基石脉络，如同大厦的结构一样。

## 单例模式

当需要保证某个对象只能有一个实例的时候，单例模式非常有用。它把创建对象的控制权委托到一个单一的点上，任何时候应用程序都只会仅有一个实例存在。单例类不应该可以在类的外部进行实例化一个单例类应该具备以下几个要素。

必须拥有一个访问级别为 private 的构造函数，有效防止类被随意实例化。

必须拥有一个保存类的实例的静态变量。

必须拥有一个访问这个实例的公共的静态方法，该方法通常被命名为 GetInstance()。

必须拥有一个私有的空的__clone方法，防止实例被克隆复制。

下面用一个简单的单例类的例子来说明

```php
class ClassName
{

    public static $_instance;
    
    private function __construct()
    {
        # code...
    }

    private function __clone()
    {
        # empty
    }

    public static function GetInstance()
    {
        if(!(self::$_instance instanceof self))
        {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function SayHi()
    {
        echo "Hi boy!";
    }
}

$App= ClassName::GetInstance();
$App->SayHi();

/**
 *
 * Output
 *
 * Hi boy! 
 *
 */
```

## 简单工厂模式

当你有大量的实现同一接口的类的时候，在合适的时候实例化合适的类，如果把这些 new 分散到项目的各个角落，不仅会使业务逻辑变的混乱并且使得项目难以维护。这时候如果引进工厂模式的概念，就能很好的处理这个问题。我们还可以通过应用程序配置或者提供参数的形式让工厂类为我们返回合适的的实例。

工厂类，它把实例化类的过程放到各工厂类里头，专门用来创建其他类的对象。工厂模式往往配合接口一起使用，这样应用程序就不必要知道这些被实例化的类的具体细节，只要知道工厂返回的是支持某个接口的类可以很方便的使用了。下面简单举例说明下工厂类的使用。

```php
interface ProductInterface
{
    public function showProductInfo();
}

class ProductA implements ProductInterface
{
    function showProductInfo()
    {
        echo 'This is product A.';
    }
}
class ProductB implements ProductInterface
{
    function showProductInfo()
    {
        echo 'This is product B.';
    }
}

class ProductFactory
{
    public static function factory($ProductType)
    {        
        $ProductType = 'Product' . strtoupper($ProductType);
        if(class_exists($ProductType))
        {
            return new $ProductType();
        }
        else
        {
            throw new Exception("Error Processing Request", 1);
            
        }
        
    }
}
//这里需要一个产品型号为 A 的对象
$x = ProductFactory::factory('A');
$x -> showProductInfo();
//这里需要一个产品型号为 B 的对象
$o = ProductFactory::factory('B');
$o -> showProductInfo();//都可以调用showProductInfo方法，因为都实现了接口 ProductInterface.
```

## 小结

模式就像是软件工程的基石脉络像大厦的设计图纸一样，这里接触了两种模式：单例模式和工程模式。单例类中存在一个静态变量保存着自身的一个实例，并且提供了获取这个静态变量的静态方法。单例类还应该把构造函数和clone函数标记为私有的，防止破换实例的唯一性。工厂模式根据传入的参数或程序的配置来创建不同的类型实例，工厂类返回的是对象，工厂类在多态性编程实践中是至关重要的。
