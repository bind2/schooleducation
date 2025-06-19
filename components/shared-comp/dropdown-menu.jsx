"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils"; // Optional

const DropdownContext = createContext();

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !menuRef.current?.contains(e.target) &&
        !triggerRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef, menuRef }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({ asChild, children }) {
  const { setOpen, triggerRef } = useContext(DropdownContext);

  const trigger = (
    <div
      ref={triggerRef}
      onClick={() => setOpen((prev) => !prev)}
      className="cursor-pointer"
    >
      {children}
    </div>
  );

  return asChild ? children : trigger;
}

export function DropdownMenuContent({
  children,
  align = "start",
  className = "",
}) {
  const { open, menuRef } = useContext(DropdownContext);

  const alignClass = align === "end" ? "right-0" : "left-0";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className={cn(
            "absolute z-50 mt-2 w-56 rounded-md border bg-white shadow-lg",
            alignClass,
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DropdownMenuLabel({ children }) {
  return (
    <div className="px-4 py-2 text-xs font-semibold text-gray-500">
      {children}
    </div>
  );
}

export function DropdownMenuGroup({ children }) {
  return <div className="py-1">{children}</div>;
}

export function DropdownMenuItem({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm ${
        disabled
          ? "cursor-not-allowed text-gray-400"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

export function DropdownMenuSeparator() {
  return <div className="my-1 h-px bg-gray-200" />;
}

export function DropdownMenuShortcut({ children }) {
  return <span className="text-xs text-gray-400">{children}</span>;
}
