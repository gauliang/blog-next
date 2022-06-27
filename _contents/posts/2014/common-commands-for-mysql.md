---
title: MySql 管理操作常用命令
author: 高国良
type: posts
series: false
date: 2014-07-10T01:44:00.791Z
tags: [mysql, password]
description: 登录、权限、用户、密码
draft: false 
cover: false
---

## 登陆mysql

```
mysql -u username -p
```

## 创建用户名配置权限

这里为该用户配置tablename表的全部权限，也可以指定

```
GRANT ALL PRIVILEGES ON database.* TO 'username'@'hostname' IDENTIFIED BY 'password';
```

## 删除用户权限

使用revoke操作

```
REVOKE ALL PRIVILEGES ON database.* FROM 'username'@'host';
```

## 删除一个用户

```
DROP USER &lsquo;username'@'host';
```

## 修改用户密码

```
SET PASSWORD FOR 'username' = PASSWORD('newpassword');
```
