import Card from "@/components/card";
import SectionHead from "@/components/section-head";
import React from "react";

export default function ExtracurricularActivities() {
  const cardData = [
    {
      icon: "svg/electricity-icon.svg",
      title: "Sports and Athletics",
      content:
        "Students can participate in various sports, from soccer and basketball to gymnastics and yoga. Sports help promote teamwork, physical fitness, and a sense of discipline.",
    },
    {
      icon: "svg/brush-icon.svg",
      title: "Art and Creativity",
      content:
        "Our art classes and creative workshops provide a platform for students to express their creativity through painting, drawing, and other artistic forms.",
    },
    {
      icon: "svg/music-icon.svg",
      title: "Music and Performing Arts ",
      content:
        "Students can discover their musical talents through singing, playing musical instruments, and participating in drama and theater performances.",
    },
    {
      icon: "svg/puzzel-icon.svg",
      title: "Language Clubs",
      content:
        "Language clubs offer an opportunity for students to immerse themselves in different languages and cultures, fostering global awareness.",
    },
    {
      icon: "svg/chemistry-icon.svg",
      title: "Science Club",
      content:
        "The science club allows young scientists to explore the wonders of science through fun experiments and hands-on learning.",
    },
    {
      icon: "svg/spark-icon.svg",
      title: "Cooking and Culinary Arts",
      content:
        "Cooking classes introduce students to the joys of preparing and tasting delicious and healthy meals.",
    },
  ];

  const sectionHeadData = {
    tag: "Our Features",
    title: "Extracurricular Activities",
    description:
      "At Little Learners Academy, we believe in nurturing well-rounded individuals. Our extracurricular activities offer a diverse range of experiences that complement our academic curriculum and encourage students to explore their interests and passions. We offer a wide array of extracurricular activities, including",
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
