---
title: Centos 下 mysql root 密码重置
author: 高国良
type: posts
series: false
date: 2015-08-04T11:20:00.791Z
tags: [php, Mysql, install]
description: 重置mysql密码的方法有很多，官网也提供了很方便的快捷操作办法，可参考资料resetting permissions。本文重置密码的具体步骤如下：一、停止MySQL（如果处于运行状态）#service mysqld stop输出Shutting down MySQL. ...
draft: false 
cover: false
---

重置mysql密码的方法有很多，官网也提供了很方便的快捷操作办法，可参考资料[resetting permissions](https://dev.mysql.com/doc/refman/5.5/en/resetting-permissions.html)。本文重置密码的具体步骤如下：

一、停止MySQL（如果处于运行状态）

```
#service mysqld stop输出Shutting down MySQL.                                       [  OK  ]
```

关于#service mysqld stop 命令，可参考[CENTOS 6.5 平台离线编译安装 Mysql5.6.22](http://www.cnblogs.com/leonkao/p/4369416.html)。

二、启动MySQL\_safe，如此以来便可不用密码登录MySQL

```
# mysqld_safe --skip-grant-tables &输出类似Starting mysqld daemon with databases from /var/lib/mysqlmysqld_safe[6025]: started
```

三、登录MYSQL

```
# mysql -u root输出Welcome to the MySQL monitor.  Commands end with ; or \g.Your MySQL connection id is 1 to server version: 4.1.15-Debian_1-logType 'help;' or '\h' for help. Type '\c' to clear the buffer.mysql>
```

四、设置新密码

```
mysql> use mysql;mysql> update user set password=PASSWORD("NEW-ROOT-PASSWORD") where User='root';mysql> flush privileges;mysql> quit
```

五、停止MySQL

```
# /etc/init.d/mysql stop输出Stopping MySQL database server: mysqldSTOPPING server from pid file /var/run/mysqld/mysqld.pidmysqld_safe[6186]: ended[1]+  Done                    mysqld_safe --skip-grant-tables
```

六、启动MySQL并测试新密码是否正确

```
# /etc/init.d/mysql start# mysql -u root -p
```

**参考地址**

http://www.cyberciti.biz/tips/recover-mysql-root-password.html
