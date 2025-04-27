"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useInView, motion } from "motion/react";

const timelineData = [
  {
    year: "2023",
    title: "Resilience and Future Horizons",
    description:
      "Adapting to new challenges, we remained committed to our mission of providing an exceptional early education. Looking ahead with optimism, we envision a future filled with boundless possibilities as we continue shaping the leaders and thinkers of tomorrow.",
  },
  {
    year: "2017",
    title: "Innovation and Technology",
    description:
      "Innovation became the driving force behind our kindergarten's progress from 2016 to 2020. Embracing the latest educational technologies, we crafted engaging and interactive learning experiences for our students.",
  },
  {
    year: "2012",
    title: "Expansion and Recognition",
    description:
      "These years marked as a period of expansion and recognition for our school. As we extended our facilities and enhanced our curriculum, we received accolades for our commitment to quality education and innovative teaching methodologies.",
  },
  {
    year: "2005",
    title: "Inception and Growth",
    description:
      "Established in 2005, our kindergarten school began its journey with a vision to provide a nurturing space for young minds to explore, learn, and grow. Over the next five years, we witnessed significant growth.",
  },
];

const Timeline = () => {
  const lineRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const [lineStyle, setLineStyle] = useState({ top: 0, height: 0 });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const inViewLine = useInView(lineRef, { once: true });

  useEffect(() => {
    if (startRef.current && endRef.current && lineRef.current) {
      const start = startRef.current.getBoundingClientRect();
      const end = endRef.current.getBoundingClientRect();
      const containerTop = lineRef.current.getBoundingClientRect().top;

      const top = start.top + start.height / 2 - containerTop;
      const height = end.top + end.height / 2 - start.top - start.height / 2;

      setLineStyle({ top, height });
    }
  }, []);

  
  
  

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-absolute-white w-full rounded-xl border-2 px-4 py-10 pl-15 [box-shadow:4px_4px_0px_1px_var(--absolute-black)] lg:px-24"
    >
      <div className="relative">
        {/* Vertical line from first circle to last circle */}
        <motion.div
          ref={lineRef}
          initial={{ opacity: 0, y: 50 }}
          animate={inViewLine ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-orange-80 absolute -left-12 flex w-[8px] justify-center"
          style={{ top: lineStyle.top, height: lineStyle.height }}
        >
          <div className="bg-absolute-black h-full w-[2px]"></div>
        </motion.div>

        <div className="space-y-14">
          {timelineData.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === timelineData.length - 1;

            const timelineRef = useRef(null);
            const inViewTimeline = useInView(timelineRef, { once: true });

            return (
              <motion.div
                ref={timelineRef}
                initial={{ opacity: 0, y: 50 }}
                animate={inViewTimeline ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                key={index}
                className="relative z-10 flex flex-col gap-5 lg:flex-row lg:gap-10"
              >
                {/* Year Block */}
                <div
                  ref={isFirst ? startRef : isLast ? endRef : null}
                  className="relative flex h-fit w-[230px] flex-shrink-0 items-center gap-4 rounded-lg border-2 px-4 py-4 [box-shadow:4px_4px_0px_1px_var(--absolute-black)]"
                >
                  <div className="bg-orange-80 absolute right-full h-2 w-12">
                    <div className="bg-absolute-black absolute top-[3px] h-[2px] w-[70%]"></div>
                    <div className="absolute -top-[6px] -left-2 h-5 w-5 rounded-full border-2 bg-white"></div>
                    <div className="absolute -top-[6px] -right-2 h-5 w-5 rounded-full border-2 bg-white"></div>
                  </div>
                  <Image
                    src={"svg/square-pattern-icon.svg"}
                    alt="square-pattern icon"
                    width={60}
                    height={60}
                  />
                  <span className="text-gray-10 text-5xl font-bold">
                    {item.year}
                  </span>
                </div>

                {/* Description */}
                <div className="w-full">
                  <h3 className="text-gray-10 text-2xl font-bold">
                    {item.title}
                  </h3>
                  <p className="text-gray-20 mt-4">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;
