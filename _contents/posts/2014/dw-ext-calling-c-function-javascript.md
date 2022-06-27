---
title: Dreamweaver 扩展开发： Calling a C++ function from JavaScript
author: 高国良
type: posts
series: false
date: 2014-11-07T23:47:00.791Z
tags: [javascript, Dreamweaver, c++]
description: After you understand how C-level extensibility works in Dreamweaver and its dependency on certain data types and functions, it's useful to know how to build a library and call a function.
draft: false 
cover: false
---

After you understand how C-level extensibility works in Dreamweaver and its dependency on certain data types and functions, it's useful to know how to build a library and call a function.

The following example requires the following five files, located in the `Dreamweaver-application-folder/Tutorial_assets/Extending` folder as archives for both the Macintosh and Windows platforms:

* The `mm_jsapi.h` header file includes definitions for the data types and functions that are described in C-level extensibility and the JavaScript interpreter.
* The `mm_jsapi_environment.h` file defines the` MM_Environment.h` structure.
* The `MMInfo.h` file provides access to the Design Notes API.
* The `Sample.c` example file defines the `computeSum()` function.
* The `Sample.mak` make file lets you build the `Sample.c` source file into a DLL with Microsoft Visual C++; Sample.mcp is the equivalent file for building a Mach-O Bundle with Metrowerks CodeWarrior and Sample.xcode is the equivalent file for Apple Xcode. If you use another tool, you can create the makefile.

## Build the DLL in Windows using VS.Net 2003

1. Use File > Open, and select Sample.mak with Files Of Type set to All Files (\*.\*). (VS.Net 2003 does not open MAK files directly). You are then prompted to verify that you want to convert the project to the new format.
2. Select Build > Rebuild Solution.

When the build operation finishes, the Sample.dll file appears in the folder that contains Sample.mak (or one of its subfolders).

## Build the DLL in Windows using Microsoft Visual C++

1. In Microsoft Visual C++, select File > Open Workspace, and select Sample.mak.
2. Select Build > Rebuild All.

When the build operation finishes, the Sample.dll file appears in the folder that contains Sample.mak (or one of its subfolders).

## Build the shared library on the Macintosh using Metrowerks CodeWarrior 9 or later

1. Open Sample.mcp.
2. Build the project (Project > Make) to generate a Mach-O Bundle.

When the build operation finishes, the Sample.bundle file appears in the folder that contains Sample.mcp.

> **Note**  
> The Mach-O Bundle that is generated can only be used in Dreamweaver 8 and later. Earlier versions of Dreamweaver do not recognize it.

## Build the shared library on the Macintosh using Apple Xcode 1.5 or later

1. Open Sample.xcode.
2. Build the project (Build > Build) to generate a Mach-O Bundle.

When the build operation finishes, the Sample.bundle file appears in the build folder that is next to the Sample.xcode file.

> **Note**  
> The Mach-O Bundle that is generated can only be used in Dreamweaver 8 and later. Earlier versions of Dreamweaver do not recognize it.

## Call the computeSum() function from the Insert Horizontal Rule object

1. Create a folder called JSExtensions in the Configuration folder within the Dreamweaver application folder.
2. Copy Sample.dll (Windows) or Sample.bundle (Macintosh) to the JSExtensions folder.
3. In a text editor, open the HR.htm file in the `Configuration/Objects/Common` folder.
4. Add the line alert(Sample.computeSum(2,2)); to the `objectTag()` function, as shown in the following example:

```c
function objectTag() {
    // Return the html tag that should be inserted
    alert(Sample.computeSum(2,2));
    return "<HR>"; 
}
```

5. Save the file and restart Dreamweaver.

To execute thecomputeSum()function, select Insert > HTML > Horizontal Rule.

A dialog box that contains the number 4 (the result of computing the sum of 2 plus 2) appears.



- 标题：Calling a C function from JavaScript
- 原址：http://helpx.adobe.com/dreamweaver/extend/calling-c-function-javascript.html
