"use client";

import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useWishlistStore } from "@/store/wishlistStore";
import {
  addItemToWishist,
  removeItemFromWishlist,
} from "@/service/wishlistService";
import { Heart } from "lucide-react";

interface Props {
  productSlug: string;
}

const AddToWishlist = ({ productSlug }: Props) => {
  const [isInCart, setIsInCart] = useState(false);

  const add = useWishlistStore((wishlist) => wishlist.add);
  const wishlist = useWishlistStore((wishlist) => wishlist.wishlist);
  const remove = useWishlistStore((wishlist) => wishlist.remove);

  useEffect(() => {
    for (const wishlistItem of wishlist) {
      if (wishlistItem.product.slug == productSlug) {
        setIsInCart(true);
        break;
      }
    }
  }, [wishlist, productSlug]);

  const addToWishlist = async () => {
    const [wishlistItem, res] = await addItemToWishist(productSlug);
    if (res) {
      add(wishlistItem);
      setIsInCart(true);
      toast.success("Added to wishlist!", { position: "bottom-right" });
    }
  };

  const removeFromCart = async () => {
    const res = await removeItemFromWishlist(productSlug);
    if (res) {
      remove(productSlug);
      setIsInCart(false);
      toast.success("Removed cart!", { position: "bottom-right" });
    }
  };

  if (isInCart)
    return (
      <Button variant="outline" onClick={removeFromCart}>
        <Heart color="red" fill="red" className="mr-2 h-4 w-4" /> Remove from
        wishlist
      </Button>
    );

  return (
    <Button variant="outline" onClick={addToWishlist}>
      <Heart className="mr-2 h-4 w-4" /> Add to wishlist
    </Button>
  );
};

export default AddToWishlist;
