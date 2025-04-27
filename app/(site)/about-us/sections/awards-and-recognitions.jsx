"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import SectionHead from "@/components/section-head";
import { useInView, motion } from "motion/react";
import Image from "next/image";
import useHeaderStore from "@/stores/use-header.store";

export default function AwardsAndRecognitions() {
  const headerHeight = useHeaderStore((state) => state.height);
  const swiperRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const cardData = [
    {
      icon: "svg/pie-chart-icon.svg",
      title: "Outstanding Early Childhood Education Awar",
      content:
        "Presented by the National Association for the Education of Young Children (NAEYC) in recognition of Little Learners Academy's commitment to delivering exceptional early childhood education and fostering a nurturing learning environment.",
    },
    {
      icon: "svg/mobile-signal-icon.svg",
      title: "Innovative STEAM Education Award",
      content:
        "Awarded by the Education Excellence Association for our pioneering efforts in introducing innovative STEAM (Science, Technology, Engineering, Arts, and Mathematics) programs that ignite creativity and critical thinking in young learners.",
    },
    {
      icon: "svg/electricity-icon.svg",
      title: "Environmental Stewardship Award",
      content:
        "Received from the Green Earth Society for our dedication to environmental education, sustainable practices, and fostering a love for nature in our students.",
    },
    {
      icon: "svg/pie-chart-icon.svg",
      title: "Outstanding Early Childhood Education Awar",
      content:
        "Presented by the National Association for the Education of Young Children (NAEYC) in recognition of Little Learners Academy's commitment to delivering exceptional early childhood education and fostering a nurturing learning environment.",
    },
  ];

  const sectionHeadData = {
    tag: "Our Achievements",
    title: "Our Awards and Recognitions",
    description:
      "Little Learners Academy takes pride in our commitment to delivering high-quality education and outstanding student experiences. We are honored to have received various awards and recognitions for our dedication to early childhood education. These accolades reflect our team's relentless efforts in creating an exceptional learning environment for our students.",
  };
  return (
    <section id="awards-and-recognitions" style={{ scrollMarginTop: `${headerHeight + 16}px` }}>
      <div className="container">
        <SectionHead {...sectionHeadData} />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-20"
        >
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={16}
            speed={1000} // smooth slide
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2, slidesPerGroup: 2 },
              1024: { slidesPerView: 3, slidesPerGroup: 3 },
            }}
            className="mySwiper"
          >
            {cardData.map(({ icon, title, content }, i) => (
              <SwiperSlide key={i} className="mt-6 !h-auto p-[5px]">
                <div className="bg-absolute-white relative h-full rounded-lg border-2 p-7 [box-shadow:4px_4px_0px_1px_var(--absolute-black)]">
                  <div className="bg-orange-90 absolute -top-[28px] flex h-14 w-14 items-center justify-center rounded-lg border-2">
                    <Image
                      src={icon}
                      alt="graduationHat"
                      width={24}
                      height={24}
                    />
                  </div>
                  <h2 className="mt-4 mb-4 text-xl font-bold">{title}</h2>
                  <p>{content}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mt-10 flex items-center justify-between gap-4">
            <div className="font-raleway text-lg font-bold">8 More Awards</div>
            <div className="flex items-center gap-4">
              <div className="swiper-button-prev bg-absolute-white z-10 flex cursor-pointer items-center justify-center rounded-lg border-2 p-3">
                <ArrowLeft size={20} />
              </div>
              <div className="swiper-button-next bg-absolute-white z-10 flex cursor-pointer items-center justify-center rounded-lg border-2 p-3">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
