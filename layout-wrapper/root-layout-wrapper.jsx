"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import ScrollToTop from "@/components/scroll-to-top";
import LenisProvider from "@/providers/lenis-provider";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import React from "react";

export default function RootLayoutWrapper({ children }) {
  const pathname = usePathname();

  const restrictedPath = ["/admin", "/auth"].some((path) =>
    pathname.startsWith(path),
  );
  return (
    <>
      <LenisProvider>
        <NextTopLoader color="#ff8d4d" showSpinner={false} />
        {!restrictedPath && <Header />}
        {children}
        {!restrictedPath && <Footer />}
        <ScrollToTop />
      </LenisProvider>
    </>
  );
}
