"use client";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post("/api/students", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    },
    onSuccess: (success) => {
      alert(success.message);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const onSubmit = async (data) => {
    await mutation.mutateAsync(data);
    reset();
  };
  return (
    <div className="container">
      <div className="bg-absolute-white my-4 flex overflow-hidden rounded-lg border-2 [box-shadow:4px_4px_0px_1px_var(--absolute-black)]">
        <div className="relative w-1/2">
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
          className="bg-absolute-white w-1/2 p-5 md:p-20"
        >
          <h1 className="text-center text-3xl font-bold">Sign In</h1>
          <div className="mt-10 grid grid-cols-1 gap-10">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="emailAddress"
                className="text-gray-30 text-xl font-semibold"
              >
                Email Address
              </label>
              <input
                type="email"
                id="emailAddress"
                {...register("emailAddress", {
                  required: "Email Address is required",
                })}
                placeholder="Enter Email Address"
                className={`bg-orange-99 rounded-md border-2 p-4 outline-none ${errors.emailAddress && "border-red-500"}`}
              />
              {errors.emailAddress && (
                <p role="alert" className="text-red-500">
                  {errors.emailAddress.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-gray-30 text-xl font-semibold"
                >
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="block text-blue-500 hover:underline text-sm"
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
            disabled={mutation.isPending}
            className="bg-orange-75 hover:bg-orange-70 mt-10 w-full cursor-pointer rounded-lg border-2 p-4 text-2xl font-medium transition-colors duration-300"
          >
            {mutation.isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
