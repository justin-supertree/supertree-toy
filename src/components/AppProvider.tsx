import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { Web3ReactProvider, Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';

import { WalletConnect } from '@web3-react/walletconnect';
import { ChakraProvider } from '@chakra-ui/react';

import { hooks as metaMaskHooks, metaMask } from '../connectors/metaMask';
import { hooks as networkHooks, network } from '../connectors/network';
import {
  hooks as walletConnectHooks,
  walletConnect,
} from '../connectors/walletConnect';

import { store } from 'store';

type Props = {
  children: React.ReactNode;
};

const connectors: [MetaMask | WalletConnect | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [network, networkHooks],
];

const AppProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Web3ReactProvider connectors={connectors}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </Web3ReactProvider>
      </ChakraProvider>
    </Provider>
  );
};

export default AppProvider;
