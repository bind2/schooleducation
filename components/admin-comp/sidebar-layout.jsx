"use client";

import { PanelLeft } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ScrollArea } from "../scrollarea";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { User } from "lucide-react";
import Image from "next/image";
import { ChevronsUpDown } from "lucide-react";
import { Tooltip } from "../tooltip";
import { Home } from "lucide-react";

export function SidebarLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(null);

  useEffect(() => {
    const storedIsOpen = localStorage.getItem("isOpen");

    if (storedIsOpen !== null) {
      setIsOpen(JSON.parse(storedIsOpen));
    } else {
      setIsOpen(false); // default close
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    const next = !isOpen;
    setIsOpen(next);
    localStorage.setItem("isOpen", JSON.stringify(next));
  };

  if (isOpen === null || isMobile === null) {
    return null; // or return a Skeleton/Loader if you want
  }

  const navItems = [
    {
      icon: <Home size={18}/>,
      label: 'Home',
      url: '/'
    },
    {
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
      url: "/admin",
    },
    {
      icon: <User size={18} />,
      label: "Students",
      url: "/admin/students",
    },
  ];

  return (
    <div className="relative flex min-h-screen">
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <>
            <motion.div
              key={isMobile ? "mobile" : "desktop"}
              initial={
                isMobile ? { x: "-100%" } : { width: isOpen ? "260px" : "57px" }
              }
              animate={
                isMobile
                  ? { x: isOpen ? 0 : "-100%" }
                  : { width: isOpen ? "260px" : "57px" }
              }
              exit={isMobile ? { x: "-100%" } : { width: "57px" }}
              transition={{ duration: 0.3, type: "tween" }}
              className={`${isMobile ? "fixed" : "sticky"} top-0 left-0 z-40 flex h-screen flex-col border-r bg-white`}
              style={{ width: isMobile ? "260px" : undefined }}
            >
              <div className="w-full p-2">
                <Link
                  href={"/admin"}
                  className={`flex cursor-pointer items-center gap-2 rounded-md transition-all duration-200 ${isOpen ? "p-2 hover:bg-gray-300" : "p-0"} `}
                >
                  <Image
                    src={"/svg/logo.svg"}
                    alt="logo"
                    width={40}
                    height={40}
                    priority
                    className="max-h-10 min-h-10 max-w-10 min-w-10"
                  />
                  <motion.div
                    initial={false}
                    animate={{
                      width: isOpen ? "100%" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <h1 className="font-bold whitespace-nowrap">
                      Little Learners
                    </h1>
                  </motion.div>
                </Link>
              </div>

              {/* <ScrollArea> */}
              <div className="h-full p-2">
                <ul>
                  {navItems.map(({ label, url, icon }, index) => (
                    <li
                      key={index}
                      className="block w-full"
                      onClick={() => {
                        if (isMobile) {
                          toggleSidebar();
                        }
                      }}
                    >
                      {isOpen ? (
                        <Link
                          href={url}
                          className="flex w-full gap-2 rounded-md px-3 py-2 transition-all duration-300 hover:bg-gray-200"
                        >
                          <div className="flex items-center justify-center rounded-md">
                            {icon}
                          </div>

                          <motion.div
                            key="ul-list"
                            initial={false}
                            animate={{
                              width: isOpen ? "100%" : 0,
                              opacity: isOpen ? 1 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <span className="whitespace-nowrap">{label}</span>
                          </motion.div>
                        </Link>
                      ) : (
                        <Tooltip content={label} side="right">
                          <Link
                            href={url}
                            className="flex cursor-pointer items-center justify-center rounded-md px-3 py-2 transition-all duration-200 hover:bg-gray-300"
                          >
                            {icon}
                          </Link>
                        </Tooltip>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              {/* </ScrollArea> */}

              <div className="w-full p-2">
                <div
                  className={`flex cursor-pointer gap-2 overflow-hidden rounded-md transition-all duration-200 ${isOpen ? "p-2 hover:bg-gray-300" : "p-0"} `}
                >
                  <Image
                    src="https://github.com/shadcn.png"
                    alt="avatar"
                    width={40}
                    height={40}
                    priority
                    className="max-h-10 min-h-10 max-w-10 min-w-10 rounded-md"
                  />

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        key="profile-info"
                        initial={false}
                        animate={{
                          width: isOpen ? "100%" : 0,
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        className="flex w-full items-center justify-between"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium whitespace-nowrap">
                            Deepak Bind
                          </span>
                          <span className="text-xs whitespace-nowrap">
                            deepak7890bind@gmail.com
                          </span>
                        </div>
                        <ChevronsUpDown size={16} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Black backdrop on mobile */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-30 bg-black"
                onClick={toggleSidebar}
              />
            )}
          </>
        )}
      </AnimatePresence>

      <div className="min-h-screen w-full flex-1">
        <div className="sticky top-0 left-0 z-10 flex h-[60px] w-full items-center justify-between border-b bg-white p-2">
          <button
            className="rounded-md p-2 transition-all duration-200 hover:cursor-pointer hover:bg-gray-300"
            onClick={toggleSidebar}
          >
            <PanelLeft size={18} />
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
