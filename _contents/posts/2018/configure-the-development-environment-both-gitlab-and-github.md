---
title: 配置同时使用 Gitlab 和 Github 的开发环境
author: 高国良
type: posts
series: false
date: 2018-01-24T16:21:00.791Z
tags: [git, gitlab, github, ssh]
description: Git 客户端与服务器端的通信支持多种协议，ssh 最常用。ssh的公钥登录流程：用户将自己的公钥存储在远程主机，登录时，远程主机会向用户发送一条消息，用户用自己的私钥加密后，再发给服务器。远程主机用事先存储的公钥进行解密，如果成功，就证明用户可信。 生成公私密钥 用户必须事先提供自己的公钥给服务器
draft: false 
cover: false
---

Git 客户端与服务器端的通信支持多种协议，ssh 最常用。ssh的公钥登录流程：用户将自己的公钥存储在远程主机，登录时，远程主机会向用户发送一条消息，用户用自己的私钥加密后，再发给服务器。远程主机用事先存储的公钥进行解密，如果成功，就证明用户可信。

![](http://images2017.cnblogs.com/blog/634103/201801/634103-20180124162449147-1441048241.png)

##  生成公私密钥

用户必须事先提供自己的公钥给服务器，如果没有，可以用 `ssh-keygen` 命令生成。该命令会生成两个文件（公钥 and 私钥）,默认路径在用户根目录下的`.ssh`文件夹中。

**注意：** 默认生成的文件名是 `id_rsa/id_rsa.pub`，由于这里需要两套密钥，所以需为它们分别命名，以防止互相覆盖。

执行下面命令生成密钥：

```bash
ssh-keygen -t rsa -C "注册 gitlab 账户的邮箱"
```
提示要输入名称时输入 `id_rsa_gitlab`

```bash
ssh-keygen -t rsa -C "注册 github 账户的邮箱"
```
提示要输入名称时输入 `id_rsa_github`

## 提供公钥给服务器

1. 复制 `~/.ssh/id_rsa_gitlab.pub`文件内容，进入gitlab / profile / SSH Keys，将公钥内容添加至 gitlab 。
1. 复制 `~/.ssh/id_rsa_github.pub`文件内容，进入github / setting / SSH and GPG keys / New SSH key 将公钥内容添加至 github 。

## 更新SSH配置
SSH 配置信息加载顺序如下：
1. 命令行配置参数
1. 用户级别的配置文件`~/.ssh/config`
1. 系统级别的配置文件 `/etc/ssh/ssh_config`

根据我们实际情况，更新用户级别配置信息即可，打开 SSH 客户端配置文件 `~/.ssh/config` 增加配置项，如果没有就创建一个（是文本文件）。

SSH配置项有很多，详见：https://man.openbsd.org/ssh_config 或r https://www.ssh.com/ssh/config/

在配置文件中加入以下内容

```markdown
Host github.com
    HostName github.com
    User githubuser@xyz.com
    IdentityFile ~/.ssh/id_rsa_github

Host gitlab.com
    HostName gitlab.com
    User gitlabuser@xyz.com
    IdentityFile ~/.ssh/id_rsa_gitlab
```

## 配置仓库用户信息

Git 配置信息也有三个地方可以存储，根据加载顺序依次为：

1. `/etc/gitconfig` 文件: 包含系统上每一个用户及他们仓库的通用配置。 如果使用带有 --system 选项的 git config 时，它会从此文件读写配置变量。
1. `~/.gitconfig` 或 `~/.config/git/config` 文件只针对当前用户。 可以传递 --global 选项让 Git 读写此文件。
1. 当前使用仓库的 Git 目录中的 config 文件（就是 `.git/config`）

不同仓库链接不同的服务器，所用的git用户信息也不同。可以把常用的git用户信息配置到 `~/.gitconfig` 中，不常用的我们在仓库中单独配置。以常用 gitlab 为例：

```bash
git config --global user.name "githubuser"
git config --global user.email "githubuser@xyz.com"
```

进入本地 github 仓库配置 git 用户信息

```bash
~/github$ git config --local user.name "githubuser"
~/github$ git config --local user.email "githubuser@xyz.com"
```

## 写在后面

本文地址：https://www.cnblogs.com/kelsen/p/8342239.html

如果您有任何建议或疑问请在下面留言交流。
