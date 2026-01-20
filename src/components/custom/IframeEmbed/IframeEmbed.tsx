"use client";

import { useEffect, useState } from "react";
import { Heading } from "@/components/blocks/Heading/Heading";

export interface IframeEmbedProps {
  src: string;
  title?: string;
  height?: string | number;
  className?: string;
  allowFullScreen?: boolean;
  heading?: string;
  headingClassName?: string;
}

export default function IframeEmbed({
  src,
  title = "Embedded content",
  height = "850px",
  className = "",
  allowFullScreen = true,
  heading,
  headingClassName = "",
}: IframeEmbedProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Wait for browser idle time to avoid race conditions
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => setMounted(true));
    } else {
      setTimeout(() => setMounted(true), 1500);
    }
  }, []);

  const heightStyle = typeof height === "number" ? `${height}px` : height;

  return (
    <div className={`w-full ${className}`}>
      {heading && (
        <Heading level={1} className={headingClassName}>
          {heading}
        </Heading>
      )}
      {mounted ? (
        <iframe
          src={src}
          width="100%"
          height={heightStyle}
          style={{ border: 0, display: "block" }}
          allowFullScreen={allowFullScreen}
          title={title}
        />
      ) : (
        <div
          style={{ height: heightStyle }}
          className="flex items-center justify-center bg-gray-50"
        >
          Lade Inhalte...
        </div>
      )}
    </div>
  );
}
