/**
 * HeroImagePreload Component
 *
 * Provides page-specific hero image preloading for improved LCP.
 * Maps page slugs to their corresponding hero images and adds
 * preload links to the document head.
 *
 * Note: Mobile images may differ from desktop (e.g., profile cards vs hero images)
 */

// Map of page slugs to their hero image paths (desktop and mobile variants)
// mobile can be null if there's no hero image on mobile (text-only hero)
const heroImageMap: Record<
  string,
  { desktop: string; mobile: string | null } | undefined
> = {
  nutzungsdauer: {
    desktop: "/images/gutachten-org/nutzungsdauer/nutzungsdauer-hero-desktop.webp",
    // Mobile shows profile card image, not hero - this is the actual LCP element
    mobile: "/images/gutachten-org/nutzungsdauer/felix-holfert-mobile-view.webp",
  },
  immobilienbewertung: {
    desktop: "/images/gutachten-org/immobilienbewertung/immobilienbewertung-hero-desktop.webp",
    // Hero image is hidden on mobile (hidden lg:block), LCP is text
    mobile: null,
  },
  ratgeber: {
    desktop: "/images/gutachten-org/ratgeber/ratgeber-hero-desktop.webp",
    mobile: "/images/gutachten-org/ratgeber/ratgeber-hero-mobile.webp",
  },
  kontakt: {
    desktop: "/images/gutachten-org/kontakt/kontakt-hero-desktop.webp",
    mobile: "/images/gutachten-org/kontakt/kontakt-hero-mobile.webp",
  },
  steuerberatung: {
    desktop: "/images/gutachten-org/steuerberatung/moderne-architektur-desktop.webp",
    mobile: "/images/gutachten-org/steuerberatung/moderne-architektur-mobile.webp",
  },
};

interface HeroImagePreloadProps {
  slug: string;
}

export function HeroImagePreload({ slug }: HeroImagePreloadProps) {
  const heroImages = heroImageMap[slug];

  if (!heroImages) {
    return null;
  }

  return (
    <>
      {/* Preload desktop hero image */}
      <link
        rel="preload"
        href={heroImages.desktop}
        as="image"
        fetchPriority="high"
        media="(min-width: 769px)"
      />
      {/* Preload mobile hero image (if exists) */}
      {heroImages.mobile && (
        <link
          rel="preload"
          href={heroImages.mobile}
          as="image"
          fetchPriority="high"
          media="(max-width: 768px)"
        />
      )}
    </>
  );
}
