"use client";

import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { getUserObj } from "@/service/authService";
import { useEffect, useState } from "react";
import NavCart from "../NavCart/NavCart";
import NavWishlist from "../NavWishlist/NavWishlist";
import Spinner from "../Spinner/Spinner";
import UserActions from "./UserActions";

const AuthList = () => {
  const user = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAuthStatus = async () => {
      setIsLoading(true);
      const result = await getUserObj();
      user.setUser(result);
      setIsLoading(false);
    };
    getAuthStatus();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div>
      {!user.isAuthenticated && (
        <ul className="flex space-x-5">
          <li>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </li>
        </ul>
      )}

      {user.isAuthenticated && (
        <ul className="flex space-x-5 items-center ">
          <li>
            <UserActions />
          </li>
          <li>
            <NavWishlist href="/wishlist" />
          </li>
          <li>
            <NavCart href="/cart" />
          </li>
        </ul>
      )}
    </div>
  );
};

export default AuthList;
