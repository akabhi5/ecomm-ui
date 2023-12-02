import { CartItem } from "@/types/cart";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
const myMiddlewares = (f: any) => devtools(persist(f, { name: "bearStore" }));

interface CartState {
  cart: CartItem[];
  add: (cartItem: CartItem) => void;
  addBulk: (cartItems: CartItem[]) => void;
  remove: (productSlug: string) => void;
  change: (productSlug: string, quantity: number) => void;
}

export const useCartStore = create<CartState>()(
  myMiddlewares((set) => ({
    cart: [] as CartItem[],
    add: (cartItem: CartItem) =>
      set((state) => ({ cart: [...state.cart, cartItem] })),
    addBulk: (cartItems: CartItem[]) =>
      set((state) => ({ cart: [...cartItems] })),
    remove: (productSlug: string) =>
      set((state) => {
        const cartData = state.cart.filter(
          (item) => item.product.slug !== productSlug
        );
        return { cart: [...cartData] };
      }),
    change: (productSlug: string, quantity: number) => set((state) => []),
  }))
);
