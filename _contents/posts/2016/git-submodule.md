---
title: Git 子模块 - submodule
author: 高国良
type: posts
series: false
date: 2016-09-29T09:15:00.791Z
tags: [git]
description: 有种情况我们经常会遇到：某个工作中的项目需要包含并使用另一个项目。 也许是第三方库，或者你 独立开发的，用于多个父项目的库。 现在问题来了：你想要把它们当做两个独立的项目，同时又想在 一个项目中使用另一个。
draft: false 
cover: false
---

有种情况我们经常会遇到：某个工作中的项目需要包含并使用另一个项目。 也许是第三方库，或者你 独立开发的，用于多个父项目的库。 现在问题来了：你想要把它们当做两个独立的项目，同时又想在 一个项目中使用另一个。

Git 通过子模块来解决这个问题。 子模块允许你将一个 Git 仓库作为另一个 Git 仓库的子目录。 它能让你将另一个仓库克隆到自己的项目中，同时还保持提交的独立。

## 开始使用子模块

```bash
git submodule add remotePath [localPath]
```

## 克隆含有子模块的项目

```bash
git clone remotePath
git submodule init      # 初始化本地配置文件
git submodule update    # 从该项目中抓取所有数据并检出父项目中列出的合适的提交。
```

## 在包含子模块的项目上工作

1. 进入子模块目录中手动抓取与合并
   - 进入子模块目录
   - `git fetch`
   - `git merger origin/master`
   - 进入主仓库目录
2. 直接在主仓库里抓取与合并子模块
   - `git submodule update --remote`
3. 在子模块上工作  
   当我们运行 git submodule update 从子模块仓库中抓取修改时，Git 将会获得这些改动并 更新子目录中的文件，但是会将子仓库留在一个称作 &ldquo;游离的 HEAD&rdquo; 的状态。 这意味着没有本 地工作分支（例如 &ldquo;master&rdquo;）跟踪改动。 所以你做的任何改动都不会被跟踪。
```bash
git checkout stable                       进入子模块并检出相应的工作分支
git submodule update --remote             从上游拉取数据
git submodule update --remote --merge     从上游拉取数据并合并
   ```
4. 发布子模块改动

> 如果我们在主项目中提交并推送但并不推送子模块上的改动，其他尝试检出我们修改的人会遇到 麻烦，因为他们无法得到依赖的子模块改动。 那些改动只存在于我们本地的拷贝中。

为了确保这不会发生，你可以让 Git 在推送到主项目前检查所有子模块是否已推送。 git push 命令接受可以设置为 `check` 或 `on-demand` 的 --recurse-submodules 参数。 如果任何提交的子模块改动没有推送那么 `check` 选项会直接使 push 操作失败。

- 提交主项目时自动检测子模块是否有未提交的改动 `git push --recurse-submodules=check`
- 提交主项目时，尝试自动推送一改动的子模块 `git push --recurse-submodules=on-demand`

## 子模块技巧

1. **子模块遍历**  
   有一个 foreach 子模块命令，它能在每一个子模块中运行任意命令。 如果项目中包含了大量子模块，这会非常有用。
1. **有用的别名**  
   你可能想为其中一些命令设置别名，因为它们可能会非常长而你又不能 设置选项作为它们的默认选项。

## 子模块的问题

例如在有子模块的项目中切换分支可能会造成麻烦。 如果你创建一个新分支， 在其中添加一个子模块，之后切换到没有该子模块的分支上时，你仍然会有一个还未跟踪的子模块目录。
