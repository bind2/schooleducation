"use client";

import Card from "@/components/card";
import SectionHead from "@/components/section-head";
import React from "react";

export default function Benefits() {
  const cardData = [
    {
      icon: "svg/graduation-hat.svg",
      title: "Holistic Learning Approach",
      content:
        "Our curriculum focuses on nurturing cognitive, social, emotional, and physical development, ensuring a well-rounded education.",
    },
    {
      icon: "svg/graduation-hat.svg",
      title: "Experienced Educators",
      content:
        "Our passionate and qualified teachers create a supportive and stimulating learning environment.",
    },
    {
      icon: "svg/graduation-hat.svg",
      title: "Nurturing Environment",
      content:
        "We prioritize safety and provide a warm and caring atmosphere for every child.",
    },
    {
      icon: "svg/graduation-hat.svg",
      title: "Play-Based Learning",
      content:
        "We believe in the power of play to foster creativity, problem-solving skills, and imagination.",
    },
    {
      icon: "svg/graduation-hat.svg",
      title: "Individualized Attention",
      content:
        "Our small class sizes enable personalized attention, catering to each child's unique needs.",
    },
    {
      icon: "svg/graduation-hat.svg",
      title: "Parent Involvement",
      content:
        "We foster a strong parent-school partnership to ensure seamless communication and collaboration.",
    },
  ];

  const sectionHeadData = {
    tag: "Our Benefits",
    title: "Our Benefits",
    description:
      "With a dedicated team of experienced educators, state-of-the-art facilities, and a comprehensive curriculum, we aim to lay a strong foundation for your child's future.",
  };

  return (
    <section id="benefits" className="scroll-mt-35">
      <div className="container">
        <SectionHead {...sectionHeadData} />
        <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-15 sm:grid-cols-2 lg:grid-cols-3">
          {cardData.map(({ icon, title, content }, index) => (
            <Card key={index} icon={icon} title={title} content={content} />
          ))}
        </div>
      </div>
    </section>
  );
}
