"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.8, 0.25, 1] },
  },
};

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <section>
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-10 flex flex-col gap-10 md:flex-row"
        >
          <motion.div
            variants={fadeLeft}
            className="bg-orange-80 relative flex w-full items-center justify-center"
          >
            <Image
              src={`svg/svg-hero.svg`}
              width={100}
              height={100}
              alt="svg-hero"
              className="absolute h-[80%] w-[80%]"
            />
            <Image
              src={`/image/hero-image.png`}
              width={100}
              height={100}
              alt="hero-img"
              className="h-full w-full object-cover"
            />

            {/* node circles */}
            {[
              "-top-1 -left-1",
              "-top-1 -right-1",
              "-bottom-1 -left-1",
              "-bottom-1 -right-1",
            ].map((pos, idx) => (
              <div
                key={idx}
                className={`bg-absolute-white absolute ${pos} z-10 h-5 w-5 rounded-full border-2`}
              ></div>
            ))}

            {/* node lines */}
            <div className="bg-orange-80 absolute top-0 right-4 left-0 p-1">
              <div className="bg-absolute-black h-[2px] w-full"></div>
            </div>
            <div className="bg-orange-80 absolute top-0 right-0 bottom-0 p-1">
              <div className="bg-absolute-black h-full w-[2px]"></div>
            </div>
            <div className="bg-orange-80 absolute right-0 bottom-0 left-0 p-1">
              <div className="bg-absolute-black h-[2px] w-full"></div>
            </div>
            <div className="bg-orange-80 absolute top-0 bottom-0 left-0 p-1">
              <div className="bg-absolute-black h-full w-[2px]"></div>
            </div>
          </motion.div>

          <div className="flex w-full flex-col justify-center">
            <motion.span
              variants={fadeUp}
              className="text-center text-lg font-medium underline underline-offset-10 md:text-start"
            >
              Welcome to Little Learners Academy
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-center text-4xl font-extrabold md:text-start"
            >
              Where Young Minds Blossom and{" "}
              <span className="text-orange-65">Dreams Take Flight.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-gray-20 mt-5 text-center md:text-start"
            >
              Our kinder garden school provides a nurturing and stimulating
              environment, fostering a love for learning that lasts a lifetime.
              Join us as we embark on an exciting educational journey together!
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="bg-orange-95 mt-10 flex w-full flex-col gap-4 rounded-lg border-2 p-5 [box-shadow:4px_4px_0px_1px_var(--orange-80)] sm:flex-row"
            >
              <div className="flex w-full flex-col items-center border-b-2 py-4 text-center sm:border-none lg:border-b-2">
                <span className="text-4xl font-extrabold">+7000</span>
                <span className="font-medium">Students Passed Out</span>
              </div>
              <div className="flex w-full flex-col items-center border-b-2 py-4 text-center sm:border-none">
                <span className="text-4xl font-extrabold">+37</span>
                <span className="font-medium">Awards & Recognitions</span>
              </div>
              <div className="flex w-full flex-col items-center py-4 text-center">
                <span className="text-4xl font-extrabold">+15</span>
                <span className="font-medium">Experience Educators</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
