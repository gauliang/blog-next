---
title: Dreamweaver 扩展开发：C-level extensibility and the JavaScript interpreter
author: 高国良
type: posts
series: false
date: 2014-11-08T00:10:00.791Z
tags: [Dreamweaver, c]
description: The C code in your library must interact with the Dreamweaver JavaScript interpreter at the following different times__ERR__At startup, to register the libr...
draft: false 
cover: false
---

## Overview

The C code in your library must interact with the Dreamweaver JavaScript interpreter at the following different times:

* At startup, to register the library's functions
* When the function is called, to parse the arguments that JavaScript is passing to C
* Before the function returns, to package the return value

To accomplish these tasks, the interpreter defines several data types and exposes an API. Definitions for the data types and functions that are listed in this section appear in the mm_jsapi.h file. For your library to work properly, you must include the mm_jsapi.h file with the following line at the top of each file in your library:

```c
#include "mm_jsapi.h"
```

Including the mm_jsapi.h file includes, in turn, mm_jsapi_environment.h, which defines the MM_Environment structure.
