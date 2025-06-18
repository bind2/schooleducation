"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SigninForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      alert(res.error || "Login failed!");
    }

    reset();
  };

  return (
    <div className="container">
      <div className="bg-absolute-white my-4 flex overflow-hidden rounded-lg border-2 [box-shadow:4px_4px_0px_1px_var(--absolute-black)]">
        <div className="relative hidden lg:block lg:w-1/2">
          <Image
            src="/image/auth/signup.jpg"
            alt="signup"
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-10">
            <h1 className="mb-4 text-center text-3xl font-bold text-white">
              Welcome back!
            </h1>
            <p className="text-center text-white">
              Enter your credentials to access your admin dashboard. Make sure
              you use your registered email address
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-absolute-white w-full p-5 md:p-20 lg:w-1/2"
        >
          <h1 className="text-center text-3xl font-bold">Sign In</h1>
          <div className="mt-10 grid grid-cols-1 gap-10">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-gray-30 text-xl font-semibold"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email Address is required",
                })}
                placeholder="Enter Email Address"
                className={`bg-orange-99 rounded-md border-2 p-4 outline-none ${errors.email && "border-red-500"}`}
              />
              {errors.email && (
                <p role="alert" className="text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-gray-30 text-xl font-semibold"
                >
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="block text-sm text-blue-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type="text"
                id="password"
                {...register("password", {
                  required: "enter your password",
                })}
                placeholder="enter your password"
                className={`bg-orange-99 rounded-md border-2 p-4 outline-none ${errors.password && "border-red-500"}`}
              />
              {errors.password && (
                <p role="alert" className="text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>

          <button
            type="submit"
            // disabled={mutation.isPending}
            className="bg-orange-75 hover:bg-orange-70 mt-10 w-full cursor-pointer rounded-lg border-2 p-4 text-2xl font-medium transition-colors duration-300"
          >
            {/* {mutation.isPending ? "Signing in..." : "Sign In"} */}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
