import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="p-5 flex justify-between shadow-xl">
      <div className="text-2xl font-bold">
        <Link href="/">Ecomm</Link>
      </div>
      <div>
        <ul className="flex space-x-5">
          <li>Categories</li>
          <li>User</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
