import { useWallet } from './useWallet';
import { useCartStore } from '../stores/cart-store';
import { useState } from 'react';
import { ethers } from 'ethers';

export const useCheckout = () => {
  const { isConnected, connectWallet } = useWallet();
  const { getTotalPrice, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const storeAddress = process.env.NEXT_PUBLIC_STORE_WALLET_ADDRESS;
      if (!storeAddress) {
        throw new Error("Store wallet address not configured");
      }

      // Connect wallet if not connected
      if (!isConnected) {
        await connectWallet();
      }

      if (!window.ethereum) {
        throw new Error("Please install MetaMask to proceed with checkout");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create transaction with proper address validation
      const transaction = {
        to: ethers.getAddress(storeAddress), // Validates the address format
        value: ethers.parseEther(getTotalPrice().toString()),
        // gas limit explicitly
        gasLimit: 21000 
      };

      // Send transaction
      const tx = await signer.sendTransaction(transaction);
      
      // Wait for transaction to be mined
      await tx.wait();

      // Clear cart after successful payment
      clearCart();

      return tx.hash;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.reason || err.message || "Checkout failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCheckout,
    isLoading,
    error
  };
}; 