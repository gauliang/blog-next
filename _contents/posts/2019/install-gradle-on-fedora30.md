---
title: Fedora 30 安装 Gradle
author: 高国良
type: posts
series: false
date: 2019-05-12T15:07:00.791Z
tags: [Gradle,java,linux]
description: 当前的 Gradle 最新版本是5.4.1。您可以从发布页面下载所有 Gradle 版本的二进制文件和查看文档。 先决条件 Gradle 能够在所有主流操作系统上运行，只要具备 Java JDK/JRE 环境即可，Java 版本必须为 8或更高。 安装 1、下载 Gradle 目前的Gradle版本
draft: false 
cover: false
---

当前的 Gradle 最新版本是5.4.1。您可以从发布页面下载所有 Gradle 版本的二进制文件和查看文档。

## 先决条件

Gradle 能够在所有主流操作系统上运行，只要具备 Java-JDK/JRE 环境即可，Java 版本必须为 8或更高。

```bash
# 要检查 Java 环境及版本新
$ java -version
java version "1.8.0_121"
```

## 安装

### 1、下载 Gradle 

目前的Gradle版本是版本5.4.1，于2019年4月26日发布。官网提供两个分发版本供选择：

- [仅二进制文件](https://gradle.org/next-steps/?version=5.4.1&format=bin)
- [完整版，含文档和源代码文档](https://gradle.org/next-steps/?version=5.4.1&format=all)

### 2、解压文件

```bash
$ sudo mkdir /opt/gradle
$ sudo unzip -d /opt/gradle gradle-5.4.1-bin.zip
```
### 3、配置系统环境

```bash
 $ export PATH=$PATH:/opt/gradle/gradle-5.4.1/bin
$ gradle -v
------------------------------------------------------------
Gradle 5.4.1
------------------------------------------------------------

Build time:   2019-04-26 08:14:42 UTC
Revision:     261d171646b36a6a28d5a19a69676cd098a4c19d

Kotlin:       1.3.21
Groovy:       2.5.4
Ant:          Apache Ant(TM) version 1.9.13 compiled on July 10 2018
JVM:          1.8.0_212 (Oracle Corporation 25.212-b04)
OS:           Linux 5.0.13-300.fc30.x86_64 amd64
```
