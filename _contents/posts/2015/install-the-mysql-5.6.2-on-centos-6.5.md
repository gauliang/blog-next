---
title: CENTOS 6.5 平台离线编译安装 Mysql5.6.22
author: 高国良
type: posts
series: false
date: 2015-03-26T21:18:00.791Z
tags: [Mysql, linux]
description: false
draft: false 
cover: false
---

## 一、下载源码包

http://cdn.mysql.com/archives/mysql-5.6/mysql-5.6.22.tar.gz

## 二、准备工作

卸载之前本机自带的MYSQL

安装cmake,编译MYSQL 的工具

```bash
yum install cmake
```

## 三、解压源码包

```bash
tar -zxv -f mysql-5.6.16.tar.gz  cd mysql-5.6.16
```

## 四、CMake编译

```bash
cmake \   -DCMAKE_INSTALL_PREFIX=/usr/local/mysql \   -DMYSQL_UNIX_ADDR=/usr/local/mysql/mysql.sock \   -DDEFAULT_CHARSET=utf8 \   -DDEFAULT_COLLATION=utf8_general_ci \   -DWITH_INNOBASE_STORAGE_ENGINE=1 \   -DWITH_ARCHIVE_STORAGE_ENGINE=1 \   -DWITH_BLACKHOLE_STORAGE_ENGINE=1 \   -DMYSQL_DATADIR=/jbdata/mysqldb \   -DMYSQL_TCP_PORT=3306 \   -DENABLE_DOWNLOADS=1  注：重新运行配置，需要删除CMakeCache.txt文件执行makemake安装make install
```

## 五、初始化 mysql 数据库

```bash
cd /usr/local/mysql   scripts/mysql_install_db --user=mysql --datadir=/data/mysqldb  
```

## 六、复制启动文件

To start mysqld at boot time you have to copy `support-files/mysql.server` to the right place 
for your system 
```bash
cp /usr/local/mysql/support-files/my-default.cnf /etc/my.cnf
```

## 七、复制服务启动脚本及加入PATH路径

```bash
cp support-files/mysql.server /etc/init.d/mysqld
```

修改PATH环境变量，让系统可以直接使用mysql的相关命令。

#vim /etc/profile.d/mysql.sh

export PATH=$PATH:/usr/local/mysql/bin

\-------------------------------------------------------------------------------------

```
vim /etc/profile           PATH=/usr/local/mysql/bin:/usr/local/mysql/lib:$PATH          export PATH    source /etc/profile  
```

## 八、启动mysql并加入开机启动

```
service mysqld start chkconfig --level 35 mysqld on
```

## 九、检查mysql是否启动

```
netstat -tulnp | grep 3306   mysql -u root -p  
```

## 十、设置mysql密码

```
PLEASE REMEMBER TO SET A PASSWORD FOR THE MySQL root USER !To do so, start the server, then issue the following commands:  ./bin/mysqladmin -u root password 'new-password'  ./bin/mysqladmin -u root -h localhost.localdomain password 'new-password'Alternatively you can run:  ./bin/mysql_secure_installation
```
