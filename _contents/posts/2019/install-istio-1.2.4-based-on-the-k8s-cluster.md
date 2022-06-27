---
title: 基于 K8S 集群安装部署 istio-1.2.4
author: 高国良
type: posts
series: false
date: 2019-08-31T16:45:00.791Z
tags: []
description: <img src="https__ERR__//img2018.cnblogs.com/blog/634103/201908/634103-20190830084324046-130039261.png" class="desc_img">
draft: false 
cover: false
---

![](https://img2018.cnblogs.com/blog/634103/201908/634103-20190830084324046-130039261.png)

使用云平台可以为组织提供丰富的好处。然而，不可否认的是，采用云可能会给 DevOps 团队带来压力。开发人员必须使用微服务以满足应用的可移植性，同时运营商管理了极其庞大的混合和多云部署。Istio 允许您连接、保护、控制和观测服务。

在较高的层次上，Istio 有助于降低这些部署的复杂性，并减轻开发团队的压力。它是一个完全开源的服务网格，可以透明地分层到现有的分布式应用程序上。它也是一个平台，包括允许它集成到任何日志记录平台、遥测或策略系统的 API。Istio 的多样化功能集使您能够成功高效地运行分布式微服务架构，并提供保护、连接和监控微服务的统一方法。

## 一、安装

### 1.1 安装 helm

1. 下载二进制可执行文件，[helm-releases](https://github.com/helm/helm/releases)
1. 解压压缩包 `tar -zxvf helm-v2.0.0-linux-amd64.tgz`
1. 找到 helm 文件，移动至 PATH 路径上，`mv linux-amd64/helm /usr/local/bin/helm`

### 1.2 安装 istio

```bash
# 下载软件包并解压
$ curl -L https://git.io/getLatestIstio | ISTIO_VERSION=1.2.4 sh -

# 进入文件夹
cd istio-1.2.4

# 添加 istioctl 路径到环境变量 PATH，或将其移动至 /usr/local/bin 下
sudo mv bin/istioctl /usr/local/bin

# 创建命名空间
kubectl create namespace istio-system

# 使用 kubectl apply 安装所有的 Istio CRD
helm template install/kubernetes/helm/istio-init --name istio-init --namespace istio-system | kubectl apply -f -

# 根据实际情况配置更新 values.yaml
vi install/kubernetes/helm/istio/values.yaml

# 部署 Istio 的核心组件
helm template install/kubernetes/helm/istio --name istio --namespace istio-system | kubectl apply -f -
```

### 1.2 验证安装

1、确保 istioctl 可正常工作

```bash
istioctl version

# 输出如下：
client version: 1.2.4
citadel version: 1.2.4
egressgateway version: 94746ccd404a8e056483dd02e4e478097b950da6-dirty
galley version: 1.2.4
ingressgateway version: 94746ccd404a8e056483dd02e4e478097b950da6-dirty
pilot version: 1.2.4
policy version: 1.2.4
sidecar-injector version: 1.2.4
telemetry version: 1.2.4
```

2、确保所有 k8s 服务都已以部署并都分配到集群 ip 地址（jaeger-agent) 除外

```bash
kubectl get svc -n istio-system
```
结果如下

| NAME | TYPE | CLUSTER-IP | EXTERNAL-IP | PORT(S) | AGE |
| --- | --- | --- | --- | --- | --- |
| istio-citadel           | ClusterIP     | 10.101.78.177  | `<none>`      | 8060/TCP,15014/TCP                                                                                                                          | 2m28s|
| istio-galley            | ClusterIP     | 10.100.76.11   | `<none>`      | 443/TCP,15014/TCP,9901/TCP                                                                                                                  | 2m29s|
| istio-ingressgateway    | LoadBalancer  | 10.106.32.13   | `<pending>`   | 15020:31401/TCP,80:31380/TCP,443:31390/TCP,31400:31400/TCP,15029:31717/TCP,15030:30028/TCP,15031:31428/TCP,15032:30956/TCP,15443:30614/TCP  | 2m29s|
| istio-pilot             | ClusterIP     | 10.97.35.129   | `<none>`      | 15010/TCP,15011/TCP,8080/TCP,15014/TCP                                                                                                      | 2m28s|
| istio-policy            | ClusterIP     | 10.99.93.221   | `<none>`      | 9091/TCP,15004/TCP,15014/TCP                                                                                                                | 2m29s|
| istio-sidecar-injector  | ClusterIP     | 10.107.243.186 | `<none>`      | 443/TCP                                                                                                                                     | 2m28s|
| istio-telemetry         | ClusterIP     | 10.96.117.90   | `<none>`      | 9091/TCP,15004/TCP,15014/TCP,42422/TCP                                                                                                      | 2m29s|
| prometheus              | ClusterIP     | 10.96.219.44   | `<none>`      | 9090/TCP                                                                                                                                    | 2m28s|
```

3、 确保相关 k8s pod 都已部署，且状态为 running

```bash
kubectl get pods -n istio-system
```

结果如下

| NAME                                      | READY | STATUS  | RESTARTS |  AGE |
| --- | --- |--- |--- |--- |
| istio-citadel-7fff5797f-fckss           | 1/1 | Running   | 0 | 16m |
| istio-cleanup-secrets-1.2.4-hz2rm       | 0/1 | Completed | 0 | 16m |
| istio-galley-74d4d7b4db-wnjds           | 1/1 | Running   | 0 | 16m |
| istio-ingressgateway-686854b899-g4z9k   | 1/1 | Running   | 0 | 16m |
| istio-init-crd-10-hhll9                 | 0/1 | Completed | 0 | 30m |
| istio-init-crd-11-ktb9j                 | 0/1 | Completed | 0 | 30m |
| istio-init-crd-12-vrrr2                 | 0/1 | Completed | 0 | 30m |
| istio-pilot-7fdcbd6f55-rw9bm            | 2/2 | Running   | 0 | 16m |
| istio-policy-79f647bb6-4fntc            | 2/2 | Running   | 3 | 16m |
| istio-security-post-install-1.2.4-lr4nk | 0/1 | Completed | 0 | 16m |
| istio-sidecar-injector-578bfd76d7-gtsdb | 1/1 | Running   | 0 | 16m |
| istio-telemetry-cb4486d94-j9gqf         | 2/2 | Running   | 4 | 16m |
| prometheus-7d7b9f7844-kgtjn             | 1/1 | Running   | 0 | 16m |

## 二、 部署应用

以官方 Bookinfo Application 为例，它由四个单独的微服务构成。这个应用模仿在线书店的一个分类，显示一本书的信息。

### 2.1 Bookinfo Application 概述

Bookinfo 应用分为四个单独的微服务：

1. **productpage** ：productpage 微服务会调用 details 和 reviews 两个微服务，用来生成页面。
1. **details** ：这个微服务包含了书籍的信息。
1. **reviews** ：这个微服务包含了书籍相关的评论。它还会调用 ratings 微服务。
1. **ratings** ：ratings 微服务中包含了由书籍评价组成的评级信息。

reviews 服务有3个版本

1. v1 版本不会调用 ratings 服务。
1. v2 版本会调用 ratings 服务，并使用 1 到 5 个黑色星形图标来显示评分信息。
1. v3 版本会调用 ratings 服务，并使用 1 到 5 个红色星形图标来显示评分信息。

Istio 注入之前的 Bookinfo 应用拓扑结构如下：

![](https://istio.io/docs/examples/bookinfo/noistio.svg)

Bookinfo 由多个微服务组成，各自用不同的语言编写。这些服务对 Istio 并无依赖，但是构成了一个有代表性的服务网格的例子：它由多个服务、多个语言构成，并且 reviews 服务具有多个版本。

### 2.2 部署 Bookinfo Application

要在 Istio 中运行这一应用，无需对应用自身做出任何改变。我们只要简单的在 Istio 环境中对服务进行配置和运行，具体一点说就是把 Envoy sidecar 注入到每个服务之中。这个过程所需的具体命令和配置方法由运行时环境决定，而部署结果较为一致，如下图所示：

![](https://istio.io/docs/examples/bookinfo/withistio.svg)

所有的微服务都和 Envoy sidecar 集成在一起，被集成服务所有的出入流量都被 sidecar 所劫持，这样就为外部控制准备了所需的 Hook，然后就可以利用 Istio 控制平面为应用提供服务路由、遥测数据收集以及策略实施等功能。

1、 创建命名空间用以部署 Bookinfo Application

```bash
# 创建命名空间
kubectl create ns bookinfo-application
```

2、 为这个命名空间大上 `istio-injection=enabled` 标签

```bash
kubectl label namespace bookinfo-application istio-injection=enabled
```

3、 部署 bookinfo application 

```bash
kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml -n bookinfo-application
```
安装过程时长视网速而定，请耐心等待以下。

4、确认所有的服务和 Pod 都已经正确的定义和启动

```bash
$ kubectl get services -n bookinfo-application
NAME          TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
details       ClusterIP   10.102.215.67    `<none>`        9080/TCP   2m58s
productpage   ClusterIP   10.109.215.4     `<none>`        9080/TCP   2m57s
ratings       ClusterIP   10.107.143.194   `<none>`        9080/TCP   2m58s
reviews       ClusterIP   10.96.249.233    `<none>`        9080/TCP   2m57s

#---

$ kubectl get pods -n bookinfo-application
NAME                              READY   STATUS    RESTARTS   AGE
details-v1-74f858558f-p8nwz       2/2     Running   0          4m24s
productpage-v1-8554d58bff-cgx74   2/2     Running   0          4m24s
ratings-v1-7855f5bcb9-tt5zn       2/2     Running   0          4m24s
reviews-v1-59fd8b965b-jvqvs       2/2     Running   0          4m24s
reviews-v2-d6cfdb7d6-zxk9w        2/2     Running   0          4m24s
reviews-v3-75699b5cfb-28dvd       2/2     Running   0          4m24s
```

要确认 Bookinfo 应用程序正在运行，请通过某个 pod 中的 curl 命令向其发送请求，例如来自 ratings：
```bash
kubectl exec -it ratings-v1-7855f5bcb9-tt5zn -n bookinfo-application -c ratings  -- curl productpage:9080/productpage | grep "<title>.*</title>"
```

### 2.3 暴露服务入口

如果没有外部负载均衡可以将名为 `istio-ingressgateway` 的 service 类型修改为 NodePort 类型，随后通过 `istio-ingressgateway` 所在的服务器IP地址+端口的形式访问服务。

istio 的 Gateway 允许外部流量进入 Istio 服务网，与 K8S 的 ingress 直接指定路由不同，istio 的路由规则不在 gateway 中指定，需要通过 VirtualService 单独配置。执行下面命令创建 gateway 和 virtualservice。

```bash
kubectl apply -f samples/bookinfo/networking/bookinfo-gateway.yaml -n bookinfo-application
```
### 2.4 浏览器访问 Bookinfo Application

可以在浏览器打开 `http://NodeIp:NodePort/productpage`以浏览  Bookinfo Application 页面，如果刷新几次应用的页面，就会看到 productpage 页面中会随机展示 reviews 服务的不同版本的效果（红色��黑色的星形或者没有显示）。reviews 服务出现这种情况是因为我们还没有使用 Istio 来控制版本的路由。

## 三、应用缺省目标规则

在使用 Istio 控制 Bookinfo 版本路由之前，你需要在目标规则中定义好可用的版本，命名为 subsets 。

```bash
kubectl apply -n bookinfo-application -f samples/bookinfo/networking/destination-rule-all.yaml
```

部署完成后可以通过以命令检查详情

```bash
kubectl get destinationrules -A
NAMESPACE              NAME              HOST                                             AGE
bookinfo-application   details           details                                          2m54s
bookinfo-application   productpage       productpage                                      2m54s
bookinfo-application   ratings           ratings                                          2m54s
bookinfo-application   reviews           reviews                                          2m54s
```
可以看到我们成功创建了 4 个 destinationrule

更多有关流量管理的信息，可以查阅文档 https://istio.io/

## 四、应用性能监控

istio 默认自带相关监控组件（如：kiali）版本相对可能会稍有滞后，如果要安装最新版可以在安装时前配置不安装相关组建，待istio 安装完成后在单独安装监控组建。
