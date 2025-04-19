"use client";

import SectionHead from "@/components/section-head";
import Image from "next/image";
import React, { useRef } from "react";
import { useInView, motion } from "motion/react";

export default function TeamMembers() {
  const sectionHeadData = {
    tag: "Our Teachers With Experties",
    title: "Our Team Members",
    description:
      "At Little Learners Academy, our teaching team is the heart of our educational journey. We take great pride in employing highly qualified and passionate educators who possess a deep understanding of early childhood development.",
  };
  return (
    <section id="teachers" className="scroll-mt-35">
      <div className="container">
        <SectionHead {...sectionHeadData} />

        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
          {Array.from({ length: 6 }).map((_, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: false });
            return (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                key={i}
                className="bg-absolute-white rounded-lg border-2 p-5 [box-shadow:4px_4px_0px_1px_var(--absolute-black)] lg:p-10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-orange-97 h-14 w-14 rounded-md border-2 lg:h-20 lg:w-20">
                      <Image
                        src={"/image/user-1.png"}
                        alt="user"
                        width={56}
                        height={56}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-extrabold lg:text-2xl">
                      Ms. Sarah Anderson
                    </h3>
                  </div>
                  <div className="bg-orange-90 flex h-12 w-12 items-center justify-center rounded-md border-2">
                    <Image
                      src={"svg/mail-icon-2.svg"}
                      alt="mail icon"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                <div className="bg-orange-97 mt-6 rounded-lg border-2 p-4">
                  <span className="text-xl font-semibold">
                    Qualification:Bachelor's Degree in Early Childhood Education
                  </span>
                  <p className="mt-4">
                    Ms. Sarah is a passionate educator with over 10 years of
                    experience in guiding young minds. Her warm and nurturing
                    approach creates a welcoming classroom environment where
                    children feel comfortable to explore and learn.
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
