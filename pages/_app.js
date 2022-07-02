import 'nextra-theme-blog/style.css'
import Head from 'next/head'
import { usePanelbear } from '@panelbear/panelbear-nextjs'

import '../styles/main.css'

export default function Nextra({ Component, pageProps }) {
  usePanelbear('YOUR_SITE_ID')

  return (
    <>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
