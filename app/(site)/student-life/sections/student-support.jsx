import Card from "@/components/card";
import SectionHead from "@/components/section-head";
import React from "react";

export default function StudentSupport() {
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
  ];

  const sectionHeadData = {
    tag: "Our Achievements",
    title: "Student Support",
    description:
      "At Little Learners Academy, we are committed to providing a supportive and nurturing environment that meets the unique needs of each student. Our student support services include",
  };
  return (
    <section>
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
