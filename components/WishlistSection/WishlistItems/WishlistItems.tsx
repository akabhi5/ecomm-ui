import { Button } from "@/components/ui/button";
import { removeItemFromWishlist } from "@/service/wishlistService";
import { useWishlistStore } from "@/store/wishlistStore";
import { WishlistItem } from "@/types/wishlist";
import { Trash2 } from "lucide-react";
import Link from "next/link";

interface Props {
  item: WishlistItem;
}

const WishlistItems = ({ item }: Props) => {
  const remove = useWishlistStore((wishlist) => wishlist.remove);

  const removeFromCart = async () => {
    const res = await removeItemFromWishlist(item.product.slug);
    if (res) {
      remove(item.product.slug);
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
        <Button variant="outline" size="icon" onClick={removeFromCart}>
          <Trash2 color="red" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WishlistItems;
