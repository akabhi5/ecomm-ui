"use client";

import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import toast from "react-hot-toast";
import NavCart from "../NavCart/NavCart";
import { getUserObj, logout } from "@/service/authService";

const AuthList = () => {
  const user = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getAuthStatus = async () => {
      setIsLoading(true);
      const result = await getUserObj();
      user.setUser(result);
      setIsLoading(false);
    };
    getAuthStatus();
  }, []);

  const logoutAction = async () => {
    await logout();
    user.logout();
    toast.success("Logged out", { position: "bottom-right" });
    router.push("/");
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      {!user.isAuthenticated && (
        <>
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
        </>
      )}

      {user.isAuthenticated && (
        <>
          <li>
            <NavCart href="/cart" />
          </li>
          <li>
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
          </li>
          <li
            className="hover:underline cursor-pointer"
            onClick={() => logoutAction()}
          >
            Logout
          </li>
        </>
      )}
    </>
  );
};

export default AuthList;
