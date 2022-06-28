---
title: Gitlab 安装
author: 高国良
type: posts
series: false
date: 2019-05-28T07:55:00.791Z
tags: [git]
description: 使用 Gitlab 搭建 Git Server
draft: false 
cover: false
---

## 安装并配置必要的依赖项

```bash
sudo apt-get update
sudo apt-get install -y curl openssh-server ca-certificates
```

## 添加GitLab软件包存储库

```bash
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
```

## 配置SSL数字证书

做好域名解析并申请好数字证书后，将证书文件上传至 `/etc/gitlab/ssl/` 目录下，更名为 ` gitlab.example.com.key` 和 ` gitlab.example.com.key.crt` 。注意域名信息，这里和后面安装命令中的`EXTERNAL_URL`一致。

## 安装软件包

```bash
sudo EXTERNAL_URL="https://gitlab.example.com" apt-get install gitlab-ce

```

## 设置初始密码

第一次访问 `https://gitlab.example.com` ，会提示设置超级管理员密码，可视化界面，设计即可。

## 配置邮件转发

这里需要注意网络环境，如果自己搭建 Postfix 发送邮件,需开放 STMP 25端口，各大云厂商的25端口基本上都是封禁状态，需独立申请才能开通，且使用上还有很明确的安全要求。从业务安全及运维成本来看，使用免费的 SMTP 服务其实是一个非常不错的选择，下面以新浪邮箱为例，进行 SMTP 配置：

```rb
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.sina.com"
gitlab_rails['smtp_port'] = 465
gitlab_rails['smtp_user_name'] = "username@sina.com"
gitlab_rails['smtp_password'] = "password"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = true
gitlab_rails['gitlab_email_from'] = 'username@sina.com'
gitlab_rails['smtp_domain'] = "mail.sina.com"
```

测试邮件发送

```bash
Notify.test_email('example@domain.com', 'Message Subject', 'Message Body').deliver_now
```

## 配置用户注册邮件提醒

-  Admin area > Settings > Sign-up restrictions 选中 `Send confirmation email on sign-up`

## 启用docker镜像仓库

准备一个解析到仓库服务器的域名，并配置申请好SSL数字证书。假设您希望可以访问容器注册表 ` https://registry.gitlab.example.com` 。

将您的TLS证书和密钥放入 ` /etc/gitlab/ssl/registry.gitlab.example.com.crt` 和 `/etc/gitlab/ssl/registry.gitlab.example.com.key`，并确保他们具有正确的权限：

```bash
chmod 600 /etc/gitlab/ssl/registry.gitlab.example.com.*
```

TLS证书到位后，编辑/etc/gitlab/gitlab.rb：

```rg
registry_external_url 'https://registry.gitlab.example.com'
```

保存文件并重新配置GitLab以使更改生效。

```bash
sudo gitlab-ctl reconfigure
```
