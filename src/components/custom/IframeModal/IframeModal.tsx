"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface IframeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  title?: string;
  className?: string;
  contentClassName?: string;
  height?: string | number;
}

export default function IframeModal({
  open,
  onOpenChange,
  src,
  title = "Formular",
  className,
  contentClassName,
  height = "90vh",
}: IframeModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportHeight, setViewportHeight] = useState<number>(0);

  // Update viewport height on mount and resize (handles zoom)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    window.addEventListener("orientationchange", updateViewportHeight);

    return () => {
      window.removeEventListener("resize", updateViewportHeight);
      window.removeEventListener("orientationchange", updateViewportHeight);
    };
  }, []);

  // Calculate max available height based on current viewport
  const getMaxAvailableHeight = (): number => {
    if (viewportHeight === 0 && typeof window !== "undefined") {
      return window.innerHeight;
    }
    if (viewportHeight === 0) return 800; // Fallback
    // Account for header (~80px) and padding (~48px)
    return viewportHeight - 128;
  };

  // Convert height prop to pixels
  const getConfiguredHeight = (): number => {
    if (typeof height === "number") {
      return height;
    }
    if (typeof height === "string" && height.endsWith("px")) {
      return parseInt(height, 10);
    }
    if (typeof height === "string" && height.endsWith("vh")) {
      const vhValue = parseFloat(height);
      const currentVh =
        viewportHeight ||
        (typeof window !== "undefined" ? window.innerHeight : 800);
      return (currentVh * vhValue) / 100;
    }
    // Default: 90vh
    const currentVh =
      viewportHeight ||
      (typeof window !== "undefined" ? window.innerHeight : 800);
    return (currentVh * 90) / 100;
  };

  // Calculate the actual height to use
  const calculateContentHeight = (): string => {
    const maxAvailable = getMaxAvailableHeight();
    const configured = getConfiguredHeight();

    // Use the smaller of configured height or max available
    // This ensures content fits on screen and adapts to zoom
    // If configured height is larger than available, use available (zoom out scenario)
    // If configured height is smaller, use configured (content is small)
    const finalHeight = Math.min(configured, maxAvailable);

    // Don't enforce a minimum that's too large - let it be flexible
    // Only ensure it's at least 300px for usability, but respect max
    const minHeight = Math.min(300, maxAvailable * 0.4);

    return `${Math.max(finalHeight, minHeight)}px`;
  };

  // Get max height for the dialog content
  const getMaxHeightStyle = (): string => {
    const maxAvailable = getMaxAvailableHeight();
    return `${maxAvailable}px`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "w-full max-w-[95vw] gap-0 p-0",
          "sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-[75vw]",
          "flex flex-col",
          "rounded-2xl!",
          className
        )}
        style={{
          height: "auto",
          maxHeight: getMaxHeightStyle(),
        }}
      >
        <DialogHeader className="flex-shrink-0 px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
          <DialogTitle
            className="text-lg font-semibold sm:text-xl"
            herokit-id="65c29010-6f39-46ae-b98e-cf584f156800"
          >
            {title}
          </DialogTitle>
        </DialogHeader>
        <div
          ref={containerRef}
          className={cn(
            "relative w-full overflow-auto",
            "px-4 pb-4 sm:px-6 sm:pb-6",
            contentClassName
          )}
          style={{
            height: calculateContentHeight(),
            maxHeight: getMaxHeightStyle(),
            minHeight: "300px",
          }}
        >
          <iframe
            ref={iframeRef}
            src={src}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={title}
            className="h-full w-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
