'use client'

import Image from "next/image";
import React, { useRef } from "react";
import { useInView, motion } from "motion/react";

export default function OurAcademicApproach() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
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
            <button className="rounded-md border-2 px-4 py-2">Academics</button>
            <h1 className="text-center text-3xl font-bold md:text-start">
              Nurturing Young Minds for Success
            </h1>
          </div>
          <div className="w-full">
            <p className="text-center md:text-start">
              Welcome to our Academics page, where we take pride in providing a
              comprehensive and stimulating educational experience for your
              child. Our kindergarten school's academic program is thoughtfully
              designed to foster a love for learning while building a strong
              foundation of essential skills and knowledge. From language arts
              and mathematics to science and social studies, our curriculum is
              carefully crafted to spark curiosity and encourage active
              exploration.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
