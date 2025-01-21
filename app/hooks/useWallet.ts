import { useState, useCallback } from 'react';

export const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      throw new Error("Please install MetaMask");
    }

    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsConnected(true);
    } catch {
      throw new Error("Failed to connect wallet");
    }
  }, []);

  return { isConnected, connectWallet };
}; 