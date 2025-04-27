'use client'

import SectionHead from "@/components/section-head";
import Timeline from "@/components/timeline";
import useHeaderStore from "@/stores/use-header.store";
import React from "react";

export default function OurHistory() {
  const headerHeight = useHeaderStore((state) => state.height);
  const sectionHeadData = {
    tag: "Our Progressive Journey",
    title: "Our History",
    description:
      "Founded with a passion for early education in 2005, our kindergarten school boasts a rich history of empowering young learners to reach their potential through innovative teaching methods and a supportive learning environment",
  };
  return (
    <section id="history" style={{ scrollMarginTop: `${headerHeight + 16}px` }}>
      <div className="container">
        <SectionHead {...sectionHeadData} />

        <div className="mt-20">
          <Timeline />
        </div>
      </div>
    </section>
  );
}
