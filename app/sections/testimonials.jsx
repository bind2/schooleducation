"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import SectionHead from "@/components/section-head";
import { useInView, motion } from "motion/react";

export default function Testimonials() {
  const swiperRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  const sectionHeadData = {
    tag: "Their Happy Words 🤗",
    title: "Our Testimonials",
    description:
      "Our testimonials are heartfelt reflections of the nurturing environment we provide, where children flourish both academically and emotionally.",
  };

  return (
    <section id="testimonials" className="scroll-mt-35">
      <div className="container">
        <SectionHead {...sectionHeadData} />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mt-20 xl:px-15"
        >
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={16}
            loop={true}
            speed={1000} // smooth slide
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
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
            {Array.from({ length: 6 }).map((_, index) => (
              <SwiperSlide key={index} className="!h-auto p-[5px]">
                <div
                  onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
                  onMouseLeave={() => swiperRef.current?.autoplay?.start()}
                  className="bg-absolute-white flex h-full flex-col items-center justify-center gap-4 rounded-lg border-2 p-10 [box-shadow:4px_4px_0px_1px_var(--absolute-black)]"
                >
                  <div className="bg-orange-90 h-16 w-16 rounded-full border-2">
                    <Image
                      src={"svg/testimonial-icon.svg"}
                      alt="icon"
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xl font-semibold">Jennifer B</span>
                  <Image
                    src={"svg/five-stars.svg"}
                    alt="stars"
                    width={116}
                    height={20}
                  />
                  <p className="line-clamp-4 text-center">
                    Little Learners Academy has been a second home for my child.
                    The caring staff and engaging programs have made her excited
                    to go to school every day!
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mt-10 flex items-center justify-center gap-4 xl:mt-0">
            <div className="swiper-button-prev bg-absolute-white z-10 flex cursor-pointer items-center justify-center rounded-lg border-2 p-3 xl:absolute xl:top-[43%] xl:left-0 xl:-translate-y-1/2 xl:transform">
              <ArrowLeft size={20} />
            </div>
            <div className="swiper-button-next bg-absolute-white z-10 flex cursor-pointer items-center justify-center rounded-lg border-2 p-3 xl:absolute xl:top-[43%] xl:right-0 xl:-translate-y-1/2 xl:transform">
              <ArrowRight size={20} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
