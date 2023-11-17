"use client";

import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.password !== data.password2) {
      setError("password2", {
        type: "custom",
        message: "Confirm password does not match.",
      });
      return;
    }

    const url = `/api/register`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    const response = await res.json();

    if (res.ok) {
      toast.success("Registration successful. Login now!", {
        position: "bottom-right",
      });
      reset();
    } else {
      Object.keys(response).forEach((fieldName: any) => {
        setError(fieldName, {
          type: "server",
          message: response[fieldName].join(" "),
        });
      });
      toast.error("Invalid username or email", { position: "bottom-right" });
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-full px-5">
        <div className="my-5">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Email
          </label>
          <input
            id="email"
            placeholder="Email"
            type="email"
            {...register("email", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.email && (
            <span className="text-xs text-red-600">{errors.email.message}</span>
          )}
        </div>

        <div className="my-5">
          <label
            htmlFor="name"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Name
          </label>
          <input
            id="name"
            placeholder="Name"
            type="text"
            {...register("name", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.name && (
            <span className="text-xs text-red-600">{errors.name.message}</span>
          )}
          {JSON.stringify(errors.name?.types)}
        </div>

        <div className="my-5">
          <label
            htmlFor="password"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Password
          </label>
          <input
            id="password"
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.password && (
            <span className="text-xs text-red-600">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="my-5">
          <label
            htmlFor="password2"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Confirm password
          </label>
          <input
            id="password2"
            placeholder="Confirm password"
            type="password"
            {...register("password2", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.password2 && (
            <span className="text-xs text-red-600">
              {errors.password2.message}
            </span>
          )}
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Register;
