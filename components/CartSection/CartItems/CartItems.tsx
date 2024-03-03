import { Button } from "@/components/ui/button";
import {
  changeQuantityOfCartItem,
  removeItemFromCart,
} from "@/service/cartService";
import { useCartStore } from "@/store/cartStore";
import { CartItem, CartSummary, CartSummaryProductInfo } from "@/types/cart";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  item: CartItem;
  cartSummary: CartSummary;
  updateCartSummary: () => void;
  isCartSummaryLoading: boolean;
}

const allowedQuantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const CartItems = ({
  item,
  cartSummary,
  updateCartSummary,
  isCartSummaryLoading,
}: Props) => {
  const change = useCartStore((cart) => cart.change);
  const remove = useCartStore((cart) => cart.remove);
  const [productInfo, setProductInfo] = useState<CartSummaryProductInfo>(
    {} as CartSummaryProductInfo
  );

  useEffect(() => {
    const product_info = cartSummary?.product_info?.filter(
      (product) =>
        product.product_id === item.product.id && product.size === item.size
    )[0];
    setProductInfo(product_info);
  }, [cartSummary?.product_info, item.product.id, item.size]);

  const changeQty = async (e: ChangeEvent<HTMLSelectElement>) => {
    const updatedQty = parseInt(e.target.value);
    const res = await changeQuantityOfCartItem(
      updatedQty,
      item.product.slug,
      item.size
    );
    if (res) {
      updateCartSummary();
      change(item.product.slug, updatedQty, item.size);
    }
  };

  const removeFromCart = async () => {
    const res = await removeItemFromCart(item.product.slug, item.size);
    if (res) {
      updateCartSummary();
      remove(item.product.slug, item.size);
    }
  };

  return (
    <div className="border rounded p-3 space-y-3 flex items-center space-x-5">
      <Link href={`/product/${item.product.slug}`}>
        <img
          src={item?.product?.product_images[0].url}
          alt={item?.product?.name}
          className="w-[100px] h-[130px]"
        />
      </Link>

      <div className="flex flex-col space-y-5">
        <Link href={`/product/${item.product.slug}`}>
          <h3 className="text-xl">{item.product.name}</h3>
        </Link>
        <div className="flex space-x-4 items-center">
          <div>Quantity: </div>
          <select
            defaultValue={item.quantity}
            onChange={changeQty}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2"
          >
            {allowedQuantities.map((qty) => (
              <option value={qty} key={qty}>
                {qty}
              </option>
            ))}
          </select>
          <Button variant="outline" size="icon" onClick={removeFromCart}>
            <Trash2 color="red" className="h-4 w-4" />
          </Button>
          {isCartSummaryLoading ? (
            <div>...</div>
          ) : (
            <code className="border px-2 rounded">
              ₹{(productInfo?.price / item.quantity)?.toFixed(2)} x{" "}
              {item.quantity} = ₹{productInfo?.price?.toFixed(2)}
            </code>
          )}
        </div>
        <div className="border-2 px-2 rounded-xl w-20 bg-slate-200">
          Size: {item.size.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
