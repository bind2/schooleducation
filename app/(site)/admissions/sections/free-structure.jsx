"use client";

import React from "react";
import SectionHead from "@/components/section-head";
import { useInView, motion } from "motion/react";
import { useRef } from "react";

export default function FreeStructure() {
  const tuitionRef = useRef(null);
  const serviceRef = useRef(null);

  const inViewTuition = useInView(tuitionRef, { once: false });
  const inViewServices = useInView(serviceRef, { once: false });

  const tableHeaders = [
    "Program",
    "Age Group",
    "Annual Tuition",
    "Registration Fee",
    "Activity Fee",
  ];

  const tableData = [
    {
      program: "Nursery",
      ageGroup: "2 - 3 Years",
      tuition: "$1,686",
      registration: "$162",
      activity: "$12",
    },
    {
      program: "Pre - Kindergarten",
      ageGroup: "3 - 4 Years",
      tuition: "$2,686",
      registration: "$220",
      activity: "$16",
    },
    {
      program: "Kindergarten",
      ageGroup: "4 - 5 Years",
      tuition: "$3,686",
      registration: "$340",
      activity: "$20",
    },
  ];

  const services = [
    {
      name: "Before and After-School Care",
      price: "$120 / per month",
    },
    {
      name: "Extended Holiday Program",
      price: "$200 / per term",
    },
    {
      name: "Weekend Activities Package",
      price: "$90 / per month",
    },
  ];

  const sectionHeadData = {
    tag: "Our Features",
    title: "Fee Structure",
    description:
      "Our fee structure is transparent, and we strive to keep our fees competitive within the education sector. The fees vary based on the program, age group, and any additional services chosen.",
  };
  return (
    <section>
      <div className="container">
        <SectionHead {...sectionHeadData} />

        {/* table */}
        <motion.div
          ref={tuitionRef}
          initial={{ opacity: 0, y: 50 }}
          animate={inViewTuition ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-20"
        >
          <div className="bg-absolute-white w-full overflow-x-auto rounded-lg border-2 p-6 [box-shadow:4px_4px_0px_1px_var(--absolute-black)]">
            <div className="min-w-[800px] overflow-hidden">
              {/* Header Row */}
              <div className="bg-orange-95 flex rounded-lg border-2">
                {tableHeaders.map((header, idx) => (
                  <span
                    key={header}
                    className={`w-1/5 border-black px-4 py-3 text-sm font-semibold ${
                      idx !== tableHeaders.length - 1 ? "border-r-2" : ""
                    }`}
                  >
                    {header}
                  </span>
                ))}
              </div>

              <div className="mt-5 overflow-hidden rounded-lg border-2">
                {tableData.map((row, rowIndex) => {
                  const isLastRow = rowIndex === tableData.length - 1;

                  return (
                    <div key={rowIndex} className="bg-orange-99 flex">
                      <span
                        className={`w-1/5 border-r-2 ${
                          !isLastRow ? "border-b-2" : ""
                        } border-black px-4 py-3 text-sm`}
                      >
                        {row.program}
                      </span>
                      <span
                        className={`w-1/5 border-r-2 ${
                          !isLastRow ? "border-b-2" : ""
                        } border-black px-4 py-3 text-sm`}
                      >
                        {row.ageGroup}
                      </span>
                      <span
                        className={`w-1/5 border-r-2 ${
                          !isLastRow ? "border-b-2" : ""
                        } border-black px-4 py-3 text-sm`}
                      >
                        {row.tuition}
                      </span>
                      <span
                        className={`w-1/5 border-r-2 ${
                          !isLastRow ? "border-b-2" : ""
                        } border-black px-4 py-3 text-sm`}
                      >
                        {row.registration}
                      </span>
                      <span
                        className={`w-1/5 ${!isLastRow ? "border-b-2" : ""} border-black px-4 py-3 text-sm`}
                      >
                        {row.activity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* table */}
        <motion.div
          ref={serviceRef}
          initial={{ opacity: 0, y: 50 }}
          animate={inViewServices ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-20"
        >
          <div className="bg-absolute-white w-full overflow-x-auto rounded-lg border-2 p-6 [box-shadow:4px_4px_0px_1px_var(--absolute-black)]">
            <div className="min-w-[800px] overflow-hidden">
              <div className="bg-orange-95 rounded-lg border-2 px-4 py-2">
                <h3 className="text-2xl font-bold">Additional Services</h3>
              </div>

              <div className="bg-orange-99 mt-5 overflow-hidden rounded-lg border-2">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`flex ${index !== services.length - 1 ? "border-b-2" : ""}`}
                  >
                    <span className="w-full border-r-2 border-black px-4 py-3 text-sm font-medium">
                      {service.name}
                    </span>
                    <span className="w-full border-black px-4 py-3 text-sm">
                      {service.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
