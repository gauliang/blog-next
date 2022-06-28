---
title: 代码复杂度
author: 高国良
type: posts
series: false
date: 2016-11-25T22:04:00.791Z
tags: []
description: 随着代码规模的增大，代码的复杂度也在增加，能够理解整个系统的人却在减少。随着模块数量的增加，集成测试变得越来越复杂，模块交互的次数也在增加。因此，出现潜在Bug的首要因素是代码的大小。 保持最小代码量的一个方法是让命令（command）和查询（query）保持分离
draft: false 
cover: false
---

随着代码规模的增大，代码的复杂度也在增加，能够理解整个系统的人却在减少。随着模块数量的增加，集成测试变得越来越复杂，模块交互的次数也在增加。因此，出现潜在Bug的首要因素是代码的大小。

保持最小代码量的一个方法是让命令（command）和查询（query）保持分离