---
title: 在 CentOS/Fedora 下安装 JAVA 环境
author: 高国良
type: posts
series: false
date: 2019-04-04T23:43:00.791Z
tags: [centos,java]
description: 介绍 本文介绍如何在 CentOS 7（6/6.5）、 Fedora、RHEL 上安装 Java。Java是一个流行的软件平台，允许您运行Java应用程序。 本文涵盖了以下Java版本的安装： OpenJDK 8 Oracle Java 8 先决条件 在开始之前，您应该有一个能够执行 root 权限
draft: false 
cover: false
---

![](634103-20190405000319046-1615757202.png)



## 介绍
本文介绍如何在 CentOS 7（6/6.5）、 Fedora、RHEL 上安装 Java。Java是一个流行的软件平台，允许您运行Java应用程序。

**本文涵盖了以下Java版本的安装：**

- OpenJDK 8
- Oracle Java 8

## 先决条件

在开始之前，您应该有一个能够执行 root 权限命令的用户账户。

## Java的变化

Java平台有三个不同版本：标准版（SE）、企业版（EE）和微型版（ME）。本文主要关注Java SE。

可以安装两个不同的Java SE包：Java运行时环境（JRE）和Java Development Kit（JDK）。JRE是Java虚拟机（JVM）的一种实现，它允许您运行已编译的Java应用程序和applet。JDK包括JRE及开发和编译Java应用所需的其他软件。

还有两种不同的Java实现：OpenJDK 和 Oracle Java。这两种实现都基于相同的代码，但 OpenJDK（Java的参考实现）是完全开源的，而Oracle Java包含一些专有代码。

您可以在单个系统上安装各种版本的Java，但大多数人只需要安装一个版本。考虑到这一点，请尝试仅安装运行或开发应用程序所需的Java版本。

## 安装OpenJDK 8

本节介绍如何使用 dnf 包管理器安装预构建的OpenJDK 8 JRE和JDK包，这类似于Ubuntu / Debian的apt-get。

### 安装OpenJDK 8 JRE

要使用 dnf 安装OpenJDK 8 JRE，请运行以下命令：

```bash
$ sudo dnf install java-1.8.0-openjdk
```
在确认提示下，输入 y 然后 RETURN 继续安装。

### 安装OpenJDK 8 JDK

要使用 dnf 安装OpenJDK 8 JDK，请运行以下命令：

```bash
$ sudo dnf install java-1.8.0-openjdk-devel
```

在确认提示下，输入 y 然后 RETURN 继续安装。

### 安装Oracle Java 8

这一部介绍如何安装 Oracle Java 8 JRE 和 JDK（64位）。**注意：在安装Oracle Java之前，您必须接受 Java SE 的 Oracle 二进制代码许可协议，这是包含的步骤之一。**

### 安装Oracle Java 8 JRE

注意：要安装Oracle Java 8 JRE，您需要转到 Oracle Java 8 JRE 下载页面，接受许可协议，并复制相应 .rpm 软件包的下载链接。

切换到您的主目录并使用以下命令下载 Oracle Java 8 JRE RPM：

```bash
$ cd ~
$ wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://link_copied_from_site"
```
然后使用此yum命令安装RPM（如果您下载了其他版本，请在此处替换文件名）：

```bash
$ sudo yum localinstall jre-8u161-linux-x64.rpm
```

在确认提示下，输入y然后RETURN继续安装。

现在 Java 应该安装在`/usr/java/jre1.8.0_161/bin/java`，并从`/usr/java/jre1.8.0_161/bin/java`链接。

您可以删除先前下载的存档文件：

```bash
$ rm ~/jre-8u161-linux-x64.rpm
```

### 安装 Oracle Java 8 JDK

注意：要安装Oracle Java 8 JDK，您需要转到Oracle Java 8 JDK下载页面，接受许可协议，并复制相应Linux .rpm软件包的下载链接。
切换到您的主目录并使用以下命令下载Oracle Java 8 JDK RPM：

```bash
$ cd ~
$ wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://link_copied_from_site"
```

然后使用此yum命令安装RPM（如果您下载了其他版本，请在此处替换文件名）：

```bash
$ sudo yum localinstall jdk-8u161-linux-x64.rpm
```

���确认提示下，输入y然后RETURN继续安装。

现在Java应该安装在`/usr/java/jdk1.8.0_161/jre/bin/java`，并从`/usr/java/jdk1.8.0_161/jre/bin/java`链接。

您可以删除先前下载的存档文件：

```bash
$ rm ~/jdk-8u161-linux-x64.rpm
```

## 设置默认Java

如果您安装了多个版本的Java，则需要将其中的某一个设置为默认值（即用户运行java命令时将运行的版本）。此外，某些应用程序需要设置某些环境变量来定位要使用的Java安装。本节将向您展示如何执行此操作。

顺便说一句，要检查默认Java的版本，请运行以下命令：

```bash
$ java -version
```

### 使用 Alternatives

`alternatives` 命令通过符号链接管理默认命令，可用于选择默认Java命令。

要打印提供java由其管理的命令的程序alternatives，请使用以下命令：
```bash
$ sudo alternatives --config java
```
输出应该类似以下结果：

```bash
output
There are 5 programs which provide 'java'.

  Selection    Command
-----------------------------------------------
   1           java-1.7.0-openjdk.x86_64 (/usr/lib/jvm/java-1.7.0-openjdk-1.7.0.161-2.6.12.0.el7_4.x86_64/jre/bin/java)
   2           java-1.8.0-openjdk.x86_64 (/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.151-5.b12.el7_4.x86_64/jre/bin/java)
   3           /usr/lib/jvm/jre-1.6.0-openjdk.x86_64/bin/java
*+ 4           /usr/java/jre-9.0.4/bin/java
   5           /usr/java/jdk-9.0.4/bin/java




Enter to keep the current selection[+], or type selection number: 

```

只需输入选择号即可选择java默认情况下应使用的可执行文件。

### 使用环境变量

许多Java应用程序使用JAVA_HOME或JRE_HOME环境变量来确定java要使用的可执行文件。

例如，如果您安装Java在  `/usr/java/jdk1.8.0_161/jre/bin`（即可java执行文件位于/usr/java/jdk1.8.0_161/jre/bin/java），您可以设置环境变量 JAVA_HOME 在bash shell或脚本中，如下所示：
```bash
$ export JAVA_HOME=/usr/java/jdk1.8.0_161/jre
```
如果要将环境变量 JAVA_HOME 在系统上为每个用户可用，请运行以下命令：

```bash
$ sudo sh -c "echo export JAVA_HOME=/usr/java/jdk1.8.0_161/jre >> /etc/environment"
```

## 结论

恭喜，您现在可以运行和/或开发Java应用程序了！
