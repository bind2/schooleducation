"use client";

import {
  useState,
  useRef,
  useContext,
  useEffect,
  createContext,
  cloneElement,
  useTransition,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const AlertDialogContext = createContext();

export function AlertDialog({ children }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [scrollLocked, setScrollLocked] = useState(false);

  return (
    <AlertDialogContext.Provider
      value={{
        open,
        setOpen,
        scrollLocked,
        setScrollLocked,
        isPending,
        startTransition,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
}

export function AlertDialogTrigger({ children }) {
  const { setOpen } = useContext(AlertDialogContext);
  return cloneElement(children, {
    onClick: () => setOpen(true),
  });
}

export function AlertDialogContent({ children }) {
  const { open, setOpen, isPending, scrollLocked, setScrollLocked } =
    useContext(AlertDialogContext);
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);

  // 1. LOCK scroll on open
  useEffect(() => {
    if (!open || scrollLocked) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    setScrollLocked(true);
  }, [open, scrollLocked, setScrollLocked]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && !isPending) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, isPending, setOpen]);

  // Focus trap
  useEffect(() => {
    if (!open || !dialogRef.current) return;

    const focusable = dialogRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e) => {
      if (e.key !== "Tab") return;

      // prevent all tabbing during loading
      if (isPending) {
        e.preventDefault();
        return;
      }

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", trap);
    first?.focus();
    return () => document.removeEventListener("keydown", trap);
  }, [open, isPending]);

  if (typeof window === "undefined" || !document.body) return null;

  return createPortal(
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        setScrollLocked(false);
      }}
    >
      {open && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={dialogRef}
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            role="alertdialog"
            aria-modal="true"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function AlertDialogHeader({ children }) {
  return <div className="space-y-1 text-left">{children}</div>;
}

export function AlertDialogTitle({ children }) {
  return <h2 className="text-lg font-semibold select-none">{children}</h2>;
}

export function AlertDialogDescription({ children }) {
  return (
    <p className="text-sm text-gray-500 select-none dark:text-gray-400">
      {children}
    </p>
  );
}

export function AlertDialogFooter({ children }) {
  return <div className="mt-6 flex justify-end gap-2">{children}</div>;
}

export function AlertDialogCancel({ children }) {
  const { setOpen, isPending } = useContext(AlertDialogContext);
  return (
    <button
      disabled={isPending}
      onClick={() => setOpen(false)}
      className={cn(
        "rounded-md border border-gray-300 px-4 py-2 text-sm select-none",
        {
          "cursor-not-allowed": isPending,
          "cursor-pointer hover:bg-gray-100": !isPending,
        },
      )}
    >
      {children}
    </button>
  );
}

export function AlertDialogAction({ children, onClick }) {
  const { setOpen, startTransition, isPending } =
    useContext(AlertDialogContext);

  const handleClick = () => {
    startTransition(async () => {
      await onClick?.();
      // Only close the dialog if signOut succeeds
      setOpen(false);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        "rounded-md bg-red-600 px-4 py-2 text-sm text-white select-none",
        {
          "cursor-not-allowed": isPending,
          "cursor-pointer hover:bg-red-700": !isPending,
        },
      )}
    >
      {isPending ? (
        <div className="flex items-center justify-center gap-2">
          <span className="block min-h-4 min-w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
