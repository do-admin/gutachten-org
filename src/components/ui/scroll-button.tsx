"use client";

import React from "react";
import { Button } from "./button";
import { LucideIcon } from "lucide-react";

interface ScrollButtonProps {
  href: string;
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "accent";
  size?: "default" | "sm" | "lg" | "icon";
  icon?: LucideIcon;
  className?: string;
  onClick?: () => void;
  enableScrollTo?: boolean;
}

export const ScrollButton: React.FC<ScrollButtonProps> = ({
  href,
  text,
  variant,
  size,
  icon: Icon,
  className,
  onClick,
  enableScrollTo = true,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (enableScrollTo && href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href.startsWith("/")) {
      window.location.href = href;
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
      herokit-id="4638c9b0-4781-4a43-8be9-7510a63f90cf"
    >
      {text}
      {Icon && <Icon className="ml-2 h-4 w-4" />}
    </Button>
  );
};
