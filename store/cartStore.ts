import { CartItem } from "@/types/cart";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CartState {
  cart: CartItem[];
  add: (cartItem: CartItem) => void;
  addBulk: (cartItems: CartItem[]) => void;
  remove: (productSlug: string, size: string) => void;
  change: (productSlug: string, quantity: number, size: string) => void;
}

function updateQuantityBySlug(
  cartItemsArr: CartItem[],
  targetSlug: string,
  newQuantity: number,
  size: string
): CartItem[] {
  let newArray = [...cartItemsArr];
  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i].product.slug === targetSlug && newArray[i].size === size) {
      newArray[i].quantity = newQuantity;
      break;
    }
  }
  return newArray;
}

function removeItem(
  cartItemsArr: CartItem[],
  targetSlug: string,
  size: string
): CartItem[] {
  const cartData: CartItem[] = [];
  let newArray = [...cartItemsArr];
  for (const item of newArray) {
    if (item.product.slug === targetSlug && item.size === size) {
      continue;
    }
    cartData.push(item);
  }
  return cartData;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        cart: [] as CartItem[],
        add: (cartItem: CartItem) =>
          set((state) => ({ cart: [...state.cart, cartItem] })),
        addBulk: (cartItems: CartItem[]) =>
          set(() => ({ cart: [...cartItems] })),
        remove: (productSlug: string, size: string) =>
          set((state) => {
            const updatedCart = removeItem(state.cart, productSlug, size);
            return { cart: [...updatedCart] };
          }),
        change: (productSlug: string, quantity: number, size: string) =>
          set((state) => {
            const updatedCart = updateQuantityBySlug(
              state.cart,
              productSlug,
              quantity,
              size
            );
            return { cart: [...updatedCart] };
          }),
      }),
      {
        name: "cart-store",
      }
    )
  )
);
