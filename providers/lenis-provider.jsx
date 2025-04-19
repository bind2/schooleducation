"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      // options={{
      //   duration: 1.2,
      //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      //   smoothWheel: true,
      //   wheelMultiplier: 1,
      //   smoothTouch: true,
      //   touchMultiplier: 2,
      // }}
    >
      {children}
    </ReactLenis>
  );
}
