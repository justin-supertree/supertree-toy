import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';

import styles from '../styles';
import { Provider } from 'react-redux';
import { store } from '../store';

// import Counter from '@/components/Counter';
// import NewCounter from '@/components/NewCounter';
// import User from '@/components/User';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Global styles={styles} />
        <Component {...pageProps} />

        {/* <BrowserRouter>
          <Routes>
            <Route path="/" element={<Counter />} />
            <Route path="/counter" element={<NewCounter />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </BrowserRouter> */}
      </Provider>
    </>
  );
}

export default MyApp;
