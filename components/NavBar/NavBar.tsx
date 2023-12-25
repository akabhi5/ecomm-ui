import Link from "next/link";
import AuthList from "./AuthList";

const NavBar = () => {
  return (
    <nav className="p-5 flex justify-between shadow-xl">
      <div className="text-2xl font-bold">
        <Link href="/">Ecomm</Link>
      </div>
      <div>
        <ul className="flex space-x-5">
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
          <AuthList />
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
