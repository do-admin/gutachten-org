"use client";

import React, { useState, useEffect, useRef } from "react";
import { CardLayout, CardLayoutItem, CardLayoutProps } from "./CardLayout";
import IframeModal from "@/components/custom/IframeModal/IframeModal";
import {
  getIframeConfigForHref,
  shouldOpenInModal,
} from "@/lib/iframe-modal-config";

interface CardLayoutWithModalProps extends CardLayoutProps {
  // All CardLayout props are inherited
}

/**
 * Client wrapper component that adds modal functionality to CardLayout
 * Intercepts clicks on form page links and opens them in a modal instead
 */
export function CardLayoutWithModal(props: CardLayoutWithModalProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIframeConfig, setCurrentIframeConfig] = useState<{
    src: string;
    title: string;
    height?: string | number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleClick = (e: MouseEvent) => {
      // Find the closest link element
      const target = e.target as HTMLElement;
      const link = target.closest("a[href]") as HTMLAnchorElement | null;

      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || !shouldOpenInModal(href)) return;

      const iframeConfig = getIframeConfigForHref(href);
      if (iframeConfig) {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIframeConfig({
          src: iframeConfig.iframeSrc,
          title: iframeConfig.title,
          height: iframeConfig.height,
        });
        setModalOpen(true);
      }
    };

    const container = containerRef.current;
    container.addEventListener("click", handleClick, true); // Use capture phase

    return () => {
      container.removeEventListener("click", handleClick, true);
    };
  }, [props.cards]);

  return (
    <>
      <div ref={containerRef}>
        <CardLayout {...props} />
      </div>
      {currentIframeConfig && (
        <IframeModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          src={currentIframeConfig.src}
          title={currentIframeConfig.title}
          height={currentIframeConfig.height}
        />
      )}
    </>
  );
}

export default CardLayoutWithModal;
