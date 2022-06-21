import { useState } from 'react';
import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';

import { store } from '../store';
import styles from '../styles';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Provider store={store}>
        <Global styles={styles} />
        <ChakraProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
