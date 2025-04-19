import React from "react";
import Hero from "./sections/hero";
import Benefits from "./sections/benefits";
import Testimonials from "./sections/testimonials";
import Faq from "./sections/faq";
import OurPages from "./sections/our-pages";

export default function Home() {
  return (
    <React.Fragment>
      <Hero />
      <Benefits />
      <Testimonials />
      <Faq />
      <OurPages />
    </React.Fragment>
  );
}
