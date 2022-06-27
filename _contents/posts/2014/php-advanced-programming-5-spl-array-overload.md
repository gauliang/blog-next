---
title: PHP 高级编程(5/5) - SPL 数组重载
author: 高国良
type: posts
series: false
date: 2014-06-17T00:52:00.791Z
tags: [php, SPL, array]
description: ArrayAccess 接口是对象的行为看起来像个数组，定义了四个方法。
draft: false 
cover: false
---

## ArrayAccess 接口

ArrayAccess 接口是对象的行为看起来像个数组，定义了四个方法。接口概要如下：

```php
ArrayAccess {
/* Methods */
abstract public boolean offsetExists ( mixed $offset )
abstract public mixed offsetGet ( mixed $offset )
abstract public void offsetSet ( mixed $offset , mixed $value )
abstract public void offsetUnset ( mixed $offset )
}
```

ArrayAccess 接口自身没有提供计算书组重元素数量的功能，如果要计算数量可以通过实现 Countble 接口。这个接口包含了一个 `count()` 方法，并且返回元素的数量。

```php
class MyArray implements ArrayAccess
{
    protected $_arr;
    
    public function __construct()
    {
        $this->_arr = array();
    }

    public function offsetSet($offset, $value)
    {
        $this->_arr[$offset] = $value;
    }

    public function offsetGet($offset)
    {
        return $this->_arr[$offset];
    }


    public function offsetExists($offset)
    {
        return array_key_exists($offset, $this->_arr);
    }

    public function offsetUnset($offset)
    {
        unset($this->_arr[$offset]);
    }
}

$MyArray = new MyArray();
$MyArray['first'] = 'test';
echo $MyArray['first'];
unset($MyArray['first']);
```

## ArratObject 类介绍

ArrayObject 类是一个 ArrayAccess 接口的实现类，它提供了迭代功能，以及很多用来排序和处理数据的非常有用的方法。

```php
ArrayObject implements IteratorAggregate , ArrayAccess , Serializable , Countable {
/* Constants */
const integer STD_PROP_LIST = 1 ;
const integer ARRAY_AS_PROPS = 2 ;
/* Methods */
public __construct ([ mixed $input = [] [, int $flags = 0 [, string $iterator_class = "ArrayIterator" ]]] )
public void append ( mixed $value )
public void asort ( void )
public int count ( void )
public array exchangeArray ( mixed $input )
public array getArrayCopy ( void )
public int getFlags ( void )
public ArrayIterator getIterator ( void )
public string getIteratorClass ( void )
public void ksort ( void )
public void natcasesort ( void )
public void natsort ( void )
public bool offsetExists ( mixed $index )
public mixed offsetGet ( mixed $index )
public void offsetSet ( mixed $index , mixed $newval )
public void offsetUnset ( mixed $index )
public string serialize ( void )
public void setFlags ( int $flags )
public void setIteratorClass ( string $iterator_class )
public void uasort ( callable $cmp_function )
public void uksort ( callable $cmp_function )
public void unserialize ( string $serialized )
}
```
