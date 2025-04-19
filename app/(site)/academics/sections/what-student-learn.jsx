'use client'

import SectionHead from "@/components/section-head";
import Image from "next/image";
import React, { useRef } from "react";
import { useInView, motion } from "motion/react";

export default function WhatStudentLearn() {
  const cardData = [
    {
      image: "/image/student-learn/language-art.png",
      title: "Language Arts",
      description: "Reading, writing, storytelling, and communication skills.",
    },
    {
      image: "/image/student-learn/mathematics.png",
      title: "Mathematics",
      description:
        "Number sense, basic operations, problem-solving, and logic.",
    },
    {
      image: "/image/student-learn/science.png",
      title: "Science",
      description:
        "Exploring the natural world through hands-on experiments and investigations.",
    },
    {
      image: "/image/student-learn/social-studies.png",
      title: "Social Studies",
      description:
        "Cultivating an understanding of diverse cultures and communities.",
    },
    {
      image: "/image/student-learn/arts-and-crafts.png",
      title: "Arts and Crafts",
      description:
        "Encouraging creativity through various art forms and crafts.",
    },
    {
      image: "/image/student-learn/physical-education.png",
      title: "Physical Education",
      description: "Promoting physical fitness, coordination, and teamwork.",
    },
  ];

  const sectionHeadData = {
    tag: "Our Features",
    title: "What Students Learn",
    description:
      "At Little Learners Academy, we strive to cultivate a love for learning and equip children with essential skills for their future success. Our academic programs cover a wide range of subjects, allowing students to develop a strong foundation and discover their interests.",
  };
  return (
    <section>
      <div className="container">
        <SectionHead {...sectionHeadData} />

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cardData.map(({ image, title, description }, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: false });
            return (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                key={i}
                className="bg-absolute-white relative rounded-lg border-2 p-5 [box-shadow:4px_4px_0px_1px_var(--absolute-black)] md:p-10"
              >
                <div
                  className="bg-orange-95 absolute top-0 left-1/2 z-0 h-[65%] w-20 rounded-br-md rounded-bl-md border-r-2 border-b-2 border-l-2"
                  style={{ transform: "translateX(-50%)" }}
                />
                <div className="relative z-10 overflow-hidden rounded-lg border-2">
                  <Image
                    src={image}
                    alt="language-art"
                    width={320}
                    height={220}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="bg-absolute-white relative z-10 mt-10">
                  <h3 className="text-gray-10 text-center text-2xl font-bold">
                    {title}
                  </h3>
                  <p className="text-gray-30 mt-2 text-center">{description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
