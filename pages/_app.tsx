import { LoadingFullPage } from 'components/Loading'
import { fuego } from 'firebaseLib'
import { NextPage } from 'next'
import { SessionProvider, useSession } from 'next-auth/react'
import { AppProps } from 'next/app'
import React, { ReactElement, ReactNode } from 'react'
import { FuegoProvider } from 'swr-firestore-v9'
import '../styles/globals.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
  auth?: boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={pageProps.session}>
      <FuegoProvider fuego={fuego}>
        {Component.auth ? (
          <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
        ) : (
          getLayout(<Component {...pageProps} />)
        )}
      </FuegoProvider>
    </SessionProvider>
  )
}

const Auth: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const { status } = useSession({ required: true })
  if (status === 'loading') {
    return <LoadingFullPage />
  }
  return <>{children}</>
}

export default MyApp
