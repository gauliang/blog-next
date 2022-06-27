---
title: nginx+php 在windows下的简单配置安装
author: 高国良
type: posts
series: false
date: 2014-07-12T23:26:00.791Z
tags: [php, Apache, Nginx]
description: nginx+php 在windows下的简单配置安装
draft: false 
cover: false
---

## 开始前的准备

PHP安装包下载：http://windows.php.net/downloads/releases/php-5.5.14-Win32-VC11-x86.zip

Nginx 下载地址：http://nginx.org/download/nginx-1.6.0.zip

RunHiddenConsole 下载：http://www.yx.lvruan.com:8080/uploadFile/2012/RunHiddenConsole.zip

注：下载时一定选择windows版本

## 约定

安装目录：C:/service/

PHP目录：C:/service/php

web目录：C:/service/wwwroot

nginx目录：C:/service/nginx

PHP版本：php-5.5.14-Win32-VC11-x86

nginx版本：nginx/Windows-1.6.0

## 安装 PHP

1、解压下载到的安装包到C:/service/php

2、修改配置文件，由于是测试环境，复制php.ini-development 并打开编辑如下几个地方。

```ini
;设置以下几个选项为1
cgi.force_redirect = 1
cgi.fix_pathinfo=1
fastcgi.impersonate = 1
cgi.rfc2616_headers = 1

;配置扩展库目录
extension_dir = "C:service\php\ext"

;开启一些常用的扩展库，去掉分行即可
extension=php_pdo.dll
extension=php_pdo_mysql.dll
extension=php_gd2.dll
extension=php_mbstring.dll
extension=php_mysql.dll
extension=php_mysqli.dll
```

3、保存配置文件为php.ini

## 安装 nginx

1、解压Nginx到C:/service/nginx目录

2、配置nginx以FastCfi方式运行PHP脚本，打开C:/service/nginx/conf/nginx.conf

```conf
location / {
    root html;
    index index.html index.htm;
}

#修改为

location / {
    root   c:/service/wwwroot;
    index  index.html index.htm;
}

#找到章节 pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000 修改如下
location ~ \.php$ {
    root           c:/service/wwwroot;
    fastcgi_pass   127.0.0.1:9000;
    fastcgi_index  index.php;
    fastcgi_param  SCRIPT_FILENAME  c:/service/wwwroot$fastcgi_script_name;
    include        fastcgi_params;
}
```

## 启动运行环境

1、启动fast-cgi

```bash
php-cgi.exe -b 127.0.0.1:9000 -c c:/service/php/php.ini
```

2、启动nginx，双击c:/service/nginx/nginx.exe即可

3、新建PHP脚本文件保存为index.php，内容如下

```php
<?php  phpinfo();?>
```

4、浏览器输入http://127.0.0.1,如果现实PHP信息，则环境配置成功。

## 建立快速启动与关闭脚本

nginx的启动双击一下就可以，php fast-CGI启动就比较麻烦了，要敲一堆的参数，刻意通过建立批处理脚本来应对这个问题。该脚本需要用到RunHiddenConsole.exe

复制RunHiddenConsole.exe文件到C:\\service\\下，然后在目录下新建 start\_server.bat 和stop\_server.bat

启动服务器-start\_server.bat

```bash
@echo offecho starting PHP FastCGI...RunHiddenConsole c:/service/php/php-cgi.exe -b 127.0.0.1:9000 -c c:/service/php/php.iniecho starting Nginx...c:/service/nginx/nginx.exe
```

关闭服务 -stop\_server.bat

```bash
@echo offecho Stopping nginx...taskkill /F /IM nginx.exe > nulecho Stopping PHP FastCGI...taskkill /F /IM php-cgi.exe > nulexit 
```

## 总结

至此，php+nginx的配置结束了，我们可以把service 文件就打个包，如果要在另外一台电脑使用，可以直接解压到C盘，然后用我们的批处理文件启动即可。
