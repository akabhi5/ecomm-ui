import { getWishistItems } from "@/service/wishlistService";
import { useWishlistStore } from "@/store/wishlistStore";
import { WishlistItem } from "@/types/wishlist";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  href: string;
}

const NavWishlist = ({ href }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const wishlist = useWishlistStore((wishlist) => wishlist.wishlist);
  const addBulk = useWishlistStore((wishlist) => wishlist.addBulk);

  useEffect(() => {
    const getWishlistItemsCall = async () => {
      const res: WishlistItem[] = await getWishistItems();
      addBulk(res);
    };
    setIsLoading(false);
    getWishlistItemsCall();
  }, [addBulk]);

  return (
    <Link href={href} className="flex items-center">
      <Heart size={20} />
      {!isLoading && wishlist.length > 0 && (
        <div className="text-xs -mt-4 -ml-1 font-bold bg-red-500 rounded-full text-white h-5 w-5 flex items-center justify-center">
          {wishlist.length}
        </div>
      )}
    </Link>
  );
};

export default NavWishlist;
