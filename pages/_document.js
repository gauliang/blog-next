import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {


  return (
    <Html>
      <Head>
        <link href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css" rel='stylesheet' />
        <link rel="icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.png"></link>
        <link rel="apple-touch-startup-image" href="/favicon.png"></link>
        <link rel="manifest" href="/manifest.json" />
        <meta content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport"/>
        <meta name="theme-color" content="#000" />
        <meta name="apple-mobile-web-app-title" content="Blog" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}