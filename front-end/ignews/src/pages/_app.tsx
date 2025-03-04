import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { Header } from '../components/Header';

import { GlobalStyles } from '../styles/globalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp
