---
title: Rancher 2.2.2 - HA 部署高可用k8s集群
author: 高国良
type: posts
series: false
date: 2019-05-09T07:33:00.791Z
tags: [rancher, kubernetes, docker]
description: 对于生产环境，需以高可用的配置安装 Rancher，确保用户始终可以访问 Rancher Server。当安装在Kubernetes集群中时，Rancher将与集群的 etcd 集成，并利用Kubernetes 调度实现高可用。
draft: false 
cover: false
---

对于生产环境，需以高可用的配置安装 Rancher，确保用户始终可以访问 Rancher Server。当安装在Kubernetes集群中时，Rancher将与集群的 etcd 集成，并利用Kubernetes 调度实现高可用。

为确保高可用，本文所部署的 Kubernetes 集群将专用于运行 Rancher ，Rancher 运行起来后，可再创建或导入集群以运行具体的工作负载。

## 一、推荐架构

- Rancher的DNS 应解析到 4层(TCP) 负载均衡上。
- 负载均衡应将端口 TCP/80 和 TCP/443 转发到 Kubernetes 集群中的所有3个节点。
- Ingress-controller 将 HTTP 重定向到HTTPS并终止端口 TCP/443 上的 SSL/TLS（SSL数字证书在这里部署）。
- Ingress-controller 将流量转发到 pod 的 TCP/80 端口。

下面是一张从官网拉过来的图片,更直观一些。

![image](https://rancher.com/docs/img/rancher/ha/rancher2ha.svg)

## 二、准备工作

### 1. 服务器准备

1. 1台 Linux服务器，配置不用很高，用于四层负载均衡
1. 3台 Linux服务器，Rancker-server-node 节点
1. n台 Linux服务器，Rancker-agent-node 节点(n<=50)

节点服务器的硬件配置，可根据实际情况依据该表自行选择。

| 规模 | 集群 | 节点 | CPU | 内存 |
| --- | --- | --- | ---| --- |
| 小 | 最多5个 | 高达50 | 2 | 8 GB |
| 中 | 最多15个 | 最多200 | 4 | 16 GB |
| 大 | 高达50 | 最多500个 | 8 | 32 GB |
| 超大 | 最多100个 | 高达1000 | 32 | 128 GB |
| 更大规模 | 100+ | 1000+ | 联系 Rancher | 联系 Rancher |

### 2.工具安装

这些工具软件将在部署过程中用到，需提前安装好，并确保通过 $PATH 变量可以找到。

**安装 kubectl**

这是一个 kubernetes 命令行工具，[安装参考](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) K8S 官网

这里要注意的是，官网的安装过程是到谷歌云平台下载，这里我门修改下载链接为 RANCHER 提供的镜像地址。

```bash
# 下载目前最新版
wget https://www.cnrancher.com/download/kubernetes/linux-amd64-v1.14.1-kubectl
# 设置执行权限
chmod +x ./linux-amd64-v1.14.1-kubectl 
# 将其移动到 /usr/locak/bin/kubectl 
sudo mv ./linux-amd64-v1.14.1-kubectl /usr/local/bin/kubectl
```

**安装 RKE**

RKE 全称 Rancher Kubernetes Engine，是一个用于构建 kubernets 集群的命令行工具。网络原因，我们切换到 Rancher 提供的镜像地址下载安装

```bash
# 下载目前最新版
wget https://www.cnrancher.com/download/rke/v0.1.18-rke_linux-amd64
# 设置执行权限
chmod +x v0.1.18-rke_linux-amd64
# 将其移动到 /usr/locak/bin/kubectl 
sudo cp v0.1.18-rke_linux-amd64 /usr/local/bin/rke
# 验证安装
rke --version # rke version v0.1.18
```

**安装 helm**

helm 是Kubernetes的包管理器。Helm版本需高于 `v2.12.1`。

```bash
# 网络原因，切换到 Rancher 提供的镜像连接
wget https://www.cnrancher.com/download/helm/helm-v2.13.1-linux-amd64.tar.gz
# 解压
tar -zxvf helm-v2.0.0-linux-amd64.tgz
# 移动到 /usr/local/bin/helm
mv linux-amd64/helm /usr/local/bin/helm
```

## 三、创建节点和负载均衡

这些节点须在同一个网络区域或数据中心。

### 1. 节点准备

**操作系统**

所有节点安装 ubuntu 18.04(64-bit x86)

**网络要求**
注意参考 [官网](https://rancher.com/docs/rancher/v2.x/en/installation/requirements/#)放行相关端口。本文 ip 清单（仅用于演示）：

| NODE | IP | 备注 |
| --- | --- | --- |
| NODE-LB | 公网 168.168.168.1 / 内网 10.0.0.1 | 四层负载均衡 |
| NODE-SERVER | 公网 168.168.168.6 / 内网 10.0.0.6 | local 集群 |
| NODE-SERVER | 公网 168.168.168.7 / 内网 10.0.0.7 | local 集群 |
| NODE-SERVER | 公网 168.168.168.8 / 内网 10.0.0.8 | local 集群 |
| NODE-WORKER | 公网 168.168.168.16 / 内网 10.0.0.16 | 工作负载 |
| NODE-WORKER | 公网 168.168.168.17 / 内网 10.0.0.17 | 工作负载 |
| NODE-WORKER | 公网 168.168.168.18 / 内网 10.0.0.18 | 工作负载 |

**docker-ce**

并安装最新stable版 docker-ce:18.09.6

```bash
# 删除旧版本docker
sudo apt-get remove docker docker-engine docker.io containerd runc

# 更新 apt 
$ sudo apt-get update

# 安装工具包
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

# 添加Docker官方 GPG key
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# 添加 stable apt 源
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# 安装 Docker CE
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io

# 将当前用户加入"docker"用户组，加入到该用户组的账号在随后安装过程会用到。用于节点访问的SSH用户必须是节点上docker组的成员：
$ sudo usermod -aG docker $USER
```

### 2. 配置四层负载均衡

RKE 将会在每个节点上配置一个 Ingress-controller pod，这个 pod 将绑定到该节点的 TCP/80 和 TCP/443 端口，作为 Rancher-server 的HTTPS流量入口点。

将负载均衡器配置为基本的第4层TCP转发器，这里采用 NGINX 作四层负载均衡。

***安装 Nginx**

```bash
sudo apt-get install nginx
# /usr/sbin/nginx：主程序
# /etc/nginx：存放配置文件
# /usr/share/nginx：存放静态文件
# /var/log/nginx：存放日志
```

更新配置文件 `/etc/nginx/nginx.conf`

```
worker_processes 4;
worker_rlimit_nofile 40000;

events {
    worker_connections 8192;
}

stream {
    upstream rancher_servers_http {
        least_conn;
        server 10.0.0.6:80 max_fails=3 fail_timeout=5s;
        server 10.0.0.7:80 max_fails=3 fail_timeout=5s;
        server 10.0.0.8:80 max_fails=3 fail_timeout=5s;
    }
    server {
        listen     80;
        proxy_pass rancher_servers_http;
    }

    upstream rancher_servers_https {
        least_conn;
        server 10.0.0.6:443 max_fails=3 fail_timeout=5s;
        server 10.0.0.7:443 max_fails=3 fail_timeout=5s;
        server 10.0.0.8:443 max_fails=3 fail_timeout=5s;
    }
    
    server {
        listen     443;
        proxy_pass rancher_servers_https;
    }
}
```

>
    注意：将local群集专用于Rancher。
    勿将此负载均衡（即local群集Ingress）对 Rancher 以外的应用程序进行负载转发。

## 四、使用 RKE 安装 kubernetes

下面使用 RKE(Kubernetes Engine) 安装高可用的 Kubernetes。

### 1. NODE-SERVER 之间建立 ssh 信任

我们目前有三台服务器用作 local 集群，首先要确保我们主机能够通过 ssh 访问到另外两台主机并执行相关操作。比如执行 docker 命令，还记得前面我们加入 docker 用户组的用户吧。

```bash
# 根据需求配置相关信息生成 rsa 公钥密钥
ssh-keygen

# 复制当前主机上的公钥到另外两台上面，实现免密码登录
ssh-copy-id -i ~/.ssh/id_rsa.pub user@x.x.x.x

# 要注意这里也要跟自己注册注册一下 ：ssh-copy-id -i ~/.ssh/id_rsa.pub user@本机ip
```

### 2. 编写 rancher-cluster.yml 文件

这里需要注意，这个文件没有明确配置rsa文件名，默认会使用 `$HOME/.ssh/id_rsa` 建立连接。内容如下

```yml
nodes:
  - address: 168.168.168.6
    internal_address: 10.0.0.6
    user: ubuntu
    role: [controlplane,worker,etcd]
  - address: 168.168.168.7
    internal_address: 10.0.0.7
    user: ubuntu
    role: [controlplane,worker,etcd]
  - address: 168.168.168.8
    internal_address: 10.0.0.8
    user: ubuntu
    role: [controlplane,worker,etcd]

services:
  etcd:
    snapshot: true
    creation: 6h
    retention: 24h
```

### 3. 运行 RKE 构建 kubernetes 集群

```bash
rke up --config ./rancher-cluster.yml
# 验证：返回类似下面的消息则说明执行成功，有问题欢迎留言交流。
# Finished building Kubernetes cluster successfully.
```

执行成功会在当前目录生成一个文件 `kube_config_rancher-cluster.yml`，将该文件复制到 `.kube/kube_config_rancher-cluster.yml`。

或者

```bash
export KUBECONFIG=$(pwd)/kube_config_rancher-cluster.yml
```

### 4. 测试集群

```bash
kubectl get nodes
# 返回下面信息说明集群创建成功
NAME           STATUS   ROLES                      AGE   VERSION
168.168.168.6   Ready    controlplane,etcd,worker   13m   v1.13.5
168.168.168.7   Ready    controlplane,etcd,worker   13m   v1.13.5
168.168.168.8   Ready    controlplane,etcd,worker   13m   v1.13.5
```

### 5. 保存好相关配置文件

当排除故障、升级群集时需要用到以下文件，请将其副本保存在一个安全的位置。

`rancher-cluster.yml`：RKE集群配置文件。
`kube_config_rancher-cluster.yml`：群集的Kubeconfig文件，此文件包含完全访问群集的凭据。
`rancher-cluster.rkestate`：Kubernetes群集状态文件，此文件包含完全访问群集的凭据。

### 6. 初始化 Helm

一开始，我们安装了 Helm ，Helm 是 Kubernetes 首选的包管理工具。为了能够使用 Helm，需要在群集上安装服务器端组件 tiller。

Kubernetes APIServer 开启了 RBAC 访问控制，所以需要创建 tiller 使用的service account: tiller 并分配合适的角色给它。 

```bash
# 在 kube-system 命名空间下创建一个 serviceaccount ,并将角色绑定给 tiller
kubectl -n kube-system create serviceaccount tiller

# 然后， heml 就可以在集群上安装 tiller 了
# 同样，网络原因，我们需要配置一个镜像仓库地址
helm init --upgrade -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.13.1 --stable-repo-url https://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts

# 输出：$HELM_HOME has been configured at /home/ubuntu/.helm.
```

### 7. 测试 tiller 安装是否成功

```bash
kubectl -n kube-system  rollout status deploy/tiller-deploy
# 输出 deployment "tiller-deploy" successfully rolled out

helm version
# Client: &version.Version{SemVer:"v2.13.1", GitCommit:"618447cbf203d147601b4b9bd7f8c37a5d39fbb4", GitTreeState:"clean"}
# Server: &version.Version{SemVer:"v2.13.1", GitCommit:"618447cbf203d147601b4b9bd7f8c37a5d39fbb4", GitTreeState:"clean"}
```

## 五、安装 Rancher

这里注意选择 stable 版本，首先添加 heml 源仓库。

```bash
helm repo add rancher-stable https://releases.rancher.com/server-charts/stable
```

### 1. 部署 Rancher 并配置 SSL 数字证书

```bash
helm install rancher-stable/rancher \
  --name rancher \
  --namespace cattle-system \
  --set hostname=cloud.jfjbapp.cn \
  --set ingress.tls.source=secret

```

### 2. 将通过 CA 机构签发的数字证书准备好，

### 3. 检查 rancher 是否成功可用

```bash
kubectl -n cattle-system rollout status deploy/rancher
Waiting for deployment "rancher" rollout to finish: 0 of 3 updated replicas are available...
deployment "rancher" successfully rolled out
```

### 4. 访问 Rancher UI

浏览器打开 `https://your.doamin`，为 `admin`账户设置初始密码，并登入系统。提示设置`server-url`，确保你的地址无误，确认即可。随后稍等皮片刻，待系统完成初始化。

如果出现local集群一直停留在等待状态，并提示 `Waiting for server-url setting to be set`，可以尝试点击 全局->local->升级->添加一个成员角色（admin/ClusterOwner）->保存即可。

## 六、结语

至此，已完成 Rancher 2.2.2 的 HA 安装，后续再做一些安全加固，检查各项配置确保无安全风险，即可开始提供服务。随后会抽空再写一篇文章简单介绍微服务架构应用的部署。
