---
title: WPF中异步更新UI元素
author: 高国良
type: posts
series: false
date: 2014-08-21T23:39:00.791Z
tags: [wpf, csharp]
description: 实现点击 button 时，lable 的内容从 0 开始自动递增。
draft: false 
cover: false
---

## XAML

界面很简单，只有一个按钮和一个 Lable 元素，实现点击 button 时，lable 的内容从 0 开始自动递增。

```xml
<Grid>
    <Label Name="lable_plus" Content="0" />
    <Button Content="Button" Click="button_Click" Height="23" Name="button" Width="75" />
</Grid>
```

## Code

```csharp
private void button_Click(object sender, RoutedEventArgs e){
    for (int i = 0; i < 100000; i++) {
        lable_plus.Content = i;
    }
}
```

上面的代码执行后会发现，点击按钮并不会看到；lable中数字递增，而是稍等片刻后，直接出现99999。原因在于UI线程被阻塞用以计算循环 i++ 了。

## 方案

```csharp
private void te_Click(object sender, RoutedEventArgs e){   
    update();       
}
     
public delegate void PlusNumberDelegate(int i);

private void update(){   
    for (int i = 0; i < 100000; i++){      
        this.lable_plus.Dispatcher.BeginInvoke( DispatcherPriority.SystemIdle, new NextNumber(this.plus),i)
    }
}
```

参考 http://msdn.microsoft.com/zh-cn/library/ms741870.aspx
