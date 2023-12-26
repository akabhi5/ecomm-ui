import { CartItem } from "@/types/cart";
import { create } from "zustand";

interface CartState {
  cart: CartItem[];
  add: (cartItem: CartItem) => void;
  addBulk: (cartItems: CartItem[]) => void;
  remove: (productSlug: string) => void;
  change: (productSlug: string, quantity: number) => void;
}

function updateQuantityBySlug(
  cartItemsArr: CartItem[],
  targetSlug: string,
  newQuantity: number
) {
  let newArray = [...cartItemsArr];
  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i].product.slug === targetSlug) {
      newArray[i].quantity = newQuantity;
      break;
    }
  }
  return newArray;
}

export const useCartStore = create<CartState>()((set) => ({
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
  change: (productSlug: string, quantity: number) =>
    set((state) => {
      const updatedCart = updateQuantityBySlug(
        state.cart,
        productSlug,
        quantity
      );
      return { cart: [...updatedCart] };
    }),
}));
