"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useInView, motion } from "motion/react";

export default function Footer() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  return (
    <footer>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-absolute-white mt-20 mb-4 rounded-lg border-2 p-5 [box-shadow:4px_4px_0px_1px_var(--absolute-black)]"
        >
          <div className="flex flex-col gap-10 md:flex-row">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col items-center gap-4 md:items-start">
                <Link href={"/"} className="flex items-center gap-1">
                  <Image
                    src={"svg/logo.svg"}
                    alt="logo"
                    width={40}
                    height={40}
                    className="-ml-[3px]"
                  />
                  <h1 className="font-bold">Little Learners</h1>
                </Link>
                <p className="text-center md:text-start">
                  We believe in the power of play to foster creativity,
                  problem-solving skills, and imagination.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href={`mailto:deepak7890bind@gmail.com`}
                  className="flex items-center gap-2 hover:underline"
                >
                  <div className="bg-orange-97 rounded-sm border-2 p-1">
                    <Image
                      src={"svg/mail.svg"}
                      alt="mail icon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <span>deepak7890bind@gmail.com</span>
                </Link>
                <Link
                  href={`tel:+917722072980`}
                  className="flex items-center gap-2 hover:underline"
                >
                  <div className="bg-orange-97 rounded-sm border-2 p-1">
                    <Image
                      src={"svg/phone.svg"}
                      alt="phone icon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <span>+91 7722072980</span>
                </Link>
                <Link
                  href="https://www.google.com/maps"
                  target="_blank"
                  className="flex items-center gap-2 hover:underline"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="bg-orange-97 rounded-sm border-2 p-1">
                    <Image
                      src={"svg/location-mark.svg"}
                      alt="location icon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <span className="flex items-center justify-center gap-1">
                    Somewhere in the World{" "}
                    {isHovered && <ExternalLink size={16} />}
                  </span>
                </Link>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-10 lg:grid-cols-4">
              <div>
                <span className="font-semibold">Home</span>
                <ul className="mt-4 flex flex-col gap-2">
                  <li>
                    <Link href={"/#benefits"} className="hover:underline">
                      Benefits
                    </Link>
                  </li>
                  <li>
                    <Link href={"/#testimonials"} className="hover:underline">
                      Our Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href={"/#faq"} className="hover:underline">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <span className="font-semibold">Academics</span>
                <ul className="mt-4 flex flex-col gap-2">
                  <li>
                    <Link
                      href={"/academics#special-features"}
                      className="hover:underline"
                    >
                      Special Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/academics#gallery"}
                      className="hover:underline"
                    >
                      Gallery
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <span className="font-semibold">About Us</span>
                <ul className="mt-4 flex flex-col gap-2">
                  <li>
                    <Link
                      href={"/about-us#mission-and-vision"}
                      className="hover:underline"
                    >
                      mission and vision
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/about-us#awards-and-recognitions"}
                      className="hover:underline"
                    >
                      Awards and Recognitions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/about-us#history"}
                      className="hover:underline"
                    >
                      History
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/about-us#teachers"}
                      className="hover:underline"
                    >
                      Teachers
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <span className="font-semibold">Contact Us</span>
                <ul className="mt-4 flex flex-col gap-2">
                  <li>
                    <Link
                      href={"/contact#information"}
                      className="hover:underline"
                    >
                      Information
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/contact#map-and-direction"}
                      className="hover:underline"
                    >
                      Map & Direction
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t-1 border-b-1 py-4 sm:flex-row">
            <div className="flex items-center gap-2 text-sm">
              <Link href={"/terms-of-service"} className="hover:underline">
                Terms of Service
              </Link>
              |
              <Link href={"/privacy-policy"} className="hover:underline">
                Privacy Policy
              </Link>
              |
              <Link href={"/cookie-policy"} className="hover:underline">
                Cookie Policy
              </Link>
            </div>
            <div className="flex gap-2">
              <Link
                href={"https://www.facebook.com"}
                target="_blank"
                aria-label="facebook"
                className="bg-orange-90 rounded-md border-2 p-2"
              >
                <Image
                  src={"svg/facebook.svg"}
                  alt="facebook icon"
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href={"https://twitter.com"}
                target="_blank"
                aria-label="twitter"
                className="bg-orange-90 rounded-md border-2 p-2"
              >
                <Image
                  src={"svg/twitter.svg"}
                  alt="twitter icon"
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href={"https://www.linkedin.com"}
                target="_blank"
                aria-label="linkedin"
                className="bg-orange-90 rounded-md border-2 p-2"
              >
                <Image
                  src={"svg/linkedin.svg"}
                  alt="linkedin icon"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </div>
          <p className="mt-5 text-center text-sm">
            Copyright © [2025] Little Learners Academy. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
