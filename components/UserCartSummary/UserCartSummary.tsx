import React from "react";
import { Button } from "../ui/button";
import { CartSummary } from "@/types/cart";

interface Props {
  cartSummary: CartSummary;
  isCartSummaryLoading: boolean;
}

const UserCartSummary = ({ cartSummary, isCartSummaryLoading }: Props) => {
  return (
    <div className="p-4 flex flex-col justify-between h-full">
      <div className="underline text-sm">PRICE DETAILS</div>
      <div>
        <div className="flex justify-between">
          <div>Total MRP</div>
          <div>₹{cartSummary?.total_price?.toFixed(2)}</div>
        </div>
        <div className="flex justify-between">
          <div>Discount on MRP</div>
          <div>₹{cartSummary?.discount?.toFixed(2)}</div>
        </div>
        <div className="flex justify-between">
          <div>Shipping charge</div>
          <div>FREE</div>
        </div>
      </div>
      <div>
        <hr />
      </div>
      <div className="flex justify-between">
        <div>Total Amount</div>
        <div>₹{cartSummary?.total_price?.toFixed(2)}</div>
      </div>
      {isCartSummaryLoading ? (
        <div>
          <Button disabled={true} className="w-full">
            CALCULATING...
          </Button>
        </div>
      ) : (
        <div>
          <Button className="w-full">PLACE ORDER</Button>
        </div>
      )}
    </div>
  );
};

export default UserCartSummary;
