---
title: Centos 下 mysql root 密码重置
author: 高国良
type: posts
series: false
date: 2015-08-04T11:20:00.791Z
tags: [Centos, Mysql]
description: 重置 mysql 密码的方法有很多，官网也提供了很方便的快捷操作办法。
draft: false 
cover: false
---

重置mysql密码的方法有很多，官网也提供了很方便的快捷操作办法，可参考资料[resetting permissions](https://dev.mysql.com/doc/refman/5.5/en/resetting-permissions.html)。

## 一、停止 MySQL

如果处于运行状态，需要先停止

```bash
service mysqld stop

# 输出

Shutting down MySQL.  
```

关于 `service mysqld stop` 命令，可参考[CENTOS 6.5 平台离线编译安装 Mysql5.6.22](http://www.cnblogs.com/leonkao/p/4369416.html)。

## 二、启动 MySQL_safe

如此以来便可不用密码登录MySQL

```bash
mysqld_safe --skip-grant-tables &

# 输出类似

Starting mysqld daemon with databases from /var/lib/mysql
mysqld_safe[6025]: started
```

## 三、登录 MYSQL

```bash
mysql -u root

# 输出

Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 1 to server version: 4.1.15-Debian_1-log
Type 'help;' or '\h' for help. Type '\c' to clear the buffer.
mysql>
```

四、设置新密码

```bash
mysql> use mysql;
mysql> update user set password=PASSWORD("NEW-ROOT-PASSWORD") where User='root';
mysql> flush privileges;
mysql> quit
```

五、停止MySQL

```bash
/etc/init.d/mysql stop

# 输出

Stopping MySQL database server: mysqld
STOPPING server from pid file /var/run/mysqld/mysqld.pid
mysqld_safe[6186]: ended
[1]+  Done                    mysqld_safe --skip-grant-tables
```

六、启动MySQL并测试新密码是否正确

```bash
/etc/init.d/mysql start
mysql -u root -p
```

**参考地址**

http://www.cyberciti.biz/tips/recover-mysql-root-password.html
