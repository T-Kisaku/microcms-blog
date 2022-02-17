import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'

import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { createEmotionCache } from '../../lib/emotion'

import { NextSeo } from 'next-seo'
import Header from '../components/organizations/Header'
import Footer from '../components/organizations/Footer'

import 'tailwindcss/tailwind.css'
import 'github-markdown-css/github-markdown-light.css'

import usePageView from '../hooks/usePageView'


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = props

  usePageView()

  return (
    // back-ground-color's settings is _document.tsx
    <div className="w-screen h-screen">
      <CacheProvider value={emotionCache}>
        <NextSeo
          title="Skill Blog"
          description="技術系ブログ"
        />
        <Head>
          {/* <title>{routes[router.pathname] || 'Pomofai'}</title> */}
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
        <Footer className="mt-20" />
      </CacheProvider>
    </div>
  )
}
