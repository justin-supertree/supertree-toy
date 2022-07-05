import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { ChakraProvider } from '@chakra-ui/react';

import { store } from 'store';

type Props = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ChakraProvider>
    </Provider>
  );
};

export default AppProvider;
