import { FooterProps } from "@/components/blocks/Footer/Footer";
import { getCurrentSite } from "@/lib/config";
import { navigation } from "./navigation";

// Get contact data from multi-page-config.json
const siteConfig = getCurrentSite();
const contact = siteConfig.contact;
const socialLinks = siteConfig.social;

// Map navigation.legal to footer links
const legalLinks = navigation.legal.map((item) => ({
  label: item.name,
  href: item.href,
  isExternal: false,
  hasArrow: false,
}));

// Popular/Beliebt section links - matching the headlines on the page
const beliebtLinks = [
  {
    label: "Afa-Rechner",
    href: "/afa-rechner/",
    isExternal: false,
    hasArrow: true,
  },
  {
    label: "Restnutzungsdauer berechnen",
    href: "/restnutzungsdauergutachten-ersteinschaetzung/",
    isExternal: true,
    hasArrow: false,
  },
  {
    label: "FAQ - Häufig gestellte Fragen",
    href: "/haeufig-gestellte-fragen/",
    isExternal: false,
    hasArrow: false,
  },
  {
    label: "Immobilienlexikon",
    href: "/lexikon/",
    isExternal: false,
    hasArrow: false,
  },
  {
    label: "Über uns",
    href: "/ueber-uns/",
    isExternal: false,
    hasArrow: false,
  },
  {
    label: "Ratgeber",
    href: "/ratgeber/",
    isExternal: false,
    hasArrow: false,
  },
  {
    label: "Angebot",
    href: "/angebot/",
    isExternal: false,
    hasArrow: false,
  },
  {
    label: "Karriere",
    href: "/karriere",
    isExternal: false,
    hasArrow: false,
  },
];

export const footer: FooterProps = {
  tagline:
    "Die Gutachten-Komplettlösung für Investoren, Eigentümer und Immobilienprofis.",
  logo: {
    src: "/images/gutachten-org/logo/gutachten-org-logo-light.svg",
  },
  sections: [
    {
      title: "Beliebt",
      links: beliebtLinks,
    },
    {
      title: "Rechtliches",
      links: legalLinks,
    },
    {
      title: "Standorte",
      links: [
        {
          label: "Berlin",
          href: "/berlin/",
          isExternal: false,
        },
        {
          label: "Frankfurt am Main",
          href: "/frankfurt/",
          isExternal: false,
        },
        {
          label: "Hamburg",
          href: "/hamburg/",
          isExternal: false,
        },
        {
          label: "Köln",
          href: "/koeln/",
          isExternal: false,
        },
      ],
    },
  ],
  contactSection: {
    title: "Kontakt",
    phone: contact.phone,
    email: contact.email,
  },
  socialLinks: [
    {
      platform: "instagram",
      href: socialLinks.instagram,
      ariaLabel: "Instagram",
    },
    {
      platform: "linkedin",
      href: socialLinks.linkedin,
      ariaLabel: "LinkedIn",
    },
  ],
  copyrightText:
    "© 2026 Gutachten.org (Evalion GmbH). Alle Rechte vorbehalten.",
  // containerClassName: "mx-auto max-w-[1180px]! px-4",
  // topSectionClassName: 'py-20!',
  // className: 'px-0!',
};
