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
      <Heart size={25} />
      {isLoading ? "-" : <span> {wishlist.length}</span>}
    </Link>
  );
};

export default NavWishlist;
