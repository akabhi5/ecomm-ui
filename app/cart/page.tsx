"use client";

import CartSection from "@/components/CartSection/CartSection";
import UserCartSummary from "@/components/UserCartSummary/UserCartSummary";
import { getCartSummary } from "@/service/cartService";
import { useCartStore } from "@/store/cartStore";
import { CartSummary } from "@/types/cart";
import { useEffect, useState } from "react";

const Cart = () => {
  const cart = useCartStore((cart) => cart.cart);
  const [cartSummary, setCartSummary] = useState<CartSummary>(
    {} as CartSummary
  );
  const [reloadCartFlag, setReloadCartFlag] = useState(false);
  const [isCartSummaryLoading, setIsCartSummaryLoading] = useState(false);

  const updateCartSummary = () => {
    setReloadCartFlag((prev) => !prev);
  };

  useEffect(() => {
    const fetchCartSummary = async () => {
      setIsCartSummaryLoading(true);
      const res = await getCartSummary();
      setCartSummary(res);
      setIsCartSummaryLoading(false);
    };
    fetchCartSummary();
  }, [reloadCartFlag]);

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="my-5 text-4xl">Cart</h1>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 rounded">
          <CartSection
            cart={cart}
            cartSummary={cartSummary}
            updateCartSummary={updateCartSummary}
            isCartSummaryLoading={isCartSummaryLoading}
          />
        </div>
        <div className="col-span-4 border rounded h-60">
          <UserCartSummary
            cartSummary={cartSummary}
            isCartSummaryLoading={isCartSummaryLoading}
          />
        </div>
      </div>
    </section>
  );
};

export default Cart;
