"use client";

import SectionHead from "@/components/section-head";
import Select from "@/components/select";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { useInView, motion } from "motion/react";
import useHeaderStore from "@/stores/use-header.store";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function StudentInformation() {
  const headerHeight = useHeaderStore((state) => state.height);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const mediaIconRef = useRef(null);
  const inViewMediaIcon = useInView(mediaIconRef, { once: true });

  const {
    register,
    handleSubmit,
    control,
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

  const sectionHeadData = {
    tag: "Contact Form",
    title: "Student Information",
    description:
      "If you have specific questions or wish to request more information about Little Learners Academy, please complete the contact form below. Kindly provide the following details to help us better understand your needs",
  };
  return (
    <>
      <section
        id="information"
        style={{ scrollMarginTop: `${headerHeight + 16}px` }}
      >
        <div className="container">
          <SectionHead {...sectionHeadData} />

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative mt-20"
          >
            <motion.div
              ref={mediaIconRef}
              initial={{ opacity: 0, y: 50 }}
              animate={inViewMediaIcon ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute -top-5 left-0 flex w-full justify-center gap-2"
            >
              <Link
                href={"https://www.facebook.com"}
                target="_blank"
                aria-label="facebook"
                className="bg-orange-90 hover:bg-orange-80 rounded-md border-2 px-6 py-2 transition-colors duration-300"
              >
                <Image
                  src={"svg/facebook.svg"}
                  alt="facebook icon"
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href={"https://www.twitter.com"}
                target="_blank"
                aria-label="twitter"
                className="bg-orange-90 hover:bg-orange-80 rounded-md border-2 px-6 py-2 transition-colors duration-300"
              >
                <Image
                  src={"svg/twitter.svg"}
                  alt="twitter icon"
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href={"https://www.linkedin.com"}
                target="_blank"
                aria-label="linkedin"
                className="bg-orange-90 hover:bg-orange-80 rounded-md border-2 px-6 py-2 transition-colors duration-300"
              >
                <Image
                  src={"svg/linkedin.svg"}
                  alt="linkedin icon"
                  width={20}
                  height={20}
                />
              </Link>
            </motion.div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-absolute-white rounded-lg border-2 p-5 [box-shadow:4px_4px_0px_1px_var(--absolute-black)] md:p-20"
            >
              <div className="mt-10 grid grid-cols-1 gap-10 md:mt-0 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="parentName"
                    className="text-gray-30 text-xl font-semibold"
                  >
                    Parent Name
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    {...register("parentName", {
                      required: "parent name required",
                    })}
                    placeholder="Enter Parent Name"
                    className={`bg-orange-99 rounded-md border-2 p-4 outline-none ${errors.parentName && "border-red-500"}`}
                  />
                  {errors.parentName && (
                    <p role="alert" className="text-red-500">
                      {errors.parentName.message}
                    </p>
                  )}
                </div>
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
                  <label
                    htmlFor="phoneNumber"
                    className="text-gray-30 text-xl font-semibold"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    {...register("phoneNumber", {
                      required: "phone number required",
                    })}
                    placeholder="Enter Phone Number"
                    className={`bg-orange-99 rounded-md border-2 p-4 outline-none ${errors.phoneNumber && "border-red-500"}`}
                  />
                  {errors.phoneNumber && (
                    <p role="alert" className="text-red-500">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="studentName"
                    className="text-gray-30 text-xl font-semibold"
                  >
                    Student Name
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    {...register("studentName", {
                      required: "student name required",
                    })}
                    placeholder="Enter Student Name"
                    className={`bg-orange-99 rounded-md border-2 p-4 outline-none ${errors.studentName && "border-red-500"}`}
                  />
                  {errors.studentName && (
                    <p role="alert" className="text-red-500">
                      {errors.studentName.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="studentAge"
                    className="text-gray-30 text-xl font-semibold"
                  >
                    Student Age
                  </label>
                  <input
                    type="number"
                    id="studentAge"
                    {...register("studentAge", {
                      required: "student age required",
                    })}
                    placeholder="Enter Student Age"
                    className={`bg-orange-99 rounded-md border-2 p-4 outline-none ${errors.studentAge && "border-red-500"}`}
                  />
                  {errors.studentAge && (
                    <p role="alert" className="text-red-500">
                      {errors.studentAge.message}
                    </p>
                  )}
                </div>

                <Select name="programOfInterest" control={control} />
              </div>
              <div className="mt-10 flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-gray-30 text-xl font-semibold"
                >
                  Message
                </label>
                <textarea
                  type="text"
                  id="message"
                  {...register("message")}
                  rows={5}
                  placeholder="Enter Your Message"
                  className="bg-orange-99 rounded-md border-2 p-4"
                />
              </div>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="bg-orange-75 hover:bg-orange-70 mt-10 w-full cursor-pointer rounded-lg border-2 p-4 text-2xl font-medium transition-colors duration-300"
              >
                {mutation.isPending ? "Submitting..." : "Submit"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
