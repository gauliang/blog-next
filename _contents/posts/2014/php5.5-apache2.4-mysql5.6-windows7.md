---
title: windows7 下 apache2.4 和 php5.5 及 mysql5.6 的安装与配置
author: 高国良
type: posts
series: false
date: 2014-06-05T17:44:00.791Z
tags: [php, Apache, Mysql]
description: 准备的软件、安装
draft: false 
cover: false
---

## 准备的软件

- httpd-2.4.9-win32-VC11.zip http://www.apachelounge.com/download/
- php-5.5.13-Win32-VC11-x86.zip http://www.php.net/downloads.php
- mysql-installer-community-5.6.19.0.msi http://dev.mysql.com/downloads/windows/installer/

## 本文约定

1、安装目录 `D:\server`
2、Apache安装目录 `D:\server\Apache24`
3、php安装目录 `D:\server\PHP`
4、web 根目录 `D:\server\wwwroot`

## 安装 Apache 2.4

1. 在 D 盘新建文件夹 `server`
2. 解压 `httpd-2.4.9-win32-VC11.zip`，复制文件夹 `Apache24` 到 `D:\\server` 下
3. 修改配置文件 `conf/httpd.conf`

```conf
# 找到
ServerRoot "c:/Apache24"
# 修改为
ServerRoot "D:/server/Apache24"

# 找到
#ServerName www.example.com:80
#修改为你本机的IP地址 比如
ServerName 10.0.0.8:80

# 找到
DocumentRoot "c:/Apache24/htdocs"
<Directory "c:/Apache24/htdocs">
# 修改为
DocumentRoot "D:/server/wwwroot"
<Directory "D:/server/wwwroot">

# 找到
ScriptAlias /cgi-bin/ "c:/Apache24/cgi-bin/"
<Directory "c:/Apache24/cgi-bin">
# 修改为
ScriptAlias /cgi-bin/ "D:/server/Apache24/cgi-bin/"
<Directory "D:/phpserver/Apache24/cgi-bin/">
```

4. 以管理员身份运行 CMD，切换目录到`D:/server/Apache24/bin/` 运行 `httpd -k -install`，这会创建一个名为 `Apache2.4`的系统服务。

5、拷贝`D:/server/Apache24/htdocs/index.html`到`D:/server/wwwroot` 下，浏览器访问 `http://你的IP地址/index.html`。如果显示`It works!`说明 Apache 已正常安装。

## 安装 PHP5.5

1、解压 `php-5.5.13-Win32-VC11-x86.zip`，复制文件夹 `php-5.5.13-Win32-VC11-x86` 到 `D:/server/` 下，然后命名为 `php`。
2、复制 `D:/server/php/php.ini-production` 到 `D:/server/php` 目录，然后命名为 `php.ini`
3、打开 `D:/server/php/php.ini` 并修改相关配置

```conf
# 找到
doc_root =
# 修改为
doc_root = "d:\phpserver\wwwroot"

# 找到
; extension_dir = "ext"
# 修改为
extension_dir = "d:\phpserver\php\ext"

# 找到
;date.timezone =
# 修改为
date.timezone = PRC

# 找到
;     session.save_path = "N;/path"
# 修改为
session.save_path = "d:\phpserver\temp"
```

4. 打开`D:\server\Apache24\conf\httpd.conf`，找到 DSO 部分，在后面添加代码

```conf
LoadModule php5_module "d:/phpserver/php/php5apache2_4.dll"
PHPINIDir "d:/phpserver/php"
```

5. 搜索 DirectoryIndex 添加 index.php 如下

```conf
<IfModule dir_module>
    DirectoryIndex index.html index.htm index.php
</IfModule>
```

6. 保存配置文件，然后重启 Apache2.4 服务，在 `D:/phpserver/wwwroot/` 下新建php文件，输入 `phpinfo()`， 打开浏览器访问 `http://你的IP地址/index.php`。如果正常显示 `phpinfo` 信息，则 PHP 安装成功。

## 安装 mysql5.6

安装过程我就不说了，很简单，安装完之后，注意修改 `php.ini` 去掉 `extension=php_mysql.dll` 和 `extension=php_pdo_mysql.dll` 前的注释就好。
