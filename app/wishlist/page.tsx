"use client";

import WishlistSection from "@/components/WishlistSection/WishlistSection";
import { useWishlistStore } from "@/store/wishlistStore";

const WislistPage = () => {
  const wishlistItems = useWishlistStore((wishlist) => wishlist.wishlist);

  return (
    <section className="max-w-7xl mx-auto px-5">
      <h1 className="my-5 text-4xl">Wishlist</h1>

      <div className="w-7xl">
        <div className="rounded">
          <WishlistSection wishlist={wishlistItems} />
        </div>
      </div>
    </section>
  );
};

export default WislistPage;
