/* eslint-disable @next/next/no-img-element */
"use client";

import { FC, useState } from "react";
import { useCartStore } from "@/app/stores/cart-store";
import { useCheckout } from "@/app/hooks/useCheckout";

interface CartItem {
    id: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    image: string;
    quantity: number;
}

interface CartItemsProps {
    items: CartItem[];
}

const CartItems: FC<CartItemsProps> = ({ items }) => {
  const { removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const { handleCheckout, isLoading, error } = useCheckout();
  const [txHash, setTxHash] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="py-6 px-4 lg:py-10 lg:px-20 bg-gray-100">
        <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6">Your Cart</h2>
        <p className="text-gray-600">Your cart is empty. Start shopping now!</p>
      </div>
    );
  }

  const onCheckoutClick = async () => {
    try {
      const hash = await handleCheckout();
      setTxHash(hash);
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  return (
    <div className="py-6 px-4 lg:py-10 lg:px-20 bg-gray-100">
      <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6">Your Cart</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        {/* Items Section */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-4 rounded-lg shadow-md space-y-4 sm:space-y-0"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full sm:w-20 h-40 sm:h-20 rounded-lg object-cover"
              />

              {/* Details */}
              <div className="flex-1 sm:ml-4">
                <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-lg font-semibold text-accent">
                  {item.price} {item.currency}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  className="px-4 sm:px-2 py-2 sm:py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                >
                  -
                </button>
                <span className="px-4 py-2 bg-gray-100 rounded">{item.quantity}</span>
                <button
                  className="px-4 sm:px-2 py-2 sm:py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>

                {/* Remove Button - Moved inside quantity controls container on mobile */}
                <button
                  className="sm:ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-4 lg:mt-0">
          <h3 className="text-lg font-bold text-primary mb-4">Cart Summary</h3>
          <p className="text-gray-600">
            Total Price:{" "}
            <span className="font-bold text-primary">
              {getTotalPrice().toFixed(2)} ETH
            </span>
          </p>
          <p className="text-sm text-gray-500 mb-4">
            *Gas fees not included and will be calculated during checkout.
          </p>
          
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          
          {txHash && (
            <div className="mb-4">
              <p className="text-green-500 text-sm">Payment successful!</p>
              <a 
                href={`https://etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm hover:underline"
              >
                View transaction
              </a>
            </div>
          )}

          <button 
            className={`w-full px-4 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-accent-light transition ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={onCheckoutClick}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
