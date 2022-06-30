---
title: Docker 安装 - Docker 与前端（一）
author: 高国良
type: posts
series: false
date: 2018-08-07T17:35:00.791Z
tags: [linux, docker]
description: Docker 作为一种新兴的虚拟化方式，跟传统的虚拟化方式相比具有众多优势。
draft: false 
cover: false
---

Docker 是一个开源的容器引擎，可以方便的对容器进行管理。作为一种新兴的虚拟化方式，跟传统的虚拟化方式相比具有众多优势。
《Docker 遇见前端》系列文章，旨在记录如何通过 docker 构建一个相对完备的前端自动化开发环境。

## Windows 系统

Windows10 操作系统自带 `windows hyper-v` 可以非常方便的运行 Docker。 在 windows7 系统上则稍微复杂一点，需通过安装 Docker-Toolbox 来使用 Docker（用 Oracle virtualbox 来取代 `Hyper-V`）。

- windows 10 安装 [Docker for Windows Installer](https://download.docker.com/win/stable/Docker%20for%20Windows%20Installer.exe)
- windows 7 安装  [Docker Toolbox](https://docs.docker.com/toolbox/overview/)

安装后，Docker 不会自动启动，要启动它请从开始菜单打开 Docker for Winodws。window7 打开 Kitematic。Kitematic 提供直观的图形用户界面（GUI）来运行 Docker 容器。

虽然在 windows7 平台通过 DockerToolbox 可以正常运行 Docker，但使用体验一般，强烈建议迁移到 Linux 平台，debian / ubuntu / fedora 等都是不错的选择。

## Linux 系统

这里以 Fedora 为例（当前最新版本为 Fedora28），简要整理一下安装过程，其他环境大同小异。

### 卸载旧版本

如果存在旧版本的 docker 则将其卸载，不存在可忽略此步骤。

```bash
$ sudo dnf remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine
```

### 安装 Docker CE

1. 安装dnf-plugins-core包，该包提供从命令行管理DNF存储库的命令。

```bash
$ sudo dnf -y install dnf-plugins-core
```

2. 设置存储库

```bash
$ sudo dnf config-manager \
    --add-repo \
    https://download.docker.com/linux/fedora/docker-ce.repo
```

3. 安装 Docker CE

```bash
$ sudo dnf install docker-ce
```

4.  启动 Docker

```bash
$ sudo systemctl start docker
```

5. 设置开机启动

```bash
$ sddo systemctl enable docker
```

7. 更新用户组

```bash
$ sudo usermod -aG docker $USER
```

注销并重新登陆后即可直接运行 `docker` 命令，而不用添加 `sudo` 前缀。

## 测试安装是否成功

```bash
docker run hello-world
```

此命令下载测试映像并在容器中运行它。当容器运行时，它会打印一条信息性消息并退出。

## 卸载 Docker CE

1. 卸载 Docker CE

```bash
$ sudo dnf remove docker-ce
```

1. 删除镜像和容器

```bash
$ sudo rm -rf /var/lib/docker
```

