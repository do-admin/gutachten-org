import React from "react";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/blocks/Heading/Heading";

export interface IframeProps {
  /**
   * Unique identifier for the iframe container
   */
  id?: string;

  /**
   * The iframe source URL
   */
  src: string;

  /**
   * Title for the iframe (accessibility)
   */
  title?: string;

  /**
   * Height of the iframe (number in pixels or string like "600px")
   */
  height?: string | number;

  /**
   * Additional CSS classes for the iframe
   */
  className?: string;

  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;

  /**
   * Whether to allow fullscreen
   */
  allowFullScreen?: boolean;

  /**
   * Loading strategy
   */
  loading?: "lazy" | "eager";

  /**
   * Optional title for the section
   */
  sectionTitle?: string;

  /**
   * Optional subtitle/description
   */
  subtitle?: string;

  /**
   * Optional heading level for title (1-6)
   */
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;

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
   * Additional iframe attributes
   */
  allow?: string;
  name?: string;
  dataCalLink?: string;
}

/**
 * Iframe Component
 *
 * A server-side rendered component for embedding iframes.
 * Perfect for embedding external content like Cal.com booking widgets, forms, etc.
 * This component is server-rendered for better SEO and performance.
 *
 * @example
 * ```tsx
 * <Iframe
 *   src="https://app.cal.com/team/gutachten-org/website-anfrage?theme=light"
 *   title="Book a call"
 *   height={750}
 *   sectionTitle="Book Your Appointment"
 *   subtitle="Choose a time that works for you"
 * />
 * ```
 */
const Iframe: React.FC<IframeProps> = ({
  id,
  src,
  title = "Embedded content",
  height = 600,
  className = "",
  containerClassName = "",
  allowFullScreen = true,
  loading = "lazy",
  sectionTitle,
  subtitle,
  titleLevel = 2,
  titleContainerClassName,
  titleClassName,
  subtitleClassName,
  allow,
  name,
  dataCalLink,
}) => {
  // Convert height to string if it's a number
  const heightStyle = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      id={id}
      className={cn("container-gutachten mx-auto", containerClassName)}
    >
      {(sectionTitle || subtitle) && (
        <div
          className={cn("space-y-10 text-center", titleContainerClassName)}
        >
          {sectionTitle && (
            <Heading
              level={titleLevel}
              className={cn(
                "justify-start text-center text-3xl leading-10 font-medium text-[#273238]",
                titleClassName
              )}
            >
              {sectionTitle}
            </Heading>
          )}
          {subtitle && (
            <p
              className={cn(
                "mx-auto max-w-2xl text-base text-[#273238] whitespace-pre-line",
                subtitleClassName
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className={cn("w-full", className)}>
        <iframe
          src={src}
          width="100%"
          height={heightStyle}
          style={{ border: 0, display: "block" }}
          allowFullScreen={allowFullScreen}
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
          loading={loading}
          allow={allow}
          name={name}
          data-cal-link={dataCalLink}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Iframe;
