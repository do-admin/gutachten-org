"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/blocks/Heading/Heading";

export interface EmbedScriptProps {
  /**
   * Unique identifier for the embed container
   */
  id: string;

  /**
   * The script source URL
   */
  scriptSrc: string;

  /**
   * The container ID where the script should mount
   */
  mountId: string;

  /**
   * Optional title for the section
   */
  title?: string;

  /**
   * Optional subtitle/description
   */
  subtitle?: string;

  /**
   * Optional heading level for title (1-6)
   */
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Additional script attributes as key-value pairs
   */
  scriptAttributes?: Record<string, string>;

  /**
   * Additional CSS classes for the container
   */
  className?: string;

  /**
   * Additional CSS classes for the title container
   */
  titleContainerClassName?: string;

  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;

  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;

  /**
   * Additional CSS classes for the embed container
   */
  embedContainerClassName?: string;

  /**
   * Whether to defer script loading
   */
  defer?: boolean;

  /**
   * Whether to async load script
   */
  async?: boolean;

  /**
   * Script type attribute
   */
  scriptType?: string;
}

/**
 * EmbedScript Component
 *
 * A reusable component for embedding external scripts and widgets.
 * Supports external widgets like Join.com job boards, calendars, forms, etc.
 *
 * @example
 * ```tsx
 * <EmbedScript
 *   id="join-widget"
 *   scriptSrc="https://join.com/api/widget/bundle/..."
 *   mountId="join-widget"
 *   title="Offene Stellen"
 *   subtitle="Entdecken Sie unsere aktuellen Karrieremöglichkeiten"
 *   defer={true}
 *   scriptType="text/javascript"
 *   scriptAttributes={{
 *     "data-mount-in": "#join-widget"
 *   }}
 * />
 * ```
 */
const EmbedScript: React.FC<EmbedScriptProps> = ({
  id,
  scriptSrc,
  mountId,
  title,
  subtitle,
  titleLevel = 2,
  scriptAttributes = {},
  className,
  titleContainerClassName,
  titleClassName,
  subtitleClassName,
  embedContainerClassName,
  defer = true,
  async = false,
  scriptType = "text/javascript",
}) => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only load script on client side
    if (typeof window === "undefined") return;

    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (existingScript) {
      return;
    }

    // Create and configure script element
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.type = scriptType;

    if (defer) script.defer = true;
    if (async) script.async = true;

    // Add custom attributes
    Object.entries(scriptAttributes).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    // Append script to document
    document.body.appendChild(script);
    scriptRef.current = script;

    // Cleanup function
    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
    };
  }, [scriptSrc, scriptAttributes, defer, async, scriptType]);

  // Remove markup elements and fix images loaded by external scripts
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const removeMarkupElements = () => {
      const mountElement = document.getElementById(mountId);
      if (!mountElement) return;

      // Find and remove all .markup elements
      const markupElements = mountElement.querySelectorAll(".markup");
      markupElements.forEach((element) => {
        const text = element.textContent || "";
        // Remove elements containing "Alle offenen Stellen bei Evalion GmbH ansehen"
        if (text.includes("Alle offenen Stellen bei Evalion GmbH ansehen")) {
          element.remove();
        }
      });
    };

    const fixExternalImages = (scope: Document | Element = document) => {
      // Find images from Join.com CDN that are missing width, height, or loading attributes
      // Specifically target the Evalion logo: http://cdn.join.com/6842dfdc4f09a90008a53055/evalion-gmb-h-logo-s.png
      const images = scope.querySelectorAll<HTMLImageElement>(
        'img[src*="cdn.join.com"], img[src*="evalion-gmb-h-logo"], img[src*="6842dfdc4f09a90008a53055"]'
      );

      images.forEach((img) => {
        // Skip if already processed (has all required attributes)
        if (
          img.hasAttribute("width") &&
          img.hasAttribute("height") &&
          img.hasAttribute("loading")
        ) {
          return;
        }

        // Add width and height if missing (Join.com logo is typically 80x80 or similar)
        // For the Evalion logo, we'll use reasonable defaults
        if (!img.hasAttribute("width")) {
          img.setAttribute("width", "80");
        }
        if (!img.hasAttribute("height")) {
          img.setAttribute("height", "80");
        }
        // Add loading attribute if missing
        if (!img.hasAttribute("loading")) {
          img.setAttribute("loading", "lazy");
        }
      });
    };

    // Use MutationObserver to watch for DOM changes
    const observer = new MutationObserver(() => {
      removeMarkupElements();
      const mountElement = document.getElementById(mountId);
      if (mountElement) {
        fixExternalImages(mountElement);
      }
      // Also check document-wide as fallback
      fixExternalImages(document);
    });

    const mountElement = document.getElementById(mountId);
    if (mountElement) {
      observer.observe(mountElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["src"],
      });

      // Also observe document body for images that might be added outside mount element
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["src"],
      });

      // Also check immediately in case element already exists
      removeMarkupElements();
      fixExternalImages(mountElement);
      fixExternalImages(document);

      // Cleanup
      return () => {
        observer.disconnect();
      };
    }
  }, [mountId]);

  return (
    <>
      <div
        className={cn(
          "container-gutachten mx-auto py-12 md:py-16",
          titleContainerClassName
        )}
        herokit-id="91818533-8c24-44f9-95b1-ef8e07e476d3"
      >
        {title && (
          <div className="" herokit-id="09e6c59d-3290-4c9c-8ae7-fe856fcebd70">
            {title && (
              <Heading
                level={titleLevel}
                className={cn(
                  "text-foreground text-start text-3xl font-bold md:text-4xl",
                  titleClassName
                )}
                herokit-id="ae19a212-2c32-496d-9ae8-45bf3919b8ca"
              >
                {title}
              </Heading>
            )}
          </div>
        )}

        <section id={id} className={cn("", className)}>
          <div
            ref={containerRef}
            id={mountId}
            className={cn("mx-auto w-full max-w-6xl", embedContainerClassName)}
          />
        </section>
      </div>
    </>
  );
};

export default EmbedScript;
