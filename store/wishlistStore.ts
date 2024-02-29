import { WishlistItem } from "@/types/wishlist";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface WishlistState {
  wishlist: WishlistItem[];
  add: (wishlistItem: WishlistItem) => void;
  addBulk: (wishlistItems: WishlistItem[]) => void;
  remove: (productSlug: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  devtools(
    persist(
      (set) => ({
        wishlist: [] as WishlistItem[],
        add: (wishlistItem: WishlistItem) =>
          set((state) => ({ wishlist: [...state.wishlist, wishlistItem] })),
        addBulk: (wishlistItem: WishlistItem[]) =>
          set(() => ({ wishlist: [...wishlistItem] })),
        remove: (productSlug: string) =>
          set((state) => {
            const wishlistData = state.wishlist.filter(
              (item) => item.product.slug !== productSlug
            );
            return { wishlist: [...wishlistData] };
          }),
      }),
      {
        name: "wishlist-store",
      }
    )
  )
);
