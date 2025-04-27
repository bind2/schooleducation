"use client";

import SectionHead from "@/components/section-head";
import Image from "next/image";
import React, { useRef } from "react";
import { useInView, motion } from "motion/react";
import useHeaderStore from "@/stores/use-header.store";

export default function MissionAndVisons() {
  const headerHeight = useHeaderStore((state) => state.height);
  const sectionHeadData = {
    tag: "Mission & Visions",
    title: "Our Mission & Visions",
    description:
      "We are here to provide a nurturing and inclusive environment where young minds can thrive, fostering a love for learning and personal growth.",
  };

  const cardData = [
    {
      icon: "svg/mission-icon.svg",
      title: "Mission",
      description:
        "At Little Learners Academy, our mission is to inspire a passion for learning and empower young minds to become confident, compassionate, and creative individuals. We strive to create a safe and inclusive space where children thrive academically, socially, and emotionally, setting the stage for a successful educational journey.",
    },
    {
      icon: "svg/vision-icon.svg",
      title: "Vision",
      description:
        "Our vision is to be a beacon of educational excellence, where children are encouraged to explore, discover, and express their unique talents. We aim to foster a generation of lifelong learners equipped with critical thinking, empathy, and a deep appreciation for diversity.",
    },
  ];
  return (
    <section id="mission-and-vision" style={{ scrollMarginTop: `${headerHeight + 16}px` }}>
      <div className="container">
        <SectionHead {...sectionHeadData} />

        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2">
          {cardData.map(({ icon, title, description }, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true });
            return (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                key={i}
                className="bg-absolute-white rounded-lg border-2 p-8 lg:p-12 [box-shadow:4px_4px_0px_1px_var(--absolute-black)]"
              >
                <div className="mb-12 flex items-center justify-between">
                  <span className="text-4xl font-bold">{title}</span>
                  <Image src={icon} alt="mission icon" width={60} height={60} />
                </div>
                <p>{description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
