'use client'

import Accordion from "@/components/accordion";
import SectionHead from "@/components/section-head";
import useHeaderStore from "@/stores/use-header.store";
import React from "react";

export default function Faq() {
  const headerHeight = useHeaderStore((state) => state.height);
  const accordionData1 = [
    {
      title: "What are the school hours at Little Learners Academy?",
      content:
        "Our school hours are from 8:00 AM to 3:00 PM, Monday to Friday. We also offer extended care options for parents who need early drop-off or late pick-up.",
    },
    {
      title: "Is there a uniform policy for students?",
      content: "Redux is a state management library for JavaScript apps.",
    },
    {
      title: "What extracurricular activities are available for students?",
      content: "Redux is a state management library for JavaScript apps.",
    },
    {
      title: "What extracurricular activities are available for students?",
      content: "Redux is a state management library for JavaScript apps.",
    },
  ];
  const accordionData2 = [
    {
      title: "How do you handle food allergies and dietary restrictions?",
      content: "Redux is a state management library for JavaScript apps.",
    },
    {
      title: "What is the teacher-to-student ratio at Little Learners Academy?",
      content: "Redux is a state management library for JavaScript apps.",
    },
    {
      title: "How do you handle discipline and behavior management?",
      content: "Redux is a state management library for JavaScript apps.",
    },
    {
      title: "How do I apply for admission to Little Learners Academy?",
      content: "Redux is a state management library for JavaScript apps.",
    },
  ];

  const sectionHeadData = {
    tag: "Solutions For The Doubts",
    title: "Frequently Asked Questions",
    description:
      "Find all the essential information you need in our FAQ section, designed to address the most frequently asked questions and help you make informed decisions for your child's education.",
  };
  return (
    <section id="faq" style={{ scrollMarginTop: `${headerHeight + 16}px` }}>
      <div className="container">
        <SectionHead {...sectionHeadData} />
        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Accordion items={accordionData1} />
          <Accordion items={accordionData2} />
        </div>
      </div>
    </section>
  );
}
