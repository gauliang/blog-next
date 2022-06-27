---
title: 在 Laravel 中使用图片处理库 Integration/Image
author: 高国良
type: posts
series: false
date: 2014-12-16T17:40:00.791Z
tags: [php, laravel, image]
description: Integration/Image 是一个图片处理的库，其功能强大到���以处理你的几乎所有图片处理需求。本文介绍其在laravel框架下的安装与基本使用。
draft: false 
cover: false
---

## 系统需求

* PHP >= 5.3
* Fileinfo Extension
* GD Library (>=2.0) 
* Imagick PHP extension (>=6.5.7)

## 安装部署 Integration-image

在 composer.json [require] 节增加，之后执行 composer update

```json
"intervention/image": "2.0.15"
```

## Laravel 配置

安装部署 Integration/image 完成后，打开配置文件 config/app.php 在相应位置添加代码，然后 Image 类就能自动加载并可供使用了。其功能强大到可以处理你的几乎所有图片处理需求。

```php
//服务提供器
'Intervention\Image\ImageServiceProvider'

//别名配置
'Image' => 'Intervention\Image\Facades\Image'
```

## 配置设置

默认情况下， `Integration/Image` 使用PHP的GD库扩展。如果你想切换到 `imagick`，你可以使用 `php artisan` 创建一个配置文件以添加相应的配置。

```bash
$ php artisan config:publish intervention/imag
```

## 基本使用

这里列出几个基本功能，更详细使用说明请查看相关接口文档。  

1、显示一张图片

```php
Route::get('/', function()
{
       $img = Image::make('foo.jpg')->resize(300, 200);
       return $img->response('jpg');
});
```

2、读取一个图片文件

```php
$img = Image::make('foo/bar/baz.jpg');
```

3、绘制一张图片

```php
$img = Image::canvas(800, 600, '#ccc');
```

4、编辑一张图片

```php
$img = Image::make('foo.jpg')->resize(320, 240)->insert('watermark.png');
```
