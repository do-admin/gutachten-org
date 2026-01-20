import Image from "next/image";
import { getResponsiveOptimizedImagePaths } from "@/lib/site-config-helper";
import { ComponentProps } from "react";

export interface OptimizedImageProps
  extends Omit<ComponentProps<typeof Image>, "src"> {
  src: string;
  mobileSrc?: string;
  desktopSrc?: string;
  alt: string;
  title?: string;
  sizes?: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  loading?: "lazy" | "eager";
  className?: string;
}

/**
 * OptimizedImage Component
 *
 * Automatically uses mobile and desktop optimized versions of images when available.
 * Falls back to the base src if optimized versions don't exist.
 *
 * @example
 * <OptimizedImage
 *   src="/images/hero.webp"
 *   alt="Hero image"
 *   width={1200}
 *   height={800}
 *   sizes="(max-width: 768px) 100vw, 50vw"
 * />
 */
export function OptimizedImage({
  src,
  mobileSrc,
  desktopSrc,
  alt,
  title,
  sizes,
  priority = false,
  fetchPriority = "auto",
  loading,
  className,
  ...imageProps
}: OptimizedImageProps) {
  // Auto-detect optimized versions if not explicitly provided
  const optimizedPaths =
    !mobileSrc && !desktopSrc ? getResponsiveOptimizedImagePaths(src) : null;

  // Use explicit sources or auto-detected optimized versions
  const finalMobileSrc = mobileSrc || optimizedPaths?.mobileSrc;
  const finalDesktopSrc = desktopSrc || optimizedPaths?.desktopSrc;
  const hasResponsiveImages = finalMobileSrc || finalDesktopSrc;

  // Determine loading strategy: priority images should use eager, others lazy
  const finalLoading = loading || (priority ? "eager" : "lazy");

  // If we have responsive images, use picture element
  if (hasResponsiveImages) {
    return (
      <picture>
        {finalMobileSrc && (
          <source media="(max-width: 768px)" srcSet={finalMobileSrc} />
        )}
        {finalDesktopSrc && (
          <source media="(min-width: 769px)" srcSet={finalDesktopSrc} />
        )}
        <Image
          {...imageProps}
          src={finalDesktopSrc || finalMobileSrc || src}
          alt={alt}
          sizes={sizes}
          priority={priority}
          fetchPriority={fetchPriority}
          loading={finalLoading}
          className={className}
        />
      </picture>
    );
  }

  // Standard image without responsive variants
  return (
    <Image
      {...imageProps}
      src={src}
      alt={alt}
      sizes={sizes}
      priority={priority}
      fetchPriority={fetchPriority}
      loading={finalLoading}
      className={className}
    />
  );
}
