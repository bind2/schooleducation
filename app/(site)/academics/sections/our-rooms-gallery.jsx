"use client";

import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import React, { useState, useRef } from "react";
import { useInView, motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import SectionHead from "@/components/section-head";

export default function OurRoomsGallery() {
  const [selected, setSelected] = useState("All");

  const tabs = [
    "All",
    "Classrooms",
    "Library",
    "Science Lab",
    "Computer Lab",
    "Garden and Nature Area",
  ];

  const tabData = {
    Classrooms: {
      images: [
        "/image/classrooms/classroom-1.png",
        "/image/classrooms/classroom-2.png",
        "/image/classrooms/classroom-3.png",
        "/image/classrooms/classroom-4.png",
      ],
      title: "Classrooms",
      description:
        "Our well-equipped classrooms are designed to provide a nurturing and stimulating learning environment. Each classroom is thoughtfully arranged to inspire creativity, curiosity, and engagement.",
    },
    Library: {
      images: [
        "/image/library/library-1.png",
        "/image/library/library-2.png",
        "/image/library/library-3.png",
        "/image/library/library-4.png",
      ],
      title: "Library",
      description:
        "Our library offers a peaceful reading space with a vast collection of books that spark imagination and knowledge.",
    },
    "Science Lab": {
      images: [
        "/image/sciencelab/lab-1.png",
        "/image/sciencelab/lab-2.png",
        "/image/sciencelab/lab-3.png",
        "/image/sciencelab/lab-4.png",
      ],
      title: "Science Lab",
      description:
        "Fully equipped science labs where students explore experiments and develop analytical thinking.",
    },
    "Computer Lab": {
      images: [
        "/image/computerlab/computer-1.png",
        "/image/computerlab/computer-2.png",
        "/image/computerlab/computer-3.png",
        "/image/computerlab/computer-4.png",
      ],
      title: "Computer Lab",
      description:
        "Modern computer labs with high-speed internet to enhance tech-driven learning experiences.",
    },
    "Garden and Nature Area": {
      images: [
        "/image/garden/garden-1.png",
        "/image/garden/garden-2.png",
        "/image/garden/garden-3.png",
        "/image/garden/garden-4.png",
      ],
      title: "Garden and Nature Area",
      description:
        "A green space for students to connect with nature, practice gardening, and relax in fresh air.",
    },
  };

  const sectionHeadData = {
    tag: "Our Gallery",
    title: "Our Rooms Gallery",
    description:
      "Step into our Gallery and immerse yourself in a visual journey of cherished moments and unforgettable experiences at our kindergarten school.",
  };

  return (
    <section id="gallery" className="scroll-mt-35">
      <div className="container">
        <SectionHead {...sectionHeadData} />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="scrollbar-hide mt-20 overflow-x-auto">
            <div className="flex w-max gap-3 whitespace-nowrap">
              {tabs.map((tab) => (
                <span
                  key={tab}
                  onClick={() => setSelected(tab)}
                  className={`cursor-pointer rounded-md border-2 px-4 py-2 font-semibold transition-colors duration-200 ${
                    selected === tab ? "bg-orange-95" : "bg-absolute-white"
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-50 flex flex-col gap-50">
          {(selected === "All" ? Object.keys(tabData) : [selected]).map(
            (key, index) => {
              const tab = tabData[key];
              const nextClass = `swiper-button-next-${index}`;
              const prevClass = `swiper-button-prev-${index}`;

              return (
                <TabContent
                  key={index}
                  tab={tab}
                  nextClass={nextClass}
                  prevClass={prevClass}
                />
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}

const TabContent = ({ tab, nextClass, prevClass }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-absolute-white rounded-xl border-2 p-6 [box-shadow:4px_4px_0px_1px_var(--absolute-black)]"
    >
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        speed={1000}
        navigation={{
          nextEl: `.${nextClass}`,
          prevEl: `.${prevClass}`,
        }}
        modules={[Navigation]}
        lazyPreloaderClass="swiper-lazy-preloader"
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2, slidesPerGroup: 2 },
          1024: { slidesPerView: 4, slidesPerGroup: 4 },
        }}
        className="mySwiper -mt-30"
      >
        {tab.images.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="h-[234px] w-full overflow-hidden rounded-lg border-2">
              <Image
                src={src}
                alt={tab.title}
                width={270}
                height={234}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="swiper-lazy-preloader" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-10">
        <div className="flex flex-col-reverse items-center justify-between gap-5 md:flex-row">
          <h2 className="text-center text-3xl font-bold">{tab.title}</h2>
          <div className="flex items-center gap-4">
            <div
              className={`${prevClass} bg-absolute-white z-10 flex cursor-pointer items-center justify-center rounded-lg border-2 p-3`}
            >
              <ArrowLeft size={20} />
            </div>
            <div
              className={`${nextClass} bg-absolute-white z-10 flex cursor-pointer items-center justify-center rounded-lg border-2 p-3`}
            >
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
        <p className="text-gray-30 mt-5 text-center text-xl md:text-start">
          {tab.description}
        </p>
      </div>
    </motion.div>
  );
};
