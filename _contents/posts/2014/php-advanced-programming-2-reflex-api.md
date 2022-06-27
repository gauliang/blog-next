---
title: PHP 高级编程(2/5) - 反射 API
author: 高国良
type: posts
series: false
date: 2014-06-14T20:03:00.791Z
tags: [php, reflection]
description: PHP 5 具有完整的反射 API，添加了对类、接口、函数、方法和扩展进行反向工程的能力。 此外，反射 API 提供了方法来取出函数、类和方法中的文档注释。通过使用反射 API 可以分析其他的类、接口、方法、属性、函数和扩展。
draft: false 
cover: false
---

PHP 5 具有完整的反射 API，添加了对类、接口、函数、方法和扩展进行反向工程的能力。 此外，反射 API 提供了方法来取出函数、类和方法中的文档注释。通过使用反射 API 可以分析其他的类、接口、方法、属性、函数和扩展。下面举例展示PHP自身类 Reflection 的定义：

## 打印

```php
Reflection::export(new ReflectionClass('Reflection'));
```

结果

```php
Class [ <internal:Reflection> class Reflection ] {

  - Constants [0] {
  }

  - Static properties [0] {
  }

  - Static methods [2] {
    Method [ <internal:Reflection> static public method getModifierNames ] {

      - Parameters [1] {
        Parameter #0 [ <required> $modifiers ]
      }
    }

    Method [ <internal:Reflection> static public method export ] {

      - Parameters [2] {
        Parameter #0 [ <required> Reflector $reflector ]
        Parameter #1 [ <optional> $return ]
      }
    }
  }

  - Properties [0] {
  }

  - Methods [0] {
  }
}
```

从打印结果可以看出 export 是 Reflection 类的一个public 的静态方法，提供两个参数，一个必须提供的 reflector类型 ，另一个是可选的，bool类型。不只是export，反射API还有很多，通过这些API我们还可以查询类的元数据，动态的调用类的静态方法，反射还能被用来创建自动稳定编写系统。反射API定义了大量is和has类型的函数，它们可以用来在代码中执行条件判断。比如通过isUserDefined()来判断已经加载的类中哪些是用户定义的。

（未完待续）
