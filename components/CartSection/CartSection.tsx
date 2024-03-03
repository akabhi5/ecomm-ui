import { CartItem, CartSummary } from "@/types/cart";
import CartItems from "./CartItems/CartItems";

interface Props {
  cart: CartItem[];
  cartSummary: CartSummary;
  updateCartSummary: () => void;
  isCartSummaryLoading: boolean;
}

const CartSection = ({
  cart,
  cartSummary,
  updateCartSummary,
  isCartSummaryLoading,
}: Props) => {
  return (
    <div className="space-y-5 h-[70vh] overflow-auto">
      {cart.map((cartItem) => (
        <CartItems
          item={cartItem}
          key={cartItem.id}
          cartSummary={cartSummary}
          updateCartSummary={updateCartSummary}
          isCartSummaryLoading={isCartSummaryLoading}
        />
      ))}
    </div>
  );
};

export default CartSection;
