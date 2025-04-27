"use client";

import SectionHead from "@/components/section-head";
import Select from "@/components/select";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useInView, motion } from "motion/react";
import useHeaderStore from "@/stores/use-header.store";

export default function StudentInformation() {
  const headerHeight = useHeaderStore((state) => state.height);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const mediaIconRef = useRef(null);
  const inViewMediaIcon = useInView(mediaIconRef, { once: true });

  const [selectedProgram, setSelectedProgram] = useState("");
  const [sinfo, setsinfo] = useState({ parentName: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsinfo({ ...sinfo, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const sectionHeadData = {
    tag: "Contact Form",
    title: "Student Information",
    description:
      "If you have specific questions or wish to request more information about Little Learners Academy, please complete the contact form below. Kindly provide the following details to help us better understand your needs",
  };
  return (
    <section id="information" style={{ scrollMarginTop: `${headerHeight + 16}px` }}>
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
              className="bg-orange-90 rounded-md border-2 px-6 py-2"
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
              className="bg-orange-90 rounded-md border-2 px-6 py-2"
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
              className="bg-orange-90 rounded-md border-2 px-6 py-2"
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
            onSubmit={handleSubmit}
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
                  name="parentName"
                  value={sinfo.parentName}
                  onChange={handleChange}
                  placeholder="Enter Parent Name"
                  className="bg-orange-99 rounded-md border-2 p-4"
                />
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
                  name="emailAddress"
                  placeholder="Enter Email Address"
                  className="bg-orange-99 rounded-md border-2 p-4"
                />
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
                  name="phoneNumber"
                  placeholder="Enter Phone Number"
                  className="bg-orange-99 rounded-md border-2 p-4"
                />
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
                  name="studentName"
                  placeholder="Enter Student Name"
                  className="bg-orange-99 rounded-md border-2 p-4"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="studentAge"
                  className="text-gray-30 text-xl font-semibold"
                >
                  Student Age
                </label>
                <input
                  type="text"
                  id="studentAge"
                  name="studentAge"
                  placeholder="Enter Student Age"
                  className="bg-orange-99 rounded-md border-2 p-4"
                />
              </div>

              <Select value={selectedProgram} onChange={setSelectedProgram} />
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
                name="message"
                rows={5}
                placeholder="Enter Your Message"
                className="bg-orange-99 rounded-md border-2 p-4"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-75 mt-10 w-full rounded-lg border-2 p-4 cursor-pointer"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
