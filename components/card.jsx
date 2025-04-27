"use client";

import { useInView, motion } from "motion/react";
import Image from "next/image";
import React, { useRef } from "react";

export default function Card({ icon, title, content }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-absolute-white relative h-full rounded-lg border-2 p-7 [box-shadow:4px_4px_0px_1px_var(--absolute-black)]"
    >
      <div className="bg-orange-90 absolute -top-[28px] flex h-14 w-14 items-center justify-center rounded-lg border-2">
        <Image src={icon} alt="graduationHat" width={24} height={24} />
      </div>
      <h2 className="mt-4 mb-4 text-xl font-bold">{title}</h2>
      <p>{content}</p>
    </motion.div>
  );
}
