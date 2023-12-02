"use client";

import CartSection from "@/components/CartSection/CartSection";
import UserCartSummary from "@/components/UserCartSummary/UserCartSummary";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";

const Cart = () => {
  const cart = useCartStore((cart) => cart.cart);

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="my-5 text-4xl">Cart</h1>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 rounded">
          <CartSection cart={cart} />
        </div>
        <div className="col-span-4 border rounded">
          <UserCartSummary />
        </div>
      </div>
    </section>
  );
};

export default Cart;
