"use client";

import { addItemToCart } from "@/service/cartService";
import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

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
        <Button>
          Go to cart <ChevronRight className="h-4 w-4 -mb-1" />
        </Button>
      </Link>
    );

  return <Button onClick={addToCart}>Add to cart</Button>;
};

export default AddToCart;
