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
      {!isLoading && cart.length > 0 && (
        <div className="text-xs -mt-4 -ml-1 font-bold bg-red-500 rounded-full text-white h-5 w-5 flex items-center justify-center">
          {cart.length}
        </div>
      )}
    </Link>
  );
};

export default NavCart;
