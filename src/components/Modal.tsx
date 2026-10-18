import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-[944px]",
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center px-4
                 pt-[calc(1rem+env(safe-area-inset-top,0px))]
                 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]
                 lg:px-5
                 lg:pt-[calc(1.25rem+env(safe-area-inset-top,0px))]
                 lg:pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        data-lenis-prevent="true"
        className={`flex thin-scrollbar max-h-[calc(100dvh-32px)] w-full flex-col
                    overflow-y-auto rounded-[4px] bg-white
                    lg:max-h-[calc(100dvh-40px)] ${maxWidth} focus:outline-none`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/20 bg-white py-1.5 pr-1.5 pl-4">
          <span className="text-sm text-black">{title}</span>
          <button
            type="button"
            aria-label={`Close ${title}`}
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-[2px] bg-stone-100 text-black transition-colors hover:bg-stone-200"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>,
    document.body,
  );
};
