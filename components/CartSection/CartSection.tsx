import { CartItem } from "@/types/cart";
import CartItems from "./CartItems/CartItems";

interface Props {
  cart: CartItem[];
}

const CartSection = ({ cart }: Props) => {
  return (
    <div className="space-y-5">
      {cart.map((cartItem) => (
        <CartItems item={cartItem} key={cartItem.id} />
      ))}
    </div>
  );
};

export default CartSection;
