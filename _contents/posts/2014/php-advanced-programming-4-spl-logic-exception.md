---
title: PHP 高级编程(4/5) - SPL异常类之 LogicException 逻辑异常
author: 高国良
type: posts
series: false
date: 2014-06-16T23:34:00.791Z
tags: [php, Exception]
description: SPL 提供了一系列标准异常。日常的使用中我们应该根据需求科学的使用它们，来使我们的程序更加健壮。LogicException 是从 Exception 基类派生的，没有添加任何附加方法。抛出逻辑异常和抛出标准一次的方法类似，区别在于逻辑异常须在应用程序编写有误时才抛出。
draft: false 
cover: false
---

SPL 提供了一系列标准异常。日常的使用中我们应该根据需求科学的使用它们，来使我们的程序更加健壮。LogicException 是从 Exception 基类派生的，没有添加任何附加方法。抛出逻辑异常和抛出标准一次的方法类似，区别在于逻辑异常须在应用程序编写有误时才抛出。下面演示下 LogicException 类的使用。

```php
class App
{
    protected $_loaded = false;
    protected $_name;

    public function start()
    {
        $this->_loaded = true;
        $this->_name = 'unzin';
    }

    public function GetName()
    {
        if(!$this->_loaded)
        {
            throw new LogicException("Error Processing Request", 1);
        }
        return $this->_name;
    }
}

try
{
    $APP = new App();
    echo $APP -> GetName();
}
catch(LogicException $e)
{
    echo $e->getMessage();
}
```
