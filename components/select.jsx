"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

export default function Select({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const options = ["Option 1", "Option 2", "Option 3"];

  const handleSelect = (option) => {
    onChange(option); // send selected value to parent
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="flex w-full flex-col gap-2">
      <label
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-30 text-xl font-semibold select-none"
      >
        Program of Interest
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-orange-99 flex w-full items-center justify-between rounded-md border-2 p-4 text-left"
        >
          <span>{value || "Select Program"}</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.1, type: "tween" }}
              className="bg-orange-99 absolute z-50 mt-1 w-full overflow-hidden rounded-md border-2 shadow-md"
            >
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="hover:bg-orange-95 flex cursor-pointer items-center justify-between px-4 py-3 transition-all"
                >
                  <span>{option}</span>
                  {value === option && <Check size={16} />}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
