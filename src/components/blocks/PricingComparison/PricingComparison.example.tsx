import { PricingComparison } from "./PricingComparison";
import type { PricingComparisonProps } from "./PricingComparison";

export const pricingComparisonExample: PricingComparisonProps = {
  sectionId: "pricing",
  heading: "Was kostet ein Nutzungsdauergutachten?",
  topCtaLabel: "Kostenlose Ersteinschätzung",
  topCtaHref: "/angebote",
  topCtaIcon: "ArrowUpRight",
  tiers: [
    {
      title: "Restnutzungsdauergutachten (ohne Vor-Ort_besichtigung)",
      price: "950,00€",
      priceNote: "(inkl. MwSt)",
      features: [
        {
          text: "Erstellt durch zertifizierte Gutachter (DIN EN ISO/IEC 17024)",
        },
        {
          text: "Komplexe Gutachten mit fundierter Berechnung",
        },
        {
          text: "Nach geltender Rechtssprechung zur Anerkennung beim Finanzamt",
        },
      ],
      ctaLabel: "Kostenlose Ersteinschätzung",
      ctaHref: "/angebote",
      ctaVariant: "default",
    },
    {
      title: "Restnutzungsdauergutachten (mit Vor-Ort-Außenbesichtigung)",
      price: "179,00 €",
      pricePrefix: "+",
      priceNote: "(inkl. MwSt)",
      priceClassName: "text-[#EB6613]",
      features: [
        {
          text: "Außenbesichtigung",
        },
        {
          text: "Fotodokumentation",
        },
        {
          text: "Erhöhte Wertigkeit des Gutachtens",
        },
      ],
      ctaLabel: "Kostenlose Ersteinschätzung",
      ctaHref: "/angebote",
      ctaVariant: "accent",
      badge: "EMPFOHLEN",
      highlighted: true,
    },
    {
      title:
        "Restnutzungsdauergutachten (mit Vor-Ort-Innen-und-Außenbesichtigung)",
      price: "359,00 €",
      pricePrefix: "+",
      priceNote: "(inkl. MwSt)",
      features: [
        {
          text: "Außenbesichtigung",
        },
        {
          text: "Innenbesichtigung",
        },
        {
          text: "Umfangreiche Fotodokumentation",
        },
        {
          text: "Maximale Wertigkeit des Gutachtens",
        },
      ],
      ctaLabel: "Kostenlose Ersteinschätzung",
      ctaHref: "/angebote",
      ctaVariant: "default",
    },
  ],
};

export default function PricingComparisonExample() {
  return <PricingComparison {...pricingComparisonExample} />;
}
