---
title: 为 Sublime Text 3059 配置 PHP 编译环境
author: 高国良
type: posts
series: false
date: 2014-06-06T00:17:00.791Z
tags: [php,development]
description: 为 sublime Text 配置 PHP 编译环境，首先要确保系统安装了PHP,并把PHP设置到环境变量里。
draft: false 
cover: false
---

关于Sublime Text 3059 的安装及汉化 请参考 http://www.xiumu.org/note/sublime-text-3.shtml

为 sublime Text 配置 PHP 编译环境，首先要确保系统安装了PHP, 并把PHP设置到环境变量里。

## 步骤

1、打开 Sublime Text - 工具 - 编译系统 - 编译新系统

2、输入编译脚本

```bash
{"cmd": ["php", "$file"],"file_regex": "^(...*?):([0-9]*):?([0-9]*)","selector": "source.php"}
```

3、Win7 存到 `C:\Users\kelson\AppData\Roaming\Sublime Text 3\Packages\User` 目录下，文件名是 `php.sublime-build`

4、新建PHP文件输入脚本，按 Ctrl+B 编译。
