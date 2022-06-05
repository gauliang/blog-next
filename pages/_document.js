import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {


  return (
    <Html>
      <Head>
        <link href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css" rel='stylesheet' />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <body>
        <Main/>
        <NextScript />
      </body>
    </Html>
  )
}