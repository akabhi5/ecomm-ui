"use client";

import { useCartStore } from "@/store/cartStore";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

interface Props {
  href: string;
}

const NavCart = ({ href }: Props) => {
  const cart = useCartStore((cart) => cart.cart);

  return (
    <Link href={href} className="flex items-center">
      <ShoppingBag size={25} /> {cart.length}
    </Link>
  );
};

export default NavCart;
