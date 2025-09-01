import { CartItem } from "@/types/cart.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import userStore from "./user-store";

type CartStore = {
  cart: CartItem[];
  isCartHydrated: boolean;
  addToCart: (item: CartItem) => Promise<void>;
  deleteFromCart: (id: number, price: number) => void;
  clearCart: () => void;
};

const cartStore = (set: any, get: any): CartStore => ({
  cart: [],
  isCartHydrated: false,
  addToCart: async (item: CartItem) => {
    const getMe = userStore.getState().getMe;
    const response = await getMe();
    if (!response.success) {
      return;
    }
    set((state: CartStore) => ({
      cart: [...state.cart, item],
    }));
  },
  deleteFromCart: (id: number, price: number) => {
    set((state: CartStore) => ({
      cart: state.cart.filter((item) => {
        return item.id !== id || item.price !== price;
      }),
    }));
  },
  clearCart: () => {
    set({ cart: [] });
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
