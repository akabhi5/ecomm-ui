"use client";

import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import toast from "react-hot-toast";

const AuthList = () => {
  const user = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getAuthStatus = async () => {
      setIsLoading(true);
      const res = await fetch("/api/is-authenticated");
      const result = await res.json();
      user.setUser(result);
      setIsLoading(false);
    };
    getAuthStatus();
  }, []);

  const logout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) {
      user.logout();
      toast.success("Logged out", { position: "bottom-right" });
      router.push("/");
    }
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
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
          </li>
          <li
            className="hover:underline cursor-pointer"
            onClick={() => logout()}
          >
            Logout
          </li>
        </>
      )}
    </>
  );
};

export default AuthList;
