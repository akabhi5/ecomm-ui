"use client";

import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types/cart";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  href: string;
}

const url = "/api/cart";

const NavCart = ({ href }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const cart = useCartStore((cart) => cart.cart);
  const addBulk = useCartStore((cart) => cart.addBulk);

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
      }
      setIsLoading(false);
    };
    getCartItems();
  }, [addBulk]);

  return (
    <Link href={href} className="flex items-center">
      <ShoppingBag size={25} />
      {isLoading ? "-" : <span> {cart.length}</span>}
    </Link>
  );
};

export default NavCart;
