import { CartItem } from "@/types/cart.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartStore = {
  cart: CartItem[];
  isCartHydrated: boolean;
  addToCart: (item: CartItem) => void;
  deleteFromCart: (id: number) => void;
};

const cartStore = (set: any): CartStore => ({
  cart: [],
  isCartHydrated: false,
  addToCart: (item: CartItem) => {
    set((state: CartStore) => ({
      cart: [...state.cart, item],
    }));
  },
  deleteFromCart: (id: number) => {
    set((state: CartStore) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },
});

export default create<CartStore>()(
  persist(cartStore, {
    name: "cart",
    onRehydrateStorage: () => (state) => {
      if (state) state.isCartHydrated = true;
    },
  })
);
