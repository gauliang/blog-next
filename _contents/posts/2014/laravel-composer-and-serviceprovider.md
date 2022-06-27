---
title: Laravel Composer and ServiceProvider
author: 高国良
type: posts
series: false
date: 2014-12-01T16:26:00.791Z
tags: [Laravel, Composer]
description: Composer & ServiceProvider
draft: false 
cover: false
---

Composer

1. 创建自定义类库时，按命名空间把文件夹结构组织好
2. composer.json>autoload>classmap>psr-4
3. composer dump-autoload

ServiceProvider

1. 顾名思义，服务提供器，laravel 框架里的每个模块都作为一个服务形式存在，目录位于 `vendor/laravel/framework/src/Illuminate/` 基本上每一个目录都有一个`XXXServiceProvider.php`，框架运行时根据 `app/config/app.php` 里的 `providers` 里指定要使用的服务调用对应的服务提供器完成每一个服务注册。
2. `IOC`, 通俗点解释，就像一个工具箱，出门时把你可能用到的工具(框架里的服务)放到里面(注册服务)，当你在外面干活的时候（框架运行过程中）要用到某一个工具，从工具箱（ioc容器，就是 App 类）里取出（App::make('注册时服务名')）使用即可。

参考资料：http://wenda.golaravel.com/question/234
