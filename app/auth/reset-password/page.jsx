"use client";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const mutation = useMutation({
    mutationFn: async ({ password }) => {
      const res = await axios.post("/api/auth/reset-password", {
        token,
        newPassword: password,
      });
      return res.data;
    },
    onSuccess: (success) => {
      router.push("/auth/signin"); 
      reset()
    },
    onError: (error) => {
      alert(
        error?.response?.data?.error ||
          "Something went wrong. Please try again."
      );
    },
  });

  const onSubmit = (data) => {
    if (!token) {
      alert("Missing or invalid reset token.");
      return;
    }

    mutation.mutate({ password: data.password });
  };

  return (
    <div className="container">
      <div className="bg-absolute-white my-4 flex overflow-hidden rounded-lg border-2 [box-shadow:4px_4px_0px_1px_var(--absolute-black)]">
        <div className="relative lg:w-1/2 hidden lg:block">
          <Image
            src="/image/auth/signup.jpg"
            alt="signup"
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-10">
            <h1 className="mb-4 text-center text-3xl font-bold text-white">
              reset password
            </h1>
            <p className="text-center text-white">
            Set a new password for your account. Make sure it’s strong and unique.
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-absolute-white w-full lg:w-1/2 p-5 md:p-20"
        >
          <h1 className="text-center text-3xl font-bold">Reset Password</h1>
          <div className="mt-10 grid grid-cols-1 gap-10">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-gray-30 text-xl font-semibold"
              >
                Create New Password
              </label>
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
            <div className="flex flex-col gap-2">
              <label
                htmlFor="cpassword"
                className="text-gray-30 text-xl font-semibold"
              >
                Confirm New Password
              </label>
              <input
                type="text"
                id="cpassword"
                {...register("cpassword", {
                  required: "enter your password",
                  validate: (value) =>
                    value === password || "Password do not match",
                })}
                placeholder="enter your password"
                className={`bg-orange-99 rounded-md border-2 p-4 outline-none ${errors.cpassword && "border-red-500"}`}
              />
              {errors.cpassword && (
                <p role="alert" className="text-red-500">
                  {errors.cpassword.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-orange-75 hover:bg-orange-70 mt-10 w-full cursor-pointer rounded-lg border-2 p-4 text-2xl font-medium transition-colors duration-300"
          >
            {mutation.isPending ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
