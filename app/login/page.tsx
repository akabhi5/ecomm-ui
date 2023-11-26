"use client";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useStore";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setUser = useUserStore((store) => store.setUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    const url = `/api/login`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setIsLoading(false);

    if (res.ok) {
      const user: User = await res.json();
      setUser({ isAuthenticated: true, user: user });
      toast.success("Logged in", { position: "bottom-right" });
      router.push("/");
    } else {
      toast.error("Invalid username or email", { position: "bottom-right" });
    }
  };

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-full px-5">
        <div className="my-5">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Email
          </label>
          <input
            placeholder="Email"
            type="email"
            {...register("email", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Password
          </label>
          <input
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
