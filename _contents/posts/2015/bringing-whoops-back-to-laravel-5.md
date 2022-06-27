---
title: Bringing Whoops Back to Laravel 5
author: 高国良
type: posts
series: false
date: 2015-03-12T09:06:00.791Z
tags: [laravel,php]
description: You might be missing the "prettier" Whoops error handler from Laravel 4. If so, here's how to bring it back.
draft: false 
cover: false
---

You might be missing the "prettier" Whoops error handler from Laravel 4. If so, here's how to bring it back.

First, composer require filp/whoops:~1.0.

Then open app/Exceptions/Handler.php, and in the render() method, add a Whoops handler in the else condition. Maybe something like this:

```php
/**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        if ($this->isHttpException($e))
        {
            return $this->renderHttpException($e);
        }


        if (config('app.debug'))
        {
            return $this->renderExceptionWithWhoops($e);
        }

        return parent::render($request, $e);
    }

    /**
     * Render an exception using Whoops.
     * 
     * @param  \Exception $e
     * @return \Illuminate\Http\Response
     */
    protected function renderExceptionWithWhoops(Exception $e)
    {
        $whoops = new \Whoops\Run;
        $whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler());

        return new \Illuminate\Http\Response(
            $whoops->handleException($e),
            $e->getStatusCode(),
            $e->getHeaders()
        );
    }
```

That's it!

Thanks to[this thread](https://laracasts.com/discuss/channels/general-discussion/whoops-removed-from-laravel-5)on the Laracasts forum for getting me moving in the right direction.

参考地址：https://laracasts.com/discuss/channels/general-discussion/whoops-removed-from-laravel-5
原文地址：https://mattstauffer.co/blog/bringing-whoops-back-to-laravel-5
