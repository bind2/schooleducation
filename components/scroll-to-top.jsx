"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // optional icon lib

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="bg-orange-80 hover:bg-orange-90 fixed right-5 bottom-5 z-40 rounded-full p-3 text-white shadow-lg transition-all"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    )
  );
}
