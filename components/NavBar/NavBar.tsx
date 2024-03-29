import Link from "next/link";
import AuthList from "./AuthList";
import { Crown } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="p-5 flex justify-between shadow-xl">
      <div className="text-2xl font-bold">
        <Link href="/" className="flex items-center space-x-2">
          <Crown fill="black" size={25} />
          <div>Ecomm</div>
        </Link>
      </div>
      <div className="flex">
        <div className="mr-3">
          <ul className="flex space-x-5">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:underline">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:underline">
                Brands
              </Link>
            </li>
          </ul>
        </div>
        <div className="mr-2">&bull;</div>
        <div className="mr-3">
          <AuthList />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
