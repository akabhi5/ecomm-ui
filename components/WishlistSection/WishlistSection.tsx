import { WishlistItem } from "@/types/wishlist";
import WishlistItems from "./WishlistItems/WishlistItems";

interface Props {
  wishlist: WishlistItem[];
}

const WishlistSection = ({ wishlist }: Props) => {
  return (
    <div className="space-y-5">
      {wishlist.map((wishlistItem) => (
        <WishlistItems item={wishlistItem} key={wishlistItem.id} />
      ))}
    </div>
  );
};

export default WishlistSection;
