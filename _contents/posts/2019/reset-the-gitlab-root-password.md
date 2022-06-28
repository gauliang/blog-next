---
title: Gitlab 重置 root 密码
author: 高国良
type: posts
series: false
date: 2019-07-11T08:07:00.791Z
tags: [password,git]
description: ''
draft: false 
cover: false
---

![](634103-20190812005008821-76726312.png)

要重置root密码，请先使用root权限登录服务器。使用以下命令启动Ruby on Rails控制台：

```bash
gitlab-rails console production
```

等到控制台加载完毕，您可以通过搜索电子邮件或用户名等方法找到您的账号。

```bash
user = User.where(id: 1).first
```

或者

```bash
user = User.find_by(email: 'admin@local.host')
```

找出用户以后，可以更改其密码：

```bash
user.password = 12345678
user.password_confirmation = 12345678
```

最后，保存上面的更改，即可使用新密码登录。
