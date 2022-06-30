---
title: 基础知识整理汇总 - Java基础（一）
author: 高国良
type: posts
series: false
date: 2018-10-04T09:05:00.791Z
tags: [java]
description: false
draft: false 
cover: false
---

java 语言规范及相关文档资源

Java源码：安装目录下 src.zip 文件
java文档：https://docs.oracle.com/en/java/
语言规范：http://docs.oracle.com/javase/specs
JAVASE文档：https://docs.oracle.com/javase/8/docs/


## 一、程序结构

```java
public class App{
    public static void main(String[] args)
    {
        System.out.println("Hello world!");
    }
}
```

`public` 是访问修饰符，声明这段代码的访问级别。在这里类 `App` 作为装载程序逻辑的容器，以驼峰命名法命名（java 区分大小写）,Java 中所有程序内容都须放置在类中。
与其他语言一样，这里的 `main` 方法是程序入口，必须存在，且是静态方法，`args` 存储来自命令行的参数。`{}`用以划分代码块，`.`用以调用方法。

## 二、数据类型

1. 数值

有两种描述数值的数据类：整型，没有小数部分的数值；浮点类型，表示有小数部分的数值。

| 类型 | 存储需求 |
| - | - |
| int | 4字节 |
| short | 2字节 |
| long | 8字节 |
| byte | 1字节 |
| float | 4 字节 |
| double | 8字节 |

2. char
3. boolean

## 三、变量

每个变量都必须声明类型，语法 `类型 变量名`。 通过 `final` 关键字声明常量，常量名使用全大写形式。

## 四、运算符

Math 类包含了各种各样的数学函数。数值类型间可以互相转换，但是要注意，由于不同类型的数值占用的存储空间不同，大空间类型转换为小空间存储类型时会有精度损失。

自增自减运算符 `++、--`；关系和bool运算符 `== 、 != 、 < 、 > 、 >= 、 <= 、 && 、 ||`；运算符之间存在优先级，配合`()`可完成更加复杂的逻辑运算。

枚举类型，适用于变量的取值需要限定在一个集合内的场景。

## 五、字符串

字符串就是字符序列，可对其进行一些复杂的操作，如裁剪/构建/检测/码点操作等。

## 六、控制流程

1. 块作用域 `{}`
1. 条件语句 `if / if - else/ if - else if`
1. 循环 `while / do - while `
1. 选择 `switch - case`
1. 中断 `break / continue`
1. 数组 遍历 `for each`；排序；多维。
