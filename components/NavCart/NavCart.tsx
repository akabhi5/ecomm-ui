"use client";

import { getCartItems } from "@/service/cartService";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  href: string;
}

const NavCart = ({ href }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const cart = useCartStore((cart) => cart.cart);
  const addBulk = useCartStore((cart) => cart.addBulk);

  useEffect(() => {
    const getCartItemsCall = async () => {
      const res = await getCartItems();
      addBulk(res);
    };
    setIsLoading(false);
    getCartItemsCall();
  }, [addBulk]);

  return (
    <Link href={href} className="flex items-center">
      <ShoppingBag size={20} />
      {isLoading ? "-" : <span> {cart.length}</span>}
    </Link>
  );
};

export default NavCart;
