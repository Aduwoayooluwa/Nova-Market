'use client';

import CartItems from "@/app/components/cart-items";
import { useCartStore } from "@/app/stores/cart-store";

export default function CartPage() {
  const cartItems = useCartStore(state => state.items);
  return <CartItems items={cartItems} />;
}
