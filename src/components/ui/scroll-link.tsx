"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ScrollLinkProps {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  enableScrollTo?: boolean;
}

export const ScrollLink: React.FC<ScrollLinkProps> = ({
  href,
  onClick,
  children,
  className,
  enableScrollTo = true,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (onClick) {
      onClick();
    }

    if (enableScrollTo && href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href.startsWith("/")) {
      window.location.href = href;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn("cursor-pointer", className)}
      herokit-id="8b6b3eca-d365-48dd-9c68-3c4d59d9aa29"
    >
      {children}
    </button>
  );
};
