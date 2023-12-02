import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types/cart";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { ChangeEvent } from "react";

interface Props {
  item: CartItem;
}

const allowedQuantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const url = "/api/cart";

const CartItems = ({ item }: Props) => {
  const change = useCartStore((cart) => cart.change);
  const remove = useCartStore((cart) => cart.remove);

  const changeQty = async (e: ChangeEvent<HTMLSelectElement>) => {
    const updatedQty = parseInt(e.target.value);
    const data = { quantity: updatedQty, productSlug: item.product.slug };
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      change(item.product.slug, updatedQty);
    }
  };

  const removeFromCart = async () => {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productSlug: item.product.slug }),
    });
    if (res.ok) {
      remove(item.product.slug);
    }
  };

  return (
    <div className="border rounded p-3 space-y-3 flex items-center space-x-5">
      <Link href={`/product/${item.product.slug}`}>
        <img
          src={item.product.product_images[0].url}
          alt={item.product.name}
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
        </div>
      </div>
    </div>
  );
};

export default CartItems;
