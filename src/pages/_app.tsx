import { AppProps } from 'next/app';

import { Global } from '@emotion/react';

import type { NextPageWithLayout } from 'types/next-page';

import AppProvider from '@/components/AppProvider';

import styles from '../styles';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AppProvider>
      <Global styles={styles} />
      {getLayout(<Component {...pageProps} />)}
    </AppProvider>
  );
}

export default MyApp;
