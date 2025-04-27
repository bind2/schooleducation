"use client";

import { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { useInView, motion } from "motion/react";

const Accordion = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef({});

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!Array.isArray(items)) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {items.length === 0 ? (
        <p className="text-center text-gray-500">No items available</p>
      ) : (
        items.map((item, index) => {
          const isOpen = openIndex === index;
          const ref = useRef(null);
          const inView = useInView(ref, { once: true });
          return (
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
              key={index}
              className="overflow-hidden rounded-lg border-2"
            >
              {/* Accordion Header */}
              <div
                className={`relative flex w-full items-center justify-between gap-4 ${isOpen ? "bg-absolute-white" : "bg-orange-95"} p-4 text-left transition-all duration-300`}
                onClick={() => toggleAccordion(index)}
              >
                <div className="w-full text-lg font-semibold">{item.title}</div>
                <div className={`bg-orange-97 rounded-sm border-2 p-1`}>
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </div>
                {isOpen && (
                  <div className="bg-absolute-black absolute right-4 bottom-0 left-4 h-[2px] transition-all duration-300" />
                )}
              </div>

              {/* Accordion Content with Improved Animation */}
              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: isOpen
                    ? `${contentRefs.current[index]?.scrollHeight}px`
                    : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="bg-white p-4 text-gray-700">{item.content}</div>
              </div>
            </motion.div>
          );
        })
      )}
    </div>
  );
};

export default Accordion;
