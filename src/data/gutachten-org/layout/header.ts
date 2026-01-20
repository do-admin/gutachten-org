import { HeaderProps } from "@/lib/component-schemas";

export const header: HeaderProps = {
  variant: "light" as const,
  designVariant: "gutachten-org" as const,
  logo: {
    light: "/images/gutachten-org/logo/gutachten-org-logo-light.svg",
    dark: "/images/gutachten-org/logo/gutachten-org-logo-dark.svg",
    mobileIcon: "/images/gutachten-org/logo/gutachten-org-icon-dark.webp",
  },
  ctaButton: {
    text: "Kostenlose Ersteinschätzung",
    href: "/angebot",
    variant: "default" as const,
    size: "sm" as const,
  },
  className: "",
  scrollEffects: {
    enabled: true,
    shadowThreshold: 10,
    blurEnabled: true,
  },
  mobileMenu: {
    enabled: true,
    animationDuration: 300,
  },
};
