import SectionHead from "@/components/section-head";
import Timeline from "@/components/timeline";
import React from "react";

export default function OurHistory() {
  const sectionHeadData = {
    tag: "Our Progressive Journey",
    title: "Our History",
    description:
      "Founded with a passion for early education in 2005, our kindergarten school boasts a rich history of empowering young learners to reach their potential through innovative teaching methods and a supportive learning environment",
  };
  return (
    <section id="history" className="scroll-mt-35">
      <div className="container">
        <SectionHead {...sectionHeadData} />

        <div className="mt-20">
          <Timeline />
        </div>
      </div>
    </section>
  );
}
