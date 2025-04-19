"use client";

import { useInView, motion } from "motion/react";
import Image from "next/image";
import React, { useRef } from "react";

export default function AboutLittleLearners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  return (
    <section>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-absolute-white relative mt-5 flex flex-col gap-5 rounded-lg border-2 px-5 py-10 [box-shadow:4px_4px_0px_1px_var(--absolute-black)] md:px-15 md:py-20 lg:flex-row"
        >
          <Image
            src={"svg/pattern-icon.svg"}
            alt="pattern icon"
            width={100}
            height={100}
            className="absolute top-0 left-0"
          />
          <div className="flex w-full flex-col items-center justify-center gap-4 lg:items-start">
            <button className="rounded-md border-2 px-4 py-2">Overview</button>
            <h1 className="text-center text-3xl font-bold md:text-start">
              Welcome to Little Learners Academy
            </h1>
          </div>
          <div className="w-full">
            <p className="text-center md:text-start">
              A leading kinder garden school dedicated to providing a nurturing
              and stimulating environment for young learners. With a commitment
              to excellence in early education, we believe in shaping curious
              minds and building a strong foundation for a lifelong love of
              learning. Our holistic approach fosters intellectual, social,
              emotional, and physical development, ensuring that each child
              reaches their full potential.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
