"use client";

import SectionHead from "@/components/section-head";
import { ArrowRight } from "lucide-react";
import { useInView, motion } from "motion/react";
import Link from "next/link";
import React, { useRef } from "react";

export default function OurPages() {
  const cardData = [
    {
      url: "/about-us",
      title: "About Us",
      content:
        "Discover our Mission, Values, and our unwavering commitment to providing the best learning experience for your child. Learn about our passionate educators and our engaging approach to early education.",
    },
    {
      url: "/academics",
      title: "Academics",
      content:
        "Delve into our comprehensive academic programs designed to stimulate young minds, foster creativity, and encourage a love for learning. Explore our well-rounded curriculum that nurtures both intellectual and social development.",
    },
    {
      url: "/student-life",
      title: "Student Life",
      content:
        "Peek into the vibrant and enriching world of Student Life at Little Learners Academy. Discover the array of extracurricular activities, arts and crafts, sports, and social events that make our school experience truly memorable.",
    },
    {
      url: "/admissions",
      title: "Admissions",
      content:
        "Learn about our Enrollment Process and how to secure your child's place at Little Learners Academy. Find information about our admission requirements, application deadlines, and available spaces.",
    },
  ];

  const sectionHeadData = {
    tag: "Explore More",
    title: "Navigate through our Pages",
    description:
      "Your gateway to discovering a wealth of valuable information about our kindergarten school, Feel free to explore and learn more about the enriching experiences that await your child at our kindergarten school",
  };

  return (
    <section>
      <div className="container">
        <SectionHead {...sectionHeadData} />
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2">
          {cardData.map(({ url, title, content }, index) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: true });

            return (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                key={index}
                className="bg-absolute-white flex flex-col gap-10 rounded-lg border-2 p-10 [box-shadow:4px_4px_0px_1px_var(--absolute-black)]"
              >
                <h2 className="mt-4 text-center text-3xl font-bold">{title}</h2>

                <div className="relative flex w-full items-center gap-1">
                  {/* Left circle */}
                  <div className="bg-absolute-white absolute -left-1 z-10 h-5 w-5 rounded-full border-2 border-black" />

                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-orange-80 flex-1 pt-[2px] pr-[4px] pb-[4px]"
                    >
                      <div className="bg-absolute-black h-[2px] w-full" />
                    </div>
                  ))}

                  {/* Right circle */}
                  <div className="bg-absolute-white absolute -right-1 z-10 h-5 w-5 rounded-full border-2 border-black" />
                </div>

                <p className="text-center">{content}</p>

                <motion.button
                  whileHover="hover"
                  className="bg-orange-90 hover:bg-orange-80 mt-auto w-full rounded-lg border-2 [box-shadow:4px_4px_0px_1px_var(--absolute-black)] transition-colors duration-300"
                >
                  <Link
                    href={url}
                    className="flex h-full w-full items-center justify-center gap-1 p-3"
                  >
                    <span>Learn More</span>
                    <motion.span
                      variants={{
                        hover: { x: 4 },
                        initial: { x: 0 },
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ArrowRight size={16} />
                    </motion.span>
                  </Link>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
