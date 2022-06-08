import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';

import styles from '../styles';
import { Provider } from 'react-redux';
import { store } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Global styles={styles} />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
