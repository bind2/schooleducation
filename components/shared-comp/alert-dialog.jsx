"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  cloneElement,
  isValidElement,
  useTransition,
} from "react";
import { AnimatePresence, motion } from "motion/react";

const AlertDialogContext = createContext();

export function AlertDialog({ children }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      const timeout = setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }, 200); // Match animation duration

      return () => clearTimeout(timeout);
    }
  }, [open]);

  return (
    <AlertDialogContext.Provider
      value={{ open, setOpen, isPending, startTransition }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
}

export function AlertDialogTrigger({ children }) {
  const { setOpen } = useContext(AlertDialogContext);

  if (isValidElement(children)) {
    return cloneElement(children, {
      onClick: (e) => {
        children.props?.onClick?.(e); // Call child's original onClick if any
        setOpen(true); // Then open dialog
      },
    });
  }

  // Fallback: wrap non-element (like a plain string) in a <button>
  return (
    <button
      onClick={() => setOpen(true)}
      className="rounded-md border border-gray-300 px-4 py-2 transition hover:bg-gray-100"
    >
      {children}
    </button>
  );
}

export function AlertDialogContent({ children }) {
  const { open } = useContext(AlertDialogContext);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Dialog */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-full max-w-lg space-y-4 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function AlertDialogHeader({ children }) {
  return <div className="space-y-2">{children}</div>;
}

export function AlertDialogTitle({ children }) {
  return (
    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
      {children}
    </h2>
  );
}

export function AlertDialogDescription({ children }) {
  return <p className="text-sm text-gray-600 dark:text-gray-300">{children}</p>;
}

export function AlertDialogFooter({ children }) {
  return (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      {children}
    </div>
  );
}

export function AlertDialogCancel({ children }) {
  const { setOpen, isPending } = useContext(AlertDialogContext);
  return (
    <button
      onClick={() => setOpen(false)}
      disabled={isPending}
      className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
    >
      {children}
    </button>
  );
}

export function AlertDialogAction({ children, onClick }) {
  const { setOpen, startTransition, isPending } =
    useContext(AlertDialogContext);

  return (
    <button
      onClick={() => {
        startTransition(async () => {
          await onClick?.();
          // Only close the dialog if signOut succeeds
          setOpen(false);
        });
      }}
      disabled={isPending}
      className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Loading..." : children}
    </button>
  );
}
