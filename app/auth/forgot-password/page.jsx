"use client";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";

export default function ForgotPasswordForm() {
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
            Forgot your password?
            </h1>
            <p className="text-center text-white">
            Don’t worry. Enter your registered email address and we’ll send you instructions to reset your password.
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-absolute-white w-1/2 p-5 md:p-20"
        >
          <h1 className="text-center text-3xl font-bold">Forgot Password</h1>
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
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-orange-75 hover:bg-orange-70 mt-10 w-full cursor-pointer rounded-lg border-2 p-4 text-2xl font-medium transition-colors duration-300"
          >
            {mutation.isPending ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
