---
title: NPM (node package manager) 入门 - 基础使用
author: 高国良
type: posts
series: false
date: 2015-11-10T08:06:00.791Z
tags: [gulp, npm, semver]
description: npm 是 nodejs 的包管理和分发工具。文章从几个方面对如何使用 npm 进行了大致的介绍，希望可以帮助更多对 npm 感兴趣的朋友。主包括如何安装更新配置npm、如何创建及发布软件包、什么是 scope package 等内容，对 npm 的日常使用进行了概要的介绍。文章译自 npmjs.com
draft: false 
cover: false
---

什么是npm ?

npm 是 nodejs 的包管理和分发工具。它可以让 javascript 开发者能够更加轻松的共享代码和共用代码片段，并且通过 npm 管理你分享的代码也很方便快捷和简单。

截至目前 最新的稳定版 npm 是 3.3.12

本文译自 docs.npmjs.com ，有改动。

## 一、安装 Nodejs 和更新 npm

如果你是 windows 或者 Mac 用户，安装 nodejs 的最好办法就是到官网去下载一个安装包。安装完成后在控制台输入 node -v 如果正确返回 node 版本号，则说明安装成功。

安装完 nodejs 就已经有了npm, 不过由于 nodejs 更新速度要慢于npm ，因此在一般情况下要升级你的 npm 到最新版本，输入如下命令：

```
npm install npm -g
```

如果是 Linux ，可能需要通过 sudo 以 root 权限运行。

完成后运行 `*npm -v*可查看当前 npm 版本号。`

## 二、修复 npm 相关权限问题

如果你在全局安装某个包时遇到 EACCES 错误，说明你没有权限在 npm 存放全局包文件的目录中写入文件。这里提供两个解决方案：

### 2.1、修改相关目录的权限

2.1.1、查找npm 全局包文件存储路径

```
npm config get prefix
```

2.1.2、修改权限

```
sudo chown -R `user` <directory>
```

如果你不想改变整个目录的权限，也可以更改子文件夹 lib/node_modules、bin 和 share 目录的权限。

### 2.2、修改 npm 默认的全局包存放目录到新位置

可参考官网文档说明https://docs.npmjs.com/getting-started/fixing-npm-permissions

## 三、局部安装 npm 包

npm 提供了两种包的安装形式：局部安装和全局安装。你可以通过你的项目使用情况选择如何安装。如果你的项目依赖于某个包，那么建议将改包安装到局部。其他其他条件下，比如你要在命令行工具中使用这个包，可选择在全局安装。

### 3.1、安装

安装一个 npm 包可以通过如下命令：

```
npm install package-name
```

这将会在当前位置创建一个 node_modules 文件夹(如果目录不存在)，并且下载包文件到这个目录中。安装完成后可以看到 node_modules 目录下多了个文件夹。注：一般情况下如果安装失败目录会被删除。

### 3.2、安装时如何选择包版本

如果当前目录下不存在 package.json 文件，那么当执行 install 时将默认安装包的最新版本。

如果你有一个 package.json 文件在当前目录下，则根据 文件中声明的版本进行安装。

### 3.3、使用已安装的包

一旦安装完成一个包，你就可以在你的代码中使用它。例如：你创建了一个 Node module 并使用它。

安装完 lodash 后，创建一个文件 index.js 然后输入下面代码：

```
var lodash = require('lodash'); var output = lodash.without([1, 2, 3], 1);console.log(output);
```

执行 *node index.js* 它将会输出 \[2,3\]

### 3.4、使用 package.json 和 --save 标志

另一个管理本地 npm package 的方法是在本地目录创建一个 package.json 文件。如果你有 package.json 文件在项目根目录，那么当执行 install 时 npm 会检查依赖并为其选择合适的版本进行安装。这会使你的依赖环境具备可重复性，意味着你可以与其他开发人员分享。

在你的项目目录中创建 package.json 文件并输入以下内容：

```js
{
    "name": "demo-app",
    "version": "1.0.0"
}
```

使用 --save 标志下载一个包

```bash
npm install lodash --save
```

这将会在下载包文件之前修改 package.json 文件的依赖关系字段。现在打开刚才创建的 package.json 文件我们会发现多了个 dependencies 字段。

### 3.5、手动添加依赖关系到 package.json

你也可以手动添加依赖关系到 package.json，例如：

```json
{
    "name": "demo-app",
    "version": "1.0.0",
    "dependencies": {
        "lodash": "^2.4.1",
        "tap": "*"
    }
}
```

运行 *npm install* ,执行结束后，你会发现node_modules 里包含 lodash 和 tap 这两个包。

需要注意的是，如果某个软件包已被安装，即使满足 package.json 的语义化版本规则，npm install 也并不会更新到最新版本。

因此，可靠地重新安装所有软件包到满足 package.json 语义化版本规则的最新版本的办法是删除 node_modules文件夹 并运行 npm install

## 四、更新局部安装的软件包

我们项目所依赖的包可能会定期或不定期的进行更新，如果我们要使用更新后的新特性就需要更新本地已安装的软件包到新版本。

只需在包含 package.json 的目录中运行 npm update 即可。通过npm outdated 可以检测包的当前版本和最新版本，通过他可以看到哪些包是过时的，但它并不会对本地软件包进行任何更改。

## 五、卸载本地已安装的软件包

你可以通过 npm uninstall package 命令卸载本地安装的软件包

```bash
npm uninstall lodash
```

如果要在卸载的同时从 package.json 依赖关系中解除依赖，可以通过使用 --save 标志

```bash
npm uninstall --save lodash
```

## 六、全局安装npm软件包

你可以根据自己的情况选择是否全局安装某个 npm 软件包，如果要进行全局安装可通过 npm install -g package-name 安装

```bash
npm install -g jshint
```

如果提示 EACCES 错误，是因为权限问题，你可以参考前面相关章节，或者使用 sudo 切换至 root 权限

```bash
sudo npm install -g jshint
```

## 七、更新全局安装的软件包

如果要更新全局安装的软件包，可以使用 npm install -g package-name

```bash
npm install -g jshint
```

如果知道哪些软件是需要更新的可以使用 npm outdated -g --depth=0 命令

如果要更新所有已全局安装的软件包，使用 npm update -g 命令。

## 八、卸载已全局安装的软件包

要卸载已全局安装的软件包，使用 npm unistall -g package-name 命令

```bash
npm uninstall -g jshint
```

## 九、创建一个 Node.js 模块

Node.js 模块是一种可以发布到 npm 的软件包，当你要创建一个新模块，首先需要创建一个 package.json 文件。

可以通过 npm init 创建一个 package.json ，他会引导你输入一些 package.json 的字段信息。有两个选项是必须输入的，分别是模块名称和版本号。你还需要输入一个名字用来作为入口程序的名称，默认为 index.js

如果你要为作者字段添加信息，可以使用下面的格式：

```bash
Your Name <email@example.com> (http://example.com)
```

package.json 文件创建完成后，你需要创建一个文件用来在模块被加载时执行，如果你上一步使用默认名字，那么该文件名就是 index.js

在文件中添加一个函数到 exports 对象的属性

```bash
exports.printMsg = function() {  console.log("This is a message from the demo package");}
```

测试：

1. 推送你的软件包到npm
2. 在项目外创建一个空目录
3. 执行 npm install package-name
4. 创建一个 test.js 文件，require 你的包名字，然后执行上面的方法
5. 执行 node test.js , 将输出上面函数中的代码

## 十、推送软件包到npm库

你可以推送任何包含 package.json 文件的文件夹，比如一个 node module

**注册账号**

要发布软件包，你必要有一个 npm 账号，如果没有可以使用 npm adduser 创建一个。然后使用 npm login 登录。

由于网络问题，我登陆不了。

所以，更多信息请参考https://docs.npmjs.com/getting-started/publishing-npm-packages

## 十一、语义化版本号

语义化版本是一个标准，用来声明当前依赖可以在什么样的维度上有更新。

**语义化版本号发布规范**

如果一个项目发布出来，他的版本号必须从 1.0.0开始，尽管npm上的有些项目并没有遵循该标准。在此之后，版本更新应遵循一下原则：

* bug修复和其他小的改动：补丁发布，增加最后一个数字，例如1.0.1
* 增加新特性，不打破现有特性：小版本，增加中间的数字，如1.1.0
* 打破向后兼容性的变化：主要版本，增加第一个数字，例如2.0.0

更多信息请参考https://docs.npmjs.com/misc/semver

## 十二、scoped-packages

scoped 就好比是一个 nmpmodules 的命名空间。scoped-package包名字以 @ 开始，scope 就是"@"与"/"之间的部分。

```bash
@scope/project-name
```

每一个 npm 用户都拥有一个自己的 scope

```bash
@username/project-name
```

你可以从[CLI documentation](https://docs.npmjs.com/misc/scope#publishing-public-scoped-packages-to-the-public-npm-registry)获取到更多关于 scope 的详细信息。

### 12.1、更新 npm 和登陆

如果你要通过命令行登陆 npm 那么必须把 npm 升级到2.7.0以上版本。

```bash
sudo npm install -g npmnpm login
```

### 12.2、初始化一个scoped-package

通过在包名字前添加 scope 可创建一个 scoped-package

```json
{  "name": "@username/project-name"}
```

也可以通过在npm init 命令后面增加 --scope 来创建一个scoped-pacasge

```bash
npm init --scope=username
```

也可以为 npm 配置的 scope 字段添设置一个值，这样以后就可以直接使用该 scope 进行 init

```bash
npm config set scope username
```

### 12.3、发布一个 scope-package

默认状态下 scoped package包是私有的，如果要发布出去作为私有模块，你需要一个付费账号。

然而，你可以把scoped package 免费的发布为共有包，只需要在发布时配置 access 选项即可。

```bash
npm publish --access=public
```

### 12.4、使用 scope-package

要使用scope-package 需要在引用时填写完整的 scope-package 名字，类似下面的 package.json

```json
{
    "dependencies": {
        "@username/project-name": "^1.0.0" 
    }
}
```

如果要在命令行使用

```bash
npm install @username/project-name --save
```

在代码中的引用语句

```js
var projectName = require("@username/project-name")
```

## 十三、Working with npm Organizations

请参考https://docs.npmjs.com/getting-started/working-with-orgs