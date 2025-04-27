'use client'

import SectionHead from "@/components/section-head";
import Image from "next/image";
import React, { useRef } from "react";
import { useInView, motion } from "motion/react";

export default function EventsAndCelebrations() {
  const cardData = [
    {
      image: "/image/events-and-celebrations/annual-sport-day.png",
      title: "Annual Sports Day",
      description:
        "A day filled with friendly competition, team spirit, and sportsmanship.",
    },
    {
      image: "/image/events-and-celebrations/cultural-festivals.png",
      title: "Cultural Festivals",
      description:
        "Celebrations of diverse cultural festivals, promoting cultural exchange and appreciation.",
    },
    {
      image: "/image/events-and-celebrations/art-exhibitions.png",
      title: "Art Exhibitions",
      description: `Showcasing our students' artistic talents through exhibitions and displays.`,
    },
    {
      image: "/image/events-and-celebrations/science-fair.png",
      title: "Science Fair",
      description:
        "A platform for budding scientists to present their innovative projects and experiments.",
    },
    {
      image: "/image/events-and-celebrations/international-day.png",
      title: "International Day",
      description:
        "A vibrant celebration of our diverse community, embracing cultures from around the world.",
    },
    {
      image: "/image/events-and-celebrations/graduation-ceremony.png",
      title: "Graduation Ceremony",
      description:
        "A significant milestone as our Kindergarten students prepare to embark on their academic journey.",
    },
  ];

  const sectionHeadData = {
    tag: "Our Features",
    title: "Events & Celebrations",
    description:
      "At Little Learners Academy, we celebrate every milestone and create cherished memories for our students. Throughout the year, we host a variety of events and celebrations that bring the entire school community together. Some of our memorable events include",
  };
  return (
    <section>
      <div className="container">
        <SectionHead {...sectionHeadData} />

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cardData.map(({ image, title, description }, i) => {
            const isEven = i % 2 === 0;
            const translateY = isEven ? "-100%" : "-45%"; // Zig-zag: even cards go up more
            const ref = useRef(null);
            const inView = useInView(ref, { once: true });

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
                  className="bg-orange-95 absolute top-1/2 left-0 z-0 h-20 w-full border-t-2 border-b-2"
                  style={{ transform: `translateY(${translateY})` }}
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
                <div className="bg-absolute-white relative z-10 mt-5">
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
