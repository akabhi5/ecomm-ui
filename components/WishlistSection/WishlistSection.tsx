import { WishlistItem } from "@/types/wishlist";
import WishlistItems from "./WishlistItems/WishlistItems";
import { HeartCrack } from "lucide-react";

interface Props {
  wishlist: WishlistItem[];
}

const WishlistSection = ({ wishlist }: Props) => {
  return (
    <>
      {wishlist.length > 0 ? (
        <div className="space-y-5">
          {wishlist.map((wishlistItem) => (
            <WishlistItems item={wishlistItem} key={wishlistItem.id} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[70vh]">
          <div>
            <div className="flex justify-center">
              <HeartCrack size={50} color="red" />
            </div>
            <div className="text-xl">Wishlist is empty!</div>
          </div>
        </div>
      )}
    </>
  );
};

export default WishlistSection;
