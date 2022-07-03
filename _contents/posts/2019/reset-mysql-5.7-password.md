---
title: MySql 5.7 重置root密码
author: 高国良
type: posts
series: false
date: 2019-05-13T18:48:00.791Z
tags: [mysql, password]
description: false
draft: false 
cover: false
---

## 一、以安全模式登录

```bash
# Stop MySQL
sudo service mysql stop

# Make MySQL service directory.
sudo mkdir -p /var/run/mysqld

# Give MySQL user permission to write to the service directory.
sudo chown mysql:mysql /var/run/mysqld

# Start MySQL manually, without permission checks or networking.
sudo mysqld_safe --skip-grant-tables &

# Log in without a password.
mysql -u root
```

## 二、修改密码

```sql
UPDATE mysql.user SET authentication_string=PASSWORD('NEW-PASSWORD'), plugin='mysql_native_password' WHERE User='root' ;
EXIT;
```

## 三、重启数据库

```
# Turn off MySQL.
sudo mysqladmin -S /var/run/mysqld/mysqld.sock shutdown

# Start the MySQL service normally.
sudo service mysql start
```
