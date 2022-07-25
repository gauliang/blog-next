---
title: CENTOS 6.5 平台离线安装 Apache2.4
author: 高国良
type: posts
series: false
date: 2015-03-26T14:03:00.791Z
tags: [centos,apache, Linux]
description: 下载、解压、处理依赖、编译、添加服务
draft: false 
cover: false
---

## 一、下载

- http://httpd.apache.org/download.cgi
- http://mirrors.cnnic.cn/apache//httpd/httpd-2.4.10.tar.gz

解决依赖关系的包

- http://www.eu.apache.org/dist/apr/apr-1.5.1.tar.gz
- http://www.eu.apache.org/dist/apr/apr-util-1.5.4.tar.gz
- http://softlayer-sng.dl.sourceforge.net/project/pcre/pcre/8.36/pcre-8.36.tar.gz

## 二、解压

```bash
tar -zxfhttpd-2.4.10.tar.gz
mvhttpd-2.4.10.tar.gz Apache
```

## 三、处理依赖关系

解决 apr not found 问题

```bash
tar -zxf apr-1.5.1.tar.gz
cd  apr-1.5.1  
./configure --prefix=/usr/local/apr  
make && make install  
```

解决 APR-util not found 问题

```bash
tar -zxf apr-util-1.3.12.tar.gz  
cd apr-util-1.3.12
./configure --prefix=/usr/local/apr-util -with- apr=/usr/local/apr/bin/apr-1-config  
make && make install 
```

解决pcre问题

```bash
tar -zxf pcre-8.36.tar.gz
cd  pcre-8.36
./configure --prefix=/usr/local/pcre  
make && make install
```

## 四、卸载自带的 apache

停止HTTPD服务，找到安装目了删除安装文件夹，再删除配置文件

## 五、编译安装

```bash
./configure --prefix=/usr/local/apache2 --enable-deflate --enable-expires --enable-headers --enable-modules=most --enable-so --with-mpm=worker --enable-rewrite --with-apr=/usr/local/apr --with-apr-util=/usr/local/apr-util --with-pcre=/usr/local/pcre
```

```bash
make
make install
```

## 五、卸载 Apache

源码编译安装时通过--prefix 参数指定了安装目录，先停止所有服务，把安装目录文件夹删除，然后再到/etc配置文件下删除配置文件。
然后再通过 find 命令确定一下就可以了

## 六、添加为服务

```bash
cp /usr/local/apache2/bin/apachectl /etc/rc.d/init.d/httpd
vi /etc/rc.d/init.d/httpd

# 添加(#!/bin/sh下面)
# chkconfig: 2345 50 90
# description: Activates/Deactivates Apache Web Server

# 运行chkconfig把Apache添加到系统的启动服务组里面：
# chkconfig --add httpd
# chkconfig httpd on

# 启动服务
service httpd start
```
