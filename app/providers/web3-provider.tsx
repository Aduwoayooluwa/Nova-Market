'use client';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { injected, coinbaseWallet } from 'wagmi/connectors';
import '@rainbow-me/rainbowkit/styles.css';
import FloatingCart from '../components/floating-cart';
import { ConfigProvider } from 'antd';

const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
  connectors: [
    injected(), 
    coinbaseWallet({ appName: 'NovaMarket' }), 
  ],
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
     <ConfigProvider theme={{
      token: {
        colorPrimary: "#D4A373"
      }
     }}>
     <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode>
          {children}
          <FloatingCart />
        </RainbowKitProvider>
      </QueryClientProvider>
     </ConfigProvider>
    </WagmiProvider>
  );
} 