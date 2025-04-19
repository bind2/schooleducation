"use client";

import { useInView, motion } from "motion/react";
import React, { useRef } from "react";

export default function SectionHead({ tag, title, description }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto mt-20 flex w-full flex-col items-center justify-center gap-4 lg:w-5xl xl:mt-30"
    >
      <span className="bg-absolute-white inline-block rounded-md border-2 p-2">
        {tag}
      </span>
      <h1 className="text-center text-5xl font-bold">{title}</h1>
      <p className="text-center">{description}</p>
    </motion.div>
  );
}
