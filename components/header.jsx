"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import CustomMenu from "./custom-menu";
import { motion, AnimatePresence, useInView } from "motion/react";
import useHeaderStore from "@/stores/use-header.store";
import { XIcon } from "lucide-react";

export default function Header() {
  const setHeight = useHeaderStore((state) => state.setHeight);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const headerRef = useRef(null);
  const scrollRef = useRef(null);
  const inView = useInView(scrollRef, { once: true });
  const [announceBar, setAnnounceBar] = useState(true);

  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/admin" },
    { name: "About Us", url: "/about-us" },
    { name: "Academics", url: "/academics" },
    { name: "Admissions", url: "/admissions" },
    { name: "Student Life", url: "/student-life" },
  ];

  useEffect(() => {
    const header = headerRef.current;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeaderPosition = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;
      const currentTop = parseFloat(getComputedStyle(header).top);
      const headerHeight = header.offsetHeight;

      let newTop = currentTop - diff;
      newTop = Math.max(-headerHeight, Math.min(0, newTop));

      header.style.top = `${newTop}px`;
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderPosition);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const currentOverflow = document.body.style.overflow;

    if (isOpen && currentOverflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else if (!isOpen && currentOverflow !== "") {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      }
    };

    // Initial check
    handleResize();

    // Add listener
    window.addEventListener("resize", handleResize);

    // Clean up listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      setHeight(headerRef.current.offsetHeight);
    }

    const resizeObserver = new ResizeObserver(() => {
      if (headerRef.current) {
        setHeight(headerRef.current.offsetHeight);
      }
    });

    resizeObserver.observe(headerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [setHeight]);

  return (
    <header
      ref={headerRef}
      className="bg-orange-97 sticky top-0 left-0 z-50 w-full"
    >
      <div className="container">
        <motion.div
          ref={scrollRef}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-2 py-2"
        >
          {/* Announcement Banner */}
          {announceBar && (
            <div className="bg-orange-90 relative flex items-center justify-center overflow-hidden rounded-sm border-2 p-2">
              <Image
                src={`svg/header-left-icon.svg`}
                alt="svg-left"
                width={60}
                height={60}
                className="absolute top-0 left-0 h-[60px] w-[60px] md:top-auto md:-left-5 xl:h-[160px] xl:w-[160px]"
              />
              <Image
                src={"svg/header-right-icon.svg"}
                alt="svg-right"
                width={60}
                height={60}
                className="absolute top-0 right-0 h-[60px] w-[60px] md:top-auto md:-right-5 xl:h-[160px] xl:w-[160px]"
              />
              <Image
                src={"svg/header-circle-icon.svg"}
                alt="svg-circle-left"
                width={32}
                height={32}
                className="absolute -top-[40%] left-0 z-10 md:left-[100px] lg:left-[200px] xl:-top-[70%] xl:left-[300px] xl:h-[50px] xl:w-[50px]"
              />
              <Image
                src={"svg/header-circle-icon.svg"}
                alt="svg-circle-right"
                width={32}
                height={32}
                className="absolute -right-2 -bottom-[40%] z-10 md:right-[100px] lg:right-[200px] xl:right-[300px]"
              />
              <Link
                href={"/admissions"}
                aria-label="Admissions"
                prefetch={true}
                className="z-10 flex items-center gap-1"
              >
                <span className="text-sm font-medium md:text-[16px]">
                  Addmission is Open, Grab your seat now
                </span>
                <ArrowRight size={14} className="md:h-[16px] md:w-[16px]" />
              </Link>
              <span
                className="hover:bg-orange-95 absolute right-2 cursor-pointer rounded-full p-1 transition-colors duration-300"
                onClick={() => setAnnounceBar(false)}
              >
                <XIcon size={18} />
              </span>
            </div>
          )}

          {/* Main Header Bar */}
          <div className="bg-absolute-white flex w-full justify-between overflow-hidden rounded-sm border-2">
            {/* Logo */}
            <div className="bg-orange-65 border-r-2">
              <Link href={"/"} className="flex items-center gap-1 p-2">
                <Image
                  src={"svg/logo.svg"}
                  alt="logo"
                  width={40}
                  height={40}
                  className="-ml-[3px]"
                />
                <h1 className="font-bold">Little Learners</h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex">
              {navLinks.map(({ name, url }, index) => (
                <li key={index} className="inline-block h-full border-l-2">
                  <Link
                    href={url}
                    aria-label={name}
                    className={`flex h-full items-center p-2 ${
                      url === pathname ? "bg-orange-95" : ""
                    }`}
                  >
                    {name}
                  </Link>
                </li>
              ))}
              <li className="inline-block h-full border-l-2">
                <Link
                  href={"/contact"}
                  aria-label="Contact"
                  className="bg-orange-75 flex h-full items-center p-2"
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Mobile Menu Icon */}
            <div
              onClick={toggleMenu}
              className="bg-orange-95 inline-flex min-h-full items-center justify-center border-l-2 px-[30px] lg:hidden"
            >
              <CustomMenu size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Side Sheet Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60"
              onClick={toggleMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Side Sheet */}
            <motion.div
              className="fixed top-0 right-0 z-50 h-full w-full bg-white px-4 pt-2 shadow-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.2 }}
            >
              <div className="mb-4 flex items-center justify-between overflow-hidden rounded-md border-2">
                <span className="p-3 font-bold uppercase">Menu</span>
                <button
                  onClick={toggleMenu}
                  className="bg-orange-95 border-l-2 px-[30px] py-3 font-bold"
                >
                  <X size={24} />
                </button>
              </div>
              <ul className="overflow-hidden rounded-md border-2">
                {navLinks.map(({ name, url }, i) => (
                  <li key={url}>
                    <Link
                      href={url}
                      onClick={toggleMenu}
                      className={`block border-b-2 p-3 ${
                        pathname === url ? "bg-orange-90" : ""
                      }`}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/contact`}
                    onClick={toggleMenu}
                    className="bg-orange-75 inline-block w-full p-3"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
