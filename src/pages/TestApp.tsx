import App, { AppContext, AppProps } from 'next/app';
import { Provider } from 'react-redux';
import configureStore from 'reducers/configureStore';

const store = configureStore();

const TestApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

TestApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default TestApp;
