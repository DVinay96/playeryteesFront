import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string;
  name: string;
  image: string;
  quantity: number;
  color: string;
  size: string;
  prices: { quantity: string; price: string }[];
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string, color: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const exists = get().items.find(
          (i) =>
            i.id === newItem.id &&
            i.size === newItem.size &&
            i.color === newItem.color
        );

        if (exists) {
          set({
            items: get().items.map((i) =>
              i.id === newItem.id &&
              i.size === newItem.size &&
              i.color === newItem.color
                ? { ...i, quantity: i.quantity + newItem.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, newItem] });
        }
      },
      removeItem: (id, size, color) => {
        set({
          items: get().items.filter(
            (i) => !(i.id === id && i.size === size && i.color === color)
          ),
        });
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
