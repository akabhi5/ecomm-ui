"use client";

import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types/cart";
import { useEffect, useState } from "react";
import { addItemToCart } from "@/service/cartService";

interface Props {
  productSlug: string;
}

const AddToCart = ({ productSlug }: Props) => {
  const [isInCart, setIsInCart] = useState(false);

  const add = useCartStore((cart) => cart.add);
  const cart = useCartStore((cart) => cart.cart);
  const remove = useCartStore((cart) => cart.remove);
  const url = "/api/cart";

  useEffect(() => {
    for (const cartItem of cart) {
      if (cartItem.product.slug == productSlug) {
        setIsInCart(true);
      }
    }
  }, [cart, productSlug]);

  const addToCart = async () => {
    const defaultQuantity = 1;
    const [cartItem, res] = await addItemToCart(defaultQuantity, productSlug);
    if (res) {
      add(cartItem);
      setIsInCart(true);
      toast.success("Added to cart!", { position: "bottom-right" });
    }
  };

  const removeFromCart = async () => {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productSlug: productSlug }),
    });
    if (res.ok) {
      remove(productSlug);
      setIsInCart(false);
      toast.success("Removed cart!", { position: "bottom-right" });
    }
  };

  if (isInCart)
    return <Button onClick={removeFromCart}>Remove from cart</Button>;

  return <Button onClick={addToCart}>Add to cart</Button>;
};

export default AddToCart;
