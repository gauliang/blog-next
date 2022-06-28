---
title: Vagrant 基础全面解析
author: 高国良
type: posts
series: false
date: 2017-01-04T09:26:00.791Z
tags: [vagrant, php, laravel, web, linux, Apache]
description: Vagrant 是一个管理虚拟主机生命周期的命令行工具。本文旨在从上到下对 Vagrant 各个特性进行全面讲解，尽可能多的涵盖细节。如果你只是想入门 Vagrant ，那么本文是一个非常好的开始。这篇 Vagrant 入门文章将带你创建一个 Vagrant 项目，这个过程将会用到 Vagrant 所提供的主要基本特性。
draft: false 
cover: false
---

![](634103-20170104115903581-174293627.jpg)

这篇 Vagrant 入门文章将带你创建一个 Vagrant 项目，这个过程将会用到 Vagrant 所提供的主要基本特性。如果想了解 Vagrant 能为你带来哪些好处，可以阅读 Vagrant 官网文档的 "Why Vagrant?" 部分。

Vagrant

Vagrant 是一个管理虚拟主机生命周期的命令行工具。本文旨在从上到下对 Vagrant 各个特性进行全面讲解，尽可能多的涵盖细节。如果你只是想入门 Vagrant ，那么本文是一个非常好的开始。

本文将会使用到 VirtualBox，因为它在各个主要的操作系统平台上都是免费的，并且已集成到 Vagrant 中。不过，在读完文档后，请不要忘记 Vagrant 还可以配合很多其他虚拟机平台一起工作。

在深入第一个 Vagrant 项目之前，请安装最新版本的 Vagrant ，并且安装好 VirtualBox，因为后续环节我们会把 VirtualBox 作为我们的 provider 进行主要讲解。

> 如果你更喜欢阅读纸质书本， 《Vagrant: Up and Running》 可能是一个不错的选择，该书已在 O'Reilly 出版，其作者正是 Vagrant 的作者。

## #1 - UP AND RUNNING

```bash
vagrant init hashicorp/precise64
vagrant up
```

运行上面两条命令后，一个基于 VirtualBox 的虚拟主机（Ubuntu12.04 LTS 64-bit）将运行起来。你可以通过 **vagrant ssh** 命令以 SSH 的形式登录到虚拟主机，处理完你的工作后，可通过`vagrant destroy` 命令终止虚拟主机运行。

现在，想象一下你的每一个项目都能够如此容易的建立！在 Vagrant 中，只需执行一条 `vagrant up` 命令，项目依赖安装、网络配置、文件夹同步等工作都会准备完成。你可以非常方便的基于你的物理机进行工作。

本文的其余部分将通过引导您建立一个比较完整的项目，来介绍更多 Vagrant 特性。

## #2 - PROJECT SETUP

要配置一个 Vagrant 项目，首先需创建 Vagrantfile 文件，Vagrantfile 文件所在目录就是项目根目录：

1\. 记下你的项目根目录。许多 Vagrant 配置选项都是相对于这个根目录的。  
1\. 描述运行项目所需的机器和资源，以及要安装什么软件和如何访问它。

Vagrant 内置了初始化文件夹为 Vagrant 项目的命令 **vagrant init**。在命令行执行下列命令：

```
mkdir vagrant_getting_started
cd vagrant_getting_started
vagrant init
```

上述命令将在当前工作目录中生成一个 Vagrantfile 文件。你可以打开该文件看一看，里面有一些被注释掉的案例。不要害怕，如果看起来很吓人，我们会很快修改\[引用官方原话\]。你也可以在一个已存在的目录中运行 **vagrant init**，将其初始化为 vagrant 项目。

如果你使用版本控制，vagrantfile 能够使你非常方便的对项目进行版本控制。这样，你团对中的每个人都可以在无需前期准备的情况下快速部署开发环境。

## #3 - BOXES

从头开始创建虚拟机，是一个缓慢和繁琐的过程，Vagrant 利用镜像(image)克隆虚拟机。这些基本的镜像在 Vagrant 中被称为 boxes ，创建完 vagrantfile 后的第一步，就是指定你的 Vagrant 环境要使用的 box。

### 3.1. INSTALLING A BOX

如果你成功执行过下面命令（上面的UP AND RUNNING章节有提到）

```
vagrant init hashicorp/precise64
vagrant up
```

那么你就已经安装了一个 box，并且你不需要再次执行下面的命令。然而，这一小节仍然值一读，这能让你了解到更多关于 Vagrant box 方面的知识。

使用 **vagrant box add**可以添加一个 box 到 Vagrant，这将存储 box 在特定的名称下，以便于多个 Vagrant 环境重复使用。如果你没有添加过任何 box 到 Vagrant，你可以执行下面的命令：

```
vagrant box add hashicorp/precise64
```

上述命令将会从 https://atlas.hashicorp.com/boxes/search 下载一个名为 hashicorp/precise64 的 box 。当然，这是最简单的下载 box 的方式，你也可以从一个本地文件或自定义路径添加 box。

boxes 被全局的存储在当前用户名下，每个项目都能够通过克隆 box 镜像的方式使用 box，并且不会修全局的 box。这意味着，如果你有两个项目同时使用了名为**hashicorp/precise64**的 box，我们在其中一个 Vgrant 项目的虚拟机中添加文件，完全不会影响到另一个。

通过上面的命令，你可能已经注意到，box 的名字是有命名空间的。box 名称由两部分组成，分别是用户名和 box 名，两者之间由斜杠 '/' 分隔。在上面的案例中，用户名是`**hashicorp**`，box 名是'**precise64**'。你也可以通过URL或本地文件路径指定 box，但是，在这篇入门文章中我们不会具体到这一部分。

### 3.2. USING A BOX

现在 box 已经被添加进 Vagrant 了，需要配置我们的项目以使用它。打开 vagrantfile 并修改内容如下：

```
Vagrant.configure("2") do |config|
config.vm.box = "hashicorp/precise64"
end
```

上述代码，`**hashicorp/precise64**`必须与你上一步添加的 box 名称一致。Vagrant 将通过该配置确定应该使用哪个 box。如果指定 box 在之前没有被添加到 Vagrant，当 Vagrant 运行时 Vagrant 将自动联网下载并添加他们。

你还可以通过 `config.vm.box\_version` 配置明确的指定一个 box 版本:

```
Vagrant.configure("2") do |config|
config.vm.box = "hashicorp/precise64"
config.vm.box_version = "1.1.0"
end
```

你也可以通过`config.vm.box\_url`配置直接指定 box 的 URL:

```
Vagrant.configure("2") do |config|
config.vm.box = "hashicorp/precise64"
config.vm.box_url = "http://files.vagrantup.com/precise64.box"
end
```

在下一节，我们会启动并运行 Vagrant ，同时还会对它进行一些基本的操作。

### 3.3. FINDING MORE BOXES

该文档的剩余部分，我们只会用到 "**hashicorp/precise64**" 这个 box。但是在结束这个文档之后，你的第一个问题可能是 "哪里可以找到更多的box？&rdquo;

最好的查找 box 资源的地方是 https://atlas.hashicorp.com/boxes/search 。除了使用免费的 box，你也可以通过 hashicORP&lsquo;s 发布自己的 box。

## #4 - UP AND SSH

是时候启动你的第一个 Vagrant 环境了，在命令行执行下述命令：

```
vagrant up
```

很快，这个命令将会执行完毕，执行完毕后，你便拥有了一个运行 ubuntu 的虚拟主机。现在，你可能不会看到任何东西，因为 Vagrant 运行的这个虚拟主机并不包含 UI，但是，你可以通过 SSH 登录到该主机。

```
vagrant ssh
```

这将使你与虚拟机创建一个 SSH 链接，你可以在该虚拟机中执行任何你需要的操作。这看上去非常完美，但是请谨慎操作**`rm -rf /`**命令，因为 Vagrant 共享了一个 **'/vagrant'** 目录，其和你主机上的 Vagrantfile 文件所在位置是同一个目录。 **rm -rf /**将会删除所有的文件。共享目录的概述我们将在下一节仔细讲解。

现在，花一点时间思考一下刚才发生了什么事：只有一行的配置和一条在你命令行终端执行的命令，我们便拥有了一个全功能的，SSH可访问的虚拟主机。

SSH 会话可以用 **Ctrl + D** 终止。

```
vagrant@precise64:~$ logoutConnection to 127.0.0.1 closed.
```

当执行完你需要的操作后，运行**`Vagrant destroy`**可终止虚拟机运行，并释放虚拟机所占用的资源。

## #5 - SYNCED FOLDERS

这真是太酷了, 使用 Vagrant 创建一个虚拟主机是如此的简单。不过，没有多少人愿意通过 SSH 在命令行终端里编写代码。幸运的是，在 Vagrant 中你不需要这样，Vagrant 提供了共享目录同步机制，它会自动同步主机共享目录中的文件到虚拟机中。

默认情况下，Vagrant 会共享你的项目目录（Vagrantfile文件的所在目录）到虚拟机的 `**/vagrant**` 目录中。

需要注意的是，当你通过 `**vagrant ssh**` 链接到虚拟主机时，你是在 `**/home/vagrant**` 目录中，该目录和上面提到的 '**/vagrant**' 不是同一个位置。

如果登陆过程中显示了一些错误，你可能需要更新你的 box 或者重新选择一个 box，一些用户通过 vagrant-vbguest 来处理该问题，不过这不是 vagrant 核心团队官方支持的。

再次运行 `**vagrant up**`，并 SSH 登陆你的主机可以看到：

```
$ vagrant up
...
$ vagrant ssh
...
vagrant@precise64:~$ ls /vagrant
Vagrantfile
```

无论你信或不信，这个你看到的在虚拟主机里的 Vagrantfile文件，实际上就是你的真实主机上的 Vagrantfile 文件。继续并新建一个文件：

```
vagrant@precise64:~$ touch /vagrant/foovagrant@precise64:~$ exit$ lsfoo Vagrantfile
```

现在 'foo' 文件已经在你的主机上了，如你所见，Vagrant 会确保共享目录同步。通过 SYNCED FOLDERS ，你可以继续在你的主机上使用你喜欢的编辑器进行开发工作，代码会自动同步到虚拟主机中执行。

## #6 - PROVISIONING

现在，我们有一个基于 Ubuntu 系统的虚拟机，还可以从我们的主机编辑文件并同步到虚拟机。接下来，我们创建一个 web 服务器发布这些文件。

如果我们通过 SSH 登录虚拟机并以自己的方式安装 web 服务器，那么每一个使用同样 Vagrant 环境的同事就都要重复这一安装过程。Vagrant 集成了自动配置功能来处理这些事务。使用这个特性，当你执行`**vagrant up**`命令的时候 Vagrant 将会自动的安装软件。如此一来，便可以很方便的创建 Vagrant 环境的副本在开发团队之间共享开发环境。

### 6.1. installing apache

我们将使用一个 shell 脚本为我们的 Vagrant 项目安装一个 apache。在 vagrantfile 所在目录中创建一个脚本文件 bootstrap.sh ，内容如下：

```
#!/usr/bin/env bash

apt-get update
apt-get install -y apache2
if ! [ -L /var/www ]; then
rm -rf /var/www
ln -fs /vagrant /var/www
fi
```

接着，我们通过修改 vagrantfile 文件，配置 vagrant 在启动时运行该脚本，代码如下：

```
Vagrant.configure("2") do |config|
config.vm.box = "hashicorp/precise64"
config.vm.provision :shell, path: "bootstrap.sh"
end
```

这里的 `provision` 行是新增的，它告诉 vagrant 使用 `bootstrap.sh` 脚本配置虚拟主机，脚本位置是相对与当前项目根目录的（vagrantfile 所在位置）。

### 6.2. PROVISION!

当一切都配置妥当，我们只需执行 `vagrant up` 即可通过 Vagran 自动化的配置虚拟主机。过程中你将会看到 shell 脚本的执行结果在你的命令行终端。如果虚拟主机已经处于运行状态，执行 `vagrant reload --provision` 将会快速重启虚拟主机，跳过初始导入步骤。 provision 参数告诉 Vagrant 执行 provisioners，因为该步骤通常只会在第一次执行 `vagrant up` 时执行。

Vagrant 启动完成后，Web服务器将启动和运行。现在，你还不能从你自己的浏览器看到网站，但你可通过SSh从服务器加载一个文件以验证 web 服务已在正常运行：

```
$ vagrant ssh
...
vagrant@precise64:~$ wget -qO- 127.0.0.1
```

上述命令会正常工作，因为我们已安装 apache 并设置 documentroot 指向 `/vagrant`目录（我们在前面配置的共享目录），您可以通过创建更多的文件并从终端查看它们，下一步我们将讨论网络选项，以便您可以使用自己的浏览器访问来虚拟主机。

## #7 - NETWORKING

现在我们有一个Web服务器，当我们修改我们的主机文件时，他们会自动同步到虚拟主机。然而，仅仅从终端访问虚拟机的网页并不令人满意。在这一步中，我们将使用 Vagrant 的网络功能实现从我们的主机访问虚拟主机。

### 7.1. PORT FORWARDING

这将用到端口转发功能，端口转发是转发一个网络端口从一个网络节点到另一个网络节点的行为，其使一个外部用户从外部经过一个被激活的NAT路由器到达一个在私有内部IP地址（局域网内部）上的一个端口。这允许你在你自己的机器上访问一个端口，但实际上所有的网络流量都将转发到一个虚拟机的特定端口上。

让我们建立一个转发端口，以便我们在主机上访问虚拟主机中的Apache。只需要简单的编辑一下 vagrantfile 文件即可，操作如下：

```bash
Vagrant.configure("2") do |config|
config.vm.box = "hashicorp/precise64"
config.vm.provision :shell, path: "bootstrap.sh"
config.vm.network :forwarded_port, guest: 80, host: 4567
end
```

运行 `vagrant reload` 或 `vagrant up`（取决于虚拟主机是否已运行），上面的配置将会开始生效。

一旦虚拟主机完成重启，我们便可在浏览器中打开 `http://127.0.0.1:4567` 访问虚拟主机中的页面。

### 7.2. OTHER NETWORKING

Vagrant 也有其他形式的网络工作模式，允许你为虚拟机指定一个静态IP地址，或桥接虚拟机的到一个已存在的网络。如果您对其他选项感兴趣，请阅读相关��档。

## #8 - SHARE

现在，我们有一个正常运行的Web服务器，并且能够通过我们的主机访问。我们已具备一个相当功能的开发环境。但是，除了提供一个开发环境， Vagrant 也可以很容易地共享一个开发环境。

Vagrant 分享能够使你方便快捷的分享你的 Vagrant 开发环境给周围任何能与互联网连接的人。它会生成一个网址，该 URl 用来让全世界任何一个连接互联网的设备都能够访问获取到你的开发环境。

### 8.1. LOGIN TO HASHICORP'S ATLAS

在分享你的 Vagrant 环境之前，你将需要一个 hashicorp 帐户。不要担心，它是免费的。  
一旦你创建完账号，便可使用 `vagrant login` 命令登录：

```bash
$ vagrant login
Username or Email: mitchellh
Password (will be hidden):
You are now logged in!
```

### 8.2. SHARE

一旦登录成功，运行 `vagrant share` 命令:

```bash
$ vagrant share
...
==> default: Your Vagrant Share is running!
==> default: URL: http://frosty-weasel-0857.vagrantshare.com
...
```

您的网址将是不同的，所以不要尝试上面的网址。相反，复制 vagrant share 输出的 URL 在 Web 浏览器中访问，它应该载入我们早前在 Apache 中设置好的页面。

如果您修改共享文件夹中的文件并刷新 URL，您将看到它的更新！URL是直接路由到你 Vagrant 环境的。

在你的终端按下**Ctrl + C**可结束共享会话。您可以再次刷新URL，以验证您的环境不再共享。

Vagrant 共享比简单的 HTTP 共享更强大。更多信息，请查看完整的 vagrant 共享文档。

## #9 - TEARDOWN

我们已经拥有一个功能齐全的虚拟机，可用于基本的 Web 开发。现在，是时候来谈一谈如何使 vagrant 停止工作了，比如我们要切换到另一个其它类型的工作项目，也许是出去吃午饭，或者只是到了回家时间。我们该如何关闭我们的开发环境呢？

Vagrant 中，你可以通过 `suspend` 、 `halt` 或 `destroy` 来停止虚拟主机运行。这些选项各有利弊，你应该根据需求选择最适合你的方法。

### 9.1. Suspending

调用 `vagrant suspend` 命令将暂停虚拟主机，它会保存当前运行的机器状态然后停止 Vagrant。当你准备开始工作时，只需执行 `vagrant up`，它将从你离开的地方重新开始。这种方法的主要好处是，它是超级快的，停止和开始你的工作通常只需5至10秒。缺点是虚拟机仍然占用你的磁盘空间，并且需要更多的磁盘空间来存储磁盘上的虚拟机内存状态。

### 9.2. Halting

调用 `vagrant halt` 命令，vagrant 会优雅地关闭虚拟机操作系统并关闭虚拟机。当你准备开始工作时，只需执行 `vagrant up`。这种方法的好处是，它会干净地关闭您的机器，保存磁盘的内容，并允许它再次干净的启动。缺点是，它会需要一些额外的时间用来冷启动操作系统，并且虚拟机关闭期间仍然占用磁盘空间。

### 9.3. Destroying

调用 `vagrant destroy` 命令将从您的系统中删除虚拟机的所有痕迹。它会停止虚拟机，关闭电源，并删除所有的虚拟磁盘信息。再次，当你准备好开始工作时，只需执行 `vagrant up`。这样做的好处是，没有任何东西在你的机器上留下。由虚拟机消耗的磁盘空间和RAM被回收，并且主机保持清洁。缺点是，`vagrant up` 启动时间会花费一些额外的时间，因为它需要重新导入和初始化 provision 。

## #10 - REBUILD

当你准备好回到你的项目继续工作，无论是明天，从现在开始的一个星期后，还是从现在开始的一年后，重新运行之前保存起来的项目都非常容易：

```bash
vagrant up
```

就是这样！由于 Vagrant 环境已经通过 vagrantfile 配置文件保存起来，你或者你的同事只需在适当的时候执行 `vagrant up` 即可快速重塑你的工作环境。

截至目前，你已经完整的把 Vagrant 整个生命周期梳理一遍了。

## #11 - PROVIDERS

在这篇文章中，你的项目是基于 VirtualBox 的，但是 Vagrant 还可以与各式各样的其他 providers 一起工作，如 VMware , AWS 等等。可以到官网文档中阅读每个 provider 页面，了解如何设置它们的更多信息。

一旦你有一个 provider 安装完成，你不需要对你的 vagrantfile 进行任何修改，只需在执行 `vagrant up` 命令时带上相应的 provider 参数即可。

```bash
vagrant up --provider=vmware_fusion
```

准备移动到云了吗？把它带到AWS：

```bash
vagrant up --provider=aws
```

一旦你运行 **vagrant up** 时指定了 provider ，其他 Vagrant 命令均不再需要明确指定 provider 信息。所以，当你准备 SSH 、destroy 或其他操作时，只要运行常规的 Vagrant 命令即可。如 `vagrant destroy`，无需带任何参数信息。

## #12 - The end

参考资料：https://www.vagrantup.com/docs/getting-started/