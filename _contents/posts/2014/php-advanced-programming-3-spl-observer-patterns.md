---
title: PHP 高级编程(3/5) - 使用SPL(标准PHP库)实现观察者模式
author: 高国良
type: posts
series: false
date: 2014-06-15T22:06:00.791Z
tags: [php, SPL]
description: SPL（标准PHP库 - Standard PHP Library）是 PHP5 面向对象功能中重要的部分。原文解释是这样的“The Standard PHP Library (SPL) is a collection of interfaces and classes that are meant to solve common problems”。
draft: false 
cover: false
---

SPL（标准PHP库 - Standard PHP Library）是PHP5面向对象功能中重要的部分。原文解释是这样的

> The Standard PHP Library (SPL) is a collection of interfaces and classes that are meant to solve common problems.

## SplSubject 和 SplObserver 接口

The SplSubject interface is used alongside SplObserver to implement the Observer Design Pattern.

观察者模式是一种简单的事件系统，包含了两个或更多的互相交互的类。这一模式允许某个类观察另一个类的状态，当被观察类的状态发生变化时，这个模式会得到通知。被观察的类叫 subject，负责观察的类叫做 Observer 。PHP 提供的 SplSubject 和 SplObserver 接口可用来表达这些内容。

```php
SplSubject {
    /* 方法 */
    abstract public void attach ( SplObserver $observer )
    abstract public void detach ( SplObserver $observer )
    abstract public void notify ( void )
}
```

```php
SplObserver {
    /* 方法 */
    abstract public void update ( SplSubject $subject )
}
```

这里，`SplSubject` 类维护了一个特定状态，当这个状态发生变化时，他就会调用 notify 方法，所以之前使用 attach 注册的 splobserver 实例的 update 就会被调用。这里我们实现一个简单地观察者模式的例子

```php
/**
 * Subject,that who makes news
 */
class Newspaper implements \SplSubject{
    private $name;
    private $observers = array();
    private $content;
    
    public function __construct($name) {
        $this->name = $name;
    }

    //add observer
    public function attach(\SplObserver $observer) {
        $this->observers[] = $observer;
    }
    
    //remove observer
    public function detach(\SplObserver $observer) {
        
        $key = array_search($observer,$this->observers, true);
        if($key){
            unset($this->observers[$key]);
        }
    }
    
    //set breakouts news
    public function breakOutNews($content) {
        $this->content = $content;
        $this->notify();
    }
    
    public function getContent() {
        return $this->content." ({$this->name})";
    }
    
    //notify observers(or some of them)
    public function notify() {
        foreach ($this->observers as $value) {
            $value->update($this);
        }
    }
}

/**
 * Observer,that who recieves news
 */
class Reader implements SplObserver{
    private $name;
    
    public function __construct($name) {
        $this->name = $name;
    }
    
    public function update(\SplSubject $subject) {
        echo $this->name.' is reading breakout news <b>'.$subject->getContent().'</b><br>';
    }
}

$newspaper = new Newspaper('Newyork Times');

$allen = new Reader('Allen');
$jim = new Reader('Jim');
$linda = new Reader('Linda');

//add reader
$newspaper->attach($allen);
$newspaper->attach($jim);
$newspaper->attach($linda);

//remove reader
$newspaper->detach($linda);

//set break outs
$newspaper->breakOutNews('USA break down!');

//=====output======
//Allen is reading breakout news USA break down! (Newyork Times)
//Jim is reading breakout news USA break down! (Newyork Times)
```

上例中我们通过数组存储 observer 对象，使用数组及可能会出现两个问题:

1. 同一个 observer 可能会被加载多次，导致多次调用同一个对象的 update 方法。
1. detach 中需要通过迭代或者搜索数组来找到要删除的 observer 对象，导致运行效率降低。

## SplObjectStorage 类

PHP5 提供了 SplObjectStorage 类，在这里我们可以用来存储 observer 对象，SplObjectStoraged 的实例就像一个数组，
但是他所存放的对象是唯一的。SplObjectStorage 还可以使用 detach 直接从集合中删除指定的对象而不用遍历或搜索整个集合。
下面看一个 SplObjectStorage 的例子：

```php
 $ObjectStorage = new SplObjectStorage();

 class classa
 {
     #code...
 }

 class classb
 {
    #code...
 }

$a = new classa();
$b = new classb();

$ObjectStorage->attach($a);
$ObjectStorage->attach($b);
$ObjectStorage->attach($a);


foreach ($ObjectStorage as $key => $item) {
    echo ($key+1).'、'.(new ReflectionClass($item))->getName()."\n";
}
//output
  1、classa
  2、classb
  [Finished in 0.1s]
```

上例中我们可以看到，在 ObjectStorage 这个集合中只有 1 个 calssa，尽管我们添加了两次。并且冲集合中删除一个元素也变得极为简单，
拿上面的代码来说，只需使用`$ObjectStorage->attach($a)` 即可轻松的将`$a`从集合中移除。

结合 SplObjectStorage 我们再来修改最上面那个观察者模式的例子

```php
/**
 * Subject,that who makes news
 */
class Newspaper implements \SplSubject{
    private $name;
    private $observers;
    private $content;
    
    public function __construct($name) {
        $this->name = $name;
        $this->observers = new SplObjectStorage();
    }

    //add observer
    public function attach(\SplObserver $observer) {
        $this->observers -> attach($observer);
    }
    
    //remove observer
    public function detach(\SplObserver $observer) {
        $this->observers -> detach($observer);
    }
    
    //set breakouts news
    public function breakOutNews($content) {
        $this->content = $content;
        $this->notify();
    }
    
    public function getContent() {
        return $this->content." ({$this->name})";
    }
    
    //notify observers(or some of them)
    public function notify() {
        foreach ($this->observers as $value) {
            $value->update($this);
        }
    }
}

/**
 * Observer,that who recieves news
 */
class Reader implements SplObserver{
    private $name;
    
    public function __construct($name) {
        $this->name = $name;
    }
    
    public function update(\SplSubject $subject) {
        echo $this->name.' is reading breakout news '.$subject->getContent()."\n";
    }
}

$newspaper = new Newspaper('Newyork Times');

$allen = new Reader('Allen');
$jim = new Reader('Jim');
$linda = new Reader('Linda');

//add reader
$newspaper->attach($allen);
$newspaper->attach($jim);
$newspaper->attach($linda);

//remove reader
$newspaper->detach($linda);

//set break outs
$newspaper->breakOutNews('USA break down!');

//=====output======
//Allen is reading breakout news USA break down! (Newyork Times)
//Jim is reading breakout news USA break down! (Newyork Times)
```
