"use client";

import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { addItemToCart, removeItemFromCart } from "@/service/cartService";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";

interface Props {
  productSlug: string;
  selectedSize: string;
}

const AddToCart = ({ productSlug, selectedSize }: Props) => {
  const [isInCart, setIsInCart] = useState(false);
  const isAuth = useUserStore((user) => user.isAuthenticated);

  const { cart, add, change } = useCartStore();

  const addToCart = async () => {
    if (!isAuth) {
      toast.error("Please login!", { position: "bottom-right" });
      return;
    }

    if (selectedSize === "") {
      toast.error("Select a size", { position: "bottom-right" });
      return;
    }

    const defaultQuantity = 1;
    const [cartItem, res] = await addItemToCart(
      defaultQuantity,
      productSlug,
      selectedSize
    );
    if (res) {
      let itemAlreadyInCart = false;
      for (const item of cart) {
        if (
          item.product.slug === cartItem.product.slug &&
          item.size === cartItem.size
        ) {
          change(item.product.slug, item.quantity + 1, selectedSize);
          itemAlreadyInCart = true;
        }
      }

      if (!itemAlreadyInCart) {
        add(cartItem);
      }

      setIsInCart(true);
      toast.success("Added to cart!", { position: "bottom-right" });
    }
  };

  if (isInCart)
    return (
      <Link href="/cart">
        <Button>Go to cart &gt;</Button>
      </Link>
    );

  return <Button onClick={addToCart}>Add to cart</Button>;
};

export default AddToCart;
