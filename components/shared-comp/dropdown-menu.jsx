"use client";

import { AnimatePresence, motion } from "motion/react";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hook/use-is-mobile";

const DropdownContext = createContext(null);

export function Dropdown({ children }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const triggerRef = useRef(null);

  return (
    <DropdownContext.Provider
      value={{ open, setOpen, triggerRef, isPending, startTransition }}
    >
      <div className="relative inline-block text-left">{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({ children, className }) {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("DropdownTrigger must be used within Dropdown");

  return (
    <div
      ref={ctx.triggerRef}
      onClick={() => ctx.setOpen((prev) => !prev)}
      className={cn("cursor-pointer focus:outline-none", className)}
    >
      {children}
    </div>
  );
}

export function DropdownContent({ children, className, sideOffset = 8 }) {
  const ctx = useContext(DropdownContext);
  const ref = useRef(null);
  const isMobile = useIsMobile();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !ctx.triggerRef.current.contains(event.target)
      ) {
        ctx.setOpen(false);
      }
    };

    if (ctx.open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ctx.open]);

  // Trap focus within dropdown
  useEffect(() => {
    if (!ctx.open || !ref.current) return;

    const focusableElements = ref.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      } else if (e.key === "Escape") {
        ctx.setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [ctx.open]);

  return (
    <AnimatePresence>
      {ctx.open && (
        <motion.div
          ref={ref}
          initial={{
            opacity: 0,
            scale: 0.95,
            ...(isMobile ? { y: 10 } : { x: -sideOffset }),
          }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{
            opacity: 0,
            scale: 0.95,
            ...(isMobile ? { y: 10 } : { x: -sideOffset }),
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "absolute bottom-full left-0 z-50 mb-1 md:ml-1 ml-0 w-full rounded-md border bg-white p-1 shadow-lg md:bottom-0 md:left-full md:mb-0 md:w-48",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DropdownItem({ children, onClick }) {
  const { setOpen, isPending, startTransition } = useContext(DropdownContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      await onClick?.();
      setOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      role="menuitem"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className={cn(
        "cursor-pointer rounded-sm px-2 py-1.5 text-sm text-zinc-800 select-none hover:bg-gray-200",
      )}
    >
      {isLoading ? (
        <div className="flex items-center justify-start gap-2">
          <span className="block min-h-4 min-w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          Loading...
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export function DropdownLabel({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "text-muted-foreground px-2 py-1.5 text-sm font-semibold",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownSeparator({ className, ...props }) {
  return <div className={cn("my-1 h-px bg-black", className)} {...props} />;
}
