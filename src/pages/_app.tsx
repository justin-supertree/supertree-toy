import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';

import { store } from '../store';
import styles from '../styles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Global styles={styles} />
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
