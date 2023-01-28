import type { AppProps } from 'next/app'
import GlobalStyle from '../src/components/globalstyles'
import ThemeCtxProvider from '../src/contexts/ThemeCtx'
import '../src/styles.css'
import NextNProgress from 'nextjs-progressbar'
import Navigation from '../src/components/Navigation'
import ApolloClientProvider from '../src/hooks/apolloClient';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="#ca4e9c" />
      <ThemeCtxProvider>
        <GlobalStyle />
        <ApolloClientProvider>
          <Navigation>
            <Component {...pageProps} />
          </Navigation>
        </ApolloClientProvider>
      </ThemeCtxProvider>
    </>
  )
}
