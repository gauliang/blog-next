---
title: CENTOS 6.5 平台离线编译安装 PHP5.6.6
author: 高国良
type: posts
series: false
date: 2015-03-27T15:34:00.791Z
tags: [php, centos]
description: 下载源码包、编译之前可能会缺少一些必要的依赖包，加载一个本地yum源安装即可，具体缺少什么回执编译过程中提示出来的。编译参数参考：英文参考：PHP 5.6 编译安装选项说明...
draft: false 
cover: false
---

## 一、下载php源码包

http://cn2.php.net/get/php-5.6.6.tar.gz/from/this/mirror

## 二、编译

编译之前可能会缺少一些必要的依赖包，加载一个本地yum源安装即可，具体缺少什么回执编译过程中提示出来的。编译参数参考：

英文参考：[PHP 5.6 编译安装选项说明](http://www.cnblogs.com/leonkao/p/4370172.html)

中文说明：http://blog.csdn.net/godmatrix/article/details/5969558

```bash
./configure --prefix=/usr/local/php --with-mysql=/usr/local/mysql  --with-mysqli=/usr/local/mysql/bin/mysql_config   --with-apxs2=/usr/local/apache2/bin/apxs --enable-sysvsem --with-curl --enable-mbregex  --enable-mbstring --with-mcrypt --with-gd --with-openssl --with-mhash --enable-sockets --with-xmlrpc --with-zlib --enable-pdo --with-pdo-mysql
```

## 三、安装

```bash
makemake install
```

## 四、配置apache

```conf
Apache 配置文件 mime_module 节增加如下配置
<IfModule mime_module>
    AddType application/x-httpd-php .php
</module>
```
```conf
如果没有LoadModule php5则增加
LoadModule php5_module        modules/libphp5.so
```

## 五、重启 Apache
