---
title: PHP 面向对象编程和设计模式 (4/5) - 异常的定义、扩展及捕获
author: 高国良
type: posts
series: false
date: 2014-06-12T01:20:00.791Z
tags: [php, Exception]
description: PHP5 增加了类似其他语言的异常处理模块。在PHP代码中所产生的异常可被 throw 语句抛出并被 catch 语句捕获。需要进行异常处理的代码都必须放入到 try 代码���内，以便捕获可能存在的异常。每个try至少对应一个 catch 块。使用多个 catch 可以捕获不同的类所产生的异常。
draft: false 
cover: false
---

PHP高级程序设计 学习笔记 2014.06.12

异常经常被用来处理一些在程序正常执行中遇到的各种类型的错误。比如做数据库链接时，你就要处理数据库连接失败的情况。使用异常可以提高我们程序的容错特性，从而使我们的应用程序更加的稳定和健壮。

## 使用异常

PHP5 增加了类似其他语言的异常处理模块。在PHP代码中所产生的异常可被 throw 语句抛出并被 catch 语句捕获。需要进行异常处理的代码都必须放入到 try 代码块内，以便捕获可能存在的异常。每个try至少对应一个 catch 块。使用多个 catch 可以捕获不同的类所产生的异常。当 try 代码块不再抛出异常或者找不到 catch 能匹配所抛出的异常时，PHP 代码就会在跳转到最后一个 catch 的后面继续执行。当然，PHP 允许在 catch 代码块内再次抛出（throw）异常。

## 预定义异常 Exception

Exception 类是所有异常的基类，我们可以通过派生 Exception 类来达到自定义异常的目的。下面的清单列出了 Exception 的基本信息。

```php
Exception {

    /* 属性 */
    protected string $message ;        //异常消息内容
    protected int $code ;            //异常代码
    protected string $file ;        //抛出异常的文件名
    protected int $line ;            //抛出异常在该文件中的行号

    /* 方法 */
    public __construct ([ string $message = "" [, int $code = 0 [, Exception $previous = NULL ]]] )    //异常构造函数
    final public string getMessage ( void )            //获取异常消息内容
    final public Exception getPrevious ( void )        //返回异常链中的前一个异常
    final public int getCode ( void )                //获取异常代码
    final public string getFile ( void )            //获取发生异常的程序文件名称
    final public int getLine ( void )                //获取发生异常的代码在文件中的行号
    final public array getTrace ( void )            //获取异常追踪信息
    final public string getTraceAsString ( void )    //获取字符串类型的异常追踪信息
    public string __toString ( void )                //将异常对象转换为字符串
    final private void __clone ( void )                //异常克隆
}
```

了解完 Exception 后，我们来尝试扩展 exception 类来实现一个自定义异常。

```php
function connectToDatabase()
{    
    if(!$link = mysql_connect("myhost","myuser","mypassw","mybd"))
    {
        throw new Exception("could not connect to the database.");
    }
}

try
{
    connectToDatabase();
}
catch(Exception $e)
{echo $e->getMessage();
}
```

这里我们抛出类一个 Exception 类型的异常，并在catch里捕获了这个异常，最终打印出了&ldquo;could not connect to the database.&rdquo;。或许你想还想显示数据库连接失败的原因信息。下面及通过扩展exception类来实现我们的自定义信息。

```php
class MyException extends Exception
{
    protected $ErrorInfo;

    //构造函里处理一些逻辑，然后将一些信息传递给基类
    public function __construct($message=null,$code=0)
    {
        $this->ErrorInfo = '自定义错误类的错误信息';
        parent::__construct($message,$code);
    }    

    //提供获取自定义类信息的方法
    public function GetErrorInfo()
    {
        return $this->ErrorInfo;
    }

    /**
     *
     *这里还可以添加异常日志,只需在上面的构造函数里调用就可以了
     *
     */

    public function log($file)
    {
        file_put_contents($fiel,$this->__toString(),FILE_APPEND);
    }
}

function connectToDatabase()
{    
    throw new MyException("ErrorMessage");
}

try
{    
    connectToDatabase();
}
catch(MyException $e)
{    
    echo $e->getMessage() . "\n";
    echo $e->GetErrorInfo();
}
```

`set_exception_handler` 设置一个用户定义的异常处理函数

当一个未捕获的异常发生时所调用的函数名称作为`set_exception_handler()`的参数。
该函数必须在调用`set_exception_handler()`之前被定义。该函数接受一个参数，该参数是一个抛出的异常对象。
这可以用来改进上边提到的异常记录日志处理。

```php
function ExceptionLogger($exception)
{
    $file='ExceptionLog.log';
    file_put_contents($fiel,$exception->__toString(),FILE_APPEND);
}

set_exception_handler(ExceptionLogger);
```

PHP 允许在 catch 代码块内再次抛出（throw）异常。

```php
try
{
    #code...
}
catch(Exception $e)
{
    if($e->getCode() == 999)
    {
        #进行一些操作
    }
    else
    {
        throw $e;
        
    }
}
```

## 总结

异常的功能非常强大，但是不以为着我们可以在项目中肆意的滥用异常机制，特别是大量使用异常日志的机制，这回大大增加系统系统开销降低应用程序的性能。
利用错误代码我们可以方便的对错误信息进行管理，当一个错误信息被多次平抛出时，使用错误代码是科学的选择。
我们甚至可以通过错误代码来让错误消息也支持多语言显示。
