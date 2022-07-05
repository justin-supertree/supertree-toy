import { initializeConnector } from '@web3-react/core';
import { WalletConnect } from '@web3-react/walletconnect';
import { Network } from '@web3-react/network';
import { MetaMask } from '@web3-react/metamask';

import { URLS } from '../../chains';

export const [walletConnect, wallethooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        rpc: URLS,
      },
    }),
);

export const [network, networkhooks] = initializeConnector<Network>(
  (actions) => new Network({ actions, urlMap: URLS }),
);

export const [metaMask, metahooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions }),
);
