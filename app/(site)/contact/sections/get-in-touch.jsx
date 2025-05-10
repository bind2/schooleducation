"use client";

import useHeaderStore from "@/stores/use-header.store";
import { useInView, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

export default function GetInTouch() {
  const headerHeight = useHeaderStore((state) => state.height);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section
      id="map-and-direction"
      style={{ scrollMarginTop: `${headerHeight + 16}px` }}
    >
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-absolute-white relative mt-5 flex flex-col gap-5 rounded-lg border-2 px-5 py-10 [box-shadow:4px_4px_0px_1px_var(--absolute-black)] md:px-15 md:py-20 lg:flex-row lg:justify-between"
        >
          <Image
            src={"svg/pattern-icon.svg"}
            alt="pattern icon"
            width={100}
            height={100}
            className="absolute top-0 left-0"
          />
          <div className="flex w-full flex-col items-center justify-center gap-4 lg:items-start">
            <button className="rounded-md border-2 px-4 py-2">
              Contact Us
            </button>
            <h1 className="text-center text-3xl font-bold md:text-start">
              Feel Free To Connect With Us
            </h1>
          </div>
          <div className="w-full">
            <p className="text-center md:text-start">
              We value open communication and are eager to assist you with any
              inquiries. Feel free to reach out to us through any of the
              following contact methods
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
              <Link
                href={`mailto:deepak7890bind@gmail.com`}
                className="group flex w-full items-center gap-2 rounded-lg border-2 p-2 hover:underline"
              >
                <div className="bg-orange-97 group-hover:bg-orange-90 transition-colors duration-300 flex min-h-[30px] min-w-[30px] items-center justify-center rounded-sm border-2 p-1">
                  <Image
                    src={"svg/mail.svg"}
                    alt="mail icon"
                    width={20}
                    height={20}
                  />
                </div>
                <span>deepak7890bind@gmail.com</span>
              </Link>
              <Link
                href={`tel:+917722072980`}
                className="group flex w-full items-center gap-2 rounded-lg border-2 p-2 hover:underline"
              >
                <div className="bg-orange-97 group-hover:bg-orange-90 transition-colors duration-300 flex min-h-[30px] min-w-[30px] items-center justify-center rounded-sm border-2 p-1">
                  <Image
                    src={"svg/phone.svg"}
                    alt="mail icon"
                    width={20}
                    height={20}
                  />
                </div>
                <span>+917722072980</span>
              </Link>
              <Link
                href="https://www.google.com/maps"
                target="_blank"
                className="group flex w-full items-center gap-2 rounded-lg border-2 p-2 hover:underline"
              >
                <div className="bg-orange-97 group-hover:bg-orange-90 transition-colors duration-300 flex min-h-[30px] min-w-[30px] items-center justify-center rounded-sm border-2 p-1">
                  <Image
                    src={"svg/location-mark.svg"}
                    alt="mail icon"
                    width={20}
                    height={20}
                  />
                </div>
                <span>Somewhere in the World</span>
              </Link>
              <div className="flex w-full items-center gap-2 rounded-lg border-2 p-2">
                <div className="bg-orange-97 flex min-h-[30px] min-w-[30px] items-center justify-center rounded-sm border-2 p-1">
                  <Image
                    src={"svg/clock-icon.svg"}
                    alt="mail icon"
                    width={20}
                    height={20}
                  />
                </div>
                <span>Office Hours - 9am - 6 pm</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
