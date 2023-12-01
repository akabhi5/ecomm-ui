"use client";

import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types/cart";
import { useEffect, useState } from "react";

interface Props {
  productSlug: string;
}

const AddToCart = ({ productSlug }: Props) => {
  const [isInCart, setIsInCart] = useState(false);

  const add = useCartStore((cart) => cart.add);
  const addBulk = useCartStore((cart) => cart.addBulk);
  const remove = useCartStore((cart) => cart.remove);
  const url = "/api/cart";

  useEffect(() => {
    const getCartItems = async () => {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const responseData: CartItem[] = await res.json();
        addBulk(responseData);

        for (const cartItem of responseData) {
          if (cartItem.product.slug == productSlug) {
            setIsInCart(true);
          }
        }
      }
    };
    getCartItems();
  }, [addBulk, productSlug]);

  const addToCart = async () => {
    const data = { quantity: 1, product_slug: productSlug };
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const responseData: CartItem = await res.json();
      add(responseData);
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
