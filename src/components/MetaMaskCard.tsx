import type { Web3ReactHooks } from '@web3-react/core';
import { AccountsComponent } from './AccountComponent';
import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';

const [metaMask, hooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions }),
);

console.log('metaMask', metaMask);

const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

function Connect({
  isActivating,
  error,
  isActive,
}: {
  chainId: ReturnType<Web3ReactHooks['useChainId']>;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  error: '';
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
}) {
  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button onClick={() => metaMask.activate()}>Try Again?</button>
      </div>
    );
  } else if (isActive) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button>Disconnect</button>
      </div>
    );
  } else {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button
          onClick={isActivating ? undefined : () => metaMask.activate()}
          disabled={isActivating}
        >
          Connect
        </button>
      </div>
    );
  }
}

function Status({
  isActivating,
  error,
  isActive,
}: {
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  error: '';
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
}) {
  return (
    <div>
      {error ? (
        <>
          {/* 🔴 {error.name ?? 'Error'}
          {error.message ? `: ${error.message}` : null} */}
        </>
      ) : isActivating ? (
        <>🟡 Connecting</>
      ) : isActive ? (
        <>🟢 Connected</>
      ) : (
        <>⚪️ Disconnected</>
      )}
    </div>
  );
}

export default function MetaMaskCard() {
  const chainId = useChainId();
  const accounts = useAccounts();
  //   const error = useError();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  return (
    <div style={{ border: '1px solid' }}>
      <b>MetaMask</b>
      <Status isActivating={isActivating} error={''} isActive={isActive} />
      <AccountsComponent
        accounts={accounts}
        provider={provider}
        ENSNames={ENSNames}
      />
      <Connect
        chainId={chainId}
        isActivating={isActivating}
        error={''}
        isActive={isActive}
      />
    </div>
  );
}
