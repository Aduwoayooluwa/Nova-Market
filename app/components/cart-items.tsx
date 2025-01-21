/* eslint-disable @next/next/no-img-element */
"use client";

import { FC, useState } from "react";
import { useCartStore } from "@/app/stores/cart-store";
import { useCheckout } from "@/app/hooks/useCheckout";
import { Spin } from "antd";
import Link from "next/link";

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
      <div className="py-6 px-4 lg:py-10 lg:px-20 bg-background min-h-[70vh] pt-20 flex flex-col items-center justify-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6">Your Cart</h2>
        <p className="text-gray-600 mb-4">Your cart is empty. Start shopping now!</p>
        <Link 
          href="/"
          className="px-6 py-2 bg-accent text-primary rounded-lg hover:bg-accent-light transition"
        >
          Browse Products
        </Link>
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
    <div className="py-6 px-4 lg:py-10 lg:px-20 bg-gray-100 min-h-screen">
      <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6">Your Cart ({items.length} {items.length === 1 ? 'item' : 'items'})</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        {/* Items Section */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-4 rounded-lg shadow-md space-y-4 sm:space-y-0 hover:shadow-lg transition-shadow duration-200"
            >
              {/* Image with loading state */}
              <div className="relative w-full sm:w-20 h-40 sm:h-20">
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-lg object-cover w-full h-full"
                  loading="lazy"
                />
              </div>

              {/* Details */}
              <div className="flex-1 sm:ml-4">
                <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-lg font-semibold text-accent">
                  {item.price} {item.currency}
                </p>
              </div>

              {/* Enhanced Quantity Controls */}
              <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  className="px-4 sm:px-2 py-2 sm:py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors disabled:opacity-50"
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  disabled={item.quantity <= 1}
                  aria-label={`Decrease quantity of ${item.title}`}
                >
                  -
                </button>
                <span className="px-4 py-2 bg-gray-100 rounded" aria-label="Quantity">
                  {item.quantity}
                </span>
                <button
                  className="px-4 sm:px-2 py-2 sm:py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label={`Increase quantity of ${item.title}`}
                >
                  +
                </button>

                <button
                  className="sm:ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.title} from cart`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Summary Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-4 lg:mt-0 sticky top-4">
          <h3 className="text-lg font-bold text-primary mb-4">Cart Summary</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">{getTotalPrice().toFixed(4)} ETH</span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between">
                <span className="font-bold text-primary">Total:</span>
                <span className="font-bold text-primary">{getTotalPrice().toFixed(4)} ETH</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            *Gas fees not included and will be calculated during checkout.
          </p>
          
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md mb-4">
              {error}
            </div>
          )}
          
          {txHash && (
            <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md mb-4">
              <p className="font-medium">Payment successful! 🎉</p>
              <Link
                href={`https://etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/70 underline text-sm inline-flex items-center gap-1"
              >
                View transaction
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          )}

          <button 
            className={`w-full px-4 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-accent-light transition-colors focus:ring-2 focus:ring-accent focus:ring-opacity-50 flex items-center justify-center gap-2 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={onCheckoutClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spin size="large" className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Proceed to Checkout'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
