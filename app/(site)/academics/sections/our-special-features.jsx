import Card from "@/components/card";
import SectionHead from "@/components/section-head";
import React from "react";

export default function OurSpecialFeatures() {
  const cardData = [
    {
      icon: "svg/graduation-hat.svg",
      title: "Thematic Learning",
      content:
        "Our curriculum is centered around engaging themes that capture children's imaginations. Each theme integrates multiple subjects, making learning enjoyable and relevant.",
    },
    {
      icon: "svg/graduation-hat.svg",
      title: "STEAM Education",
      content:
        "We offer innovative STEAM (Science, Technology, Engineering, Arts, and Mathematics) programs that promote hands-on exploration, critical thinking, and problem-solving skills.",
    },
    {
      icon: "svg/graduation-hat.svg",
      title: "Language Immersion",
      content:
        "Through language immersion programs, children have the opportunity to learn a second language, enhancing cognitive development and global awareness.",
    },
    {
      icon: "svg/graduation-hat.svg",
      title: "Art and Creativity",
      content:
        "Art is celebrated at Little Learners Academy. Our art-focused activities encourage self-expression, creativity, and the appreciation of various art forms.",
    },
    {
      icon: "svg/graduation-hat.svg",
      title: "Outdoor Education",
      content:
        "Our expansive outdoor learning spaces provide a stimulating environment for children to explore nature, fostering a connection with the environment.",
    },
    {
      icon: "svg/graduation-hat.svg",
      title: "Play-Based Learning",
      content:
        "Play is an integral part of early childhood education. Our play-based approach enhances social skills, emotional development, and imaginative thinking.",
    },
  ];

  const sectionHeadData = {
    tag: "Our Features",
    title: "Our Special Features",
    description:
      "Our kinder garden school provides a nurturing and stimulating environment, fostering a love for learning that lasts a lifetime. Join us as we embark on an exciting educational journey together!",
  };
  return (
    <section id="special-features" className="scroll-mt-35">
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
