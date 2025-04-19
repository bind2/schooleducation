"use client";

import { useInView, motion } from "motion/react";
import SectionHead from "@/components/section-head";
import React, { useRef } from "react";

export default function AdmissionProcess() {
  const cardData = [
    {
      title: "Inquiry",
      description:
        "Submit an inquiry form through our website or contact our admissions office to express your interest in Little Learners Academy.",
    },
    {
      title: "School Tour",
      description:
        "Schedule a personalized school tour to explore our campus, meet our staff, and gain insights into our nurturing learning environment.",
    },
    {
      title: "Application Form",
      description: `Complete the application form and provide the required documents, including your child's birth certificate, medical records, and any previous academic records (if applicable).`,
    },
    {
      title: "Parent Interview",
      description: `We value parent engagement, and a meeting with our admissions team allows us to understand your child's needs and ensure Little Learners Academy aligns with your family's expectations.`,
    },
    {
      title: "Student Assessment",
      description:
        "For certain age groups, a student assessment may be conducted to understand their developmental progress and ensure the best placement.",
    },
    {
      title: "Acceptance",
      description:
        "Once the admission process is complete, you will receive an official acceptance letter from Little Learners Academy.",
    },
  ];

  const sectionHeadData = {
    tag: "Process",
    title: "Admission Process",
    description:
      "Embark on a remarkable educational journey with us! Our Admission and Enrollment process is the gateway to providing your child with an exceptional learning experience at our kindergarten school",
  };
  return (
    <section>
      <div className="container">
        <SectionHead {...sectionHeadData} />

        <div className="mt-50 grid grid-cols-1 gap-x-6 gap-y-35 md:grid-cols-2 lg:grid-cols-3">
          {cardData.map(({ title, description }, i) => {
            const ref = useRef(null);
            const inView = useInView(ref, { once: false });
            return (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                key={i}
                className="bg-absolute-white relative h-full rounded-lg border-2 p-7 [box-shadow:4px_4px_0px_1px_var(--absolute-black)]"
              >
                <div
                  // style={{ transform: "translateX(-50%)" }}
                  className="bg-absolute-white font-raleway absolute -top-25 left-[40%] flex -translate-x-[40%] transform items-center justify-center rounded-lg border-2 px-4 py-2 text-4xl font-extrabold [box-shadow:4px_4px_0px_1px_var(--absolute-black)] md:left-0"
                >
                  {`0${i + 1}`}
                  <div className="bg-orange-80 absolute top-full h-10 px-1">
                    <div className="bg-absolute-black h-full w-[2px]"></div>
                    <div
                      style={{ transform: "translateX(-50%) translateY(-50%)" }}
                      className="bg-absolute-white absolute top-0 h-5 w-5 rounded-full border-2"
                    ></div>
                  </div>
                </div>
                <h2 className="mb-4 text-xl font-bold">{title}</h2>
                <p>{description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
