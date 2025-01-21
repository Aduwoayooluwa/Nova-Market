import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Item } from '@/app/types/item';

interface CartItem extends Omit<Item, 'price'> {
  quantity: number;
  price: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Item) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item: Item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);
        const itemWithNumberPrice = { ...item, price: Number(item.price) };
        
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id
                ? { ...itemWithNumberPrice, quantity: i.quantity + 1 }
                : i
            ),
          };
        }
        
        return {
          items: [...state.items, { ...itemWithNumberPrice, quantity: 1 }],
        };
      }),

      removeItem: (itemId: string) => set((state) => ({
        items: state.items.filter((item) => item.id !== itemId),
      })),

      updateQuantity: (itemId: string, quantity: number) => set((state) => ({
        items: state.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        ),
      })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
); 