---
title: Docker 基础 -  Docker 与前端（二）
author: 高国良
type: posts
series: false
date: 2018-09-10T23:03:00.791Z
tags: [docker, linux]
description: Docker 相关的基础知识点非常多，比如基本概念，镜像管理，数据卷（容器）管理，常用命令，周边生态等等。在这里梳理出个大概框架，方便后续学习使用。
draft: false 
cover: false
---

## 一、Docker 系统架构

**守护进程**  
负责容器的创建、运行和监控，还负责镜像的构建和存储。`docker demon` 命令可启动 Docker 守护进程。

**Docker 客户端**  
通过http与 Docker 守护进程通信。与Docker守护进程通信的 API 有非常清晰的定义和文档，开发者也可以利用 API 直接和守护进程通信，而不通过 Docker 客户端。

**Docker 镜像仓库**  
默认的寄存服务为 Docker Hub, 负责镜像的存储和发布。根据实际需要，我们也可以构建和运营自己的Docker服务。

### 底层技术

**cgroups**  
负责管理容器使用的资源，如内存和CPU；

**namespaces**  
负责容器之间的隔离；确保系统的其他部分与容器的文件系统、主机名、用户、网络和进程都是分开的。

**UFS (union file system)**  
 负责存储容器的镜像层。

### 周边技术

**swarm**  
Docker 集群解决方案

**compose**  
负责构建和运行多个Docker容器所组成的应用程序的工具。主要用于开发和测试环境。

**machine**  
非Linux系统（Windows、MacOS）上的GUI，用于运行和管理Docker容器；

**Docker trusted registry**  
管理和存储Docker镜像。

**网络连接**  
overlay

**服务发现**  
consul、skyDNS

**服务编排及集群管理**  
kubernetes,swarm等等

**专门用于托管容器的操作系统**  
虽然Docker在大部分的Linux发行版本上 都运行的很好，但还是出现了一些新的发行版项目，他们只考虑需要运行容器的环境，希望做出体积小二容易管理的发行版，尤其是针对数据中心或集群的使用场景。

##  二、镜像是如何生成的

创建镜像的主要方法是通过 `Dockerfile` 和 `docker build`。

### 构建环境的上下文

命令 `docker build`需要 `Dockerfile`和`build context`。 build context 是一组本地文件和目录，他可以被 Dockerfile 的 `ADD` 和 `COPY` 指令引用，通常以目录路径的形式指定。

如果提供的URL以http开头，它会被假定位直接指向 Dockerfile ，这样做没什么用，因为该 `Dockerfile`没有与任何上下文关联。

也可以将 git 仓库作为构建环境上下文。这种情况下，Docker 客户端会将 Git 仓库 colone 到本地，然后传递给守护进程作为构建环境上下文。

还可以通过 stdin 输入构建环境的上下文，方法是在需要输入上下文的地方使用 `-` 参数。该输入可以是一个归档文件，支持 tar.gz / xz / bzip2 格式。

从构建环境的上下文中排除不必要的文件，可以使用 `.dockerignore` 文件，该文件类似 `.gitignore`。

### 镜像

Dockerfile 中的每个指令执行后都会生成一个镜像层，这个镜像层可以用来启动容器。一个新的镜像层的建立，使用上一个镜像层启动容器，然后执行 Dockerfile 中的指令，再把它保存为一个新镜像。

当 Dockerfile 执行成功后，中间的那些容器会被删掉，除非提供 `--rm=false` 参数。

由于每个指令的最终结果都只是个静态的镜像，本质上是一个文件系统以及一些元数据，因此即使指令中的持久进程，最终都会被停掉。比如你在一条指令中开启一个数据库服务的进程，但到了下一条指令，或启动容器的时候，它就已经不存在了。

如果你需要在启动容器的时候同事运行一个进程或服务，他必须从 `ENTRYPOINT` 或 `CMD` 指令中启动。

Docker 为了加快镜像构建的速度，会将每一个镜像层缓存下来。 Docker 的缓存特性能大大提高工作效率。

### 基础镜像

基于镜像分层的特点，当我们需要一个环境时，无需重头开始去构建一个镜像。最理想的做法是完全不用创建镜像，直接使用某个现有的镜像，然后把配置文件和数据挂在上去即可。
对于常用软件，比如数据库、web 服务器，这是非常可行的。一般情况下使用官方镜像比自己创建一个镜像好得多，因为其他人已经找到使得该软件以最佳方式运行在容器中的方法。

如果你需要使用一个基础镜像以运行应用程序，那么应该先检查一下，应用程序所使用的编程语言或框架是否已提供了官方的镜像。
如果只是需要一个小而完整的 Linux 发行版本，可以选择 `alpine`，他的大小仅仅 5MB 多一点，但仍提供了一个包管理器，可以轻松安装大量应用和工具。

### Dockerfile

#### Exec 与 Shell 的对比

一些指令（`RUN`、`CMD`、`ENTRYPOINT`）能够接受 shell 和 exec 这两种格式。
exec 格式需要用到一个JSON数组，如：["executable","param1","param2"]，其中第一个元素是可执行文件，其他元素是他执行时所使用的参数。
shell 格式使用的是自由形式的字符串，字符串会传给 `/bin/sh -c` 执行。
exec格式适用于需要规避 shell 对字符串做出错误解析的情况，或者当径向力没有包含 `/bin/sh` 时。

#### 常用指令

这些指令在 Docker 网站上都可以找到非常详细的说明文档，随着 Docker 的持续发展，文档也会有调整，下列指令描述如果与官方文档不一致，请以官网文档为准。

**ADD**  
从构建环境上下文或远程URL将文件复制至镜像。如果是从一个本地路径添加一个压缩文件，他会被自动解压。

**CMD**  
当容器启动执行时执行特定的指令。如果还定义了 ENTRYPOINT , 该指令将被解释为 ENTRYPOINT 的参数（这时候请确保使用的是 exec 格式）。
CMD指令也会被 `docker run` 命令中镜像名称后面的参数覆盖。加入定义了多个 CMD，只有最后一个会生效。

**COPY**  
从构建环境上下文复制文件至镜像。它有两种形式，COPY src dest 或 COPY ["SRC","DEST"]，如果路径中有空格的话，必须使用第二种格式。

**ENTRYPOINT**  
设置一个在容器启动时运行的可执行文件（以及默认参数）。任何CMD指令或 `docker run` 命令中镜像名称之后的参数，将作为参数传递给这个可执行文件。
ENTRYPOINT 指令通常用于提供“启动”脚本，目的是在解析参数之前，对变量和服务进行初始化。

**ENV**  
设置镜像内的环境变量。这些变量可以被随后的指令应用。

**EXPOSE**  
向 Docker 表示该容器将会有一个进程监听所指定的端口。提供这个信息的目的是用于连接容器或在执行 `docker run` 命令式通过 -p 参数把端口发布出来； EXPOSE 本身不会对网络有实质性的改变。

**FROM**  
设置 Dockerfile 使用的基础镜像；随后的指令将基于该镜像之上。 FROM 必须为 Dockerfile 的第一条指令。

**MAINTAINER**  
设置镜像维护者的姓名和联系方式

**ONBUILD**  
指定当镜像被用作另一个镜像的基础镜像时将会执行的指令。

**RUN**
在容器内执行指定的指令，并把结果保存下来。

**USER**  
设置任何后续的 RUN、CMD 或 ENTRYPOINT 指令执行时所用的用户（用户名或UID）。

**VOLUME**　
指定为数据卷的文件或目录。如果该文件或目录已经在镜像中存在，那么当容器启动时，他就会被复制到这个卷。如果提供了多个参数，那么就将被解释成多个数据卷。

**WORKDIR**  
对任何后续的 RUN、CMD、ENTRYPOINT、ADD、COPY 指令设置的工作目录。这个指令可多次使用。

## 三、外部可访问 && 端口转发

假设你在容器中运行一个 Nginx web 服务器，你如何使外界可以访问他呢？通过 `-p` 或 `-P` 选项来发布端口。比如：
```bash
$docker run -d -p 8000:80 nginx
```
容器启动后，我们可以通过 `localhost:8000` 访问到容器内的 web 服务。其中 `-p 8000:80` 参数告诉 Docker 将主机的 8000 端口转发到容器的 80 端口。或者可以使用 `-P` 参数来告诉 Docker 自动选择一个主机上未使用的端口。

## 四、数据卷 && 数据容器

数据卷，是一个目录，但并不属于UFS的一部分，它只是在主机上被绑定挂在到容器的一个普通目录。有三种方式可以挂载数据卷：

执行 Docker 时，通过 `-v` 选项来指定数据卷
```bash
docker run -it --name test -v /data debian /bin/bash
```

通过 Dockerfile 的 VOLUME 命令
```bash
FROM debian
VOLUME /data
```

指定数据卷要绑定的主机目录
```bash
docker run -v /home/data:/data debian ls /data
```
这个例子把主机的 /home/data 目录绑定到容器的 /data 目录，容器能够使用主机 /home/data 目录下的文件。

在执行 `docker run` 命令时，我们通过传入 `--volumes-from container` 参数可以实现容器间的数据共享。一个常用的做法是，创建数据容器，这种容器的唯一目的就是与其他容器分享数据。

## 五、Docker 常用命令

1. **docker build** 从dockerfile构建镜像。
1. **docker images** 列出所有本地镜像。
1. **docker run** 这是一个相对复杂的命令，支持非常多参数。
1. **docker attach** 查看容器内主进程，并与之交互
1. **docker create** 创建容器但不启动运行
1. **docker exec** 在同期中运行一个命令
1. **docker rm** 删除一个或多个容器

常用命令还有很多，可查阅 `http://docs.docker.com` 的完整释义，也可以在命令行通过 `--help` 参数查看具体使用说明。

