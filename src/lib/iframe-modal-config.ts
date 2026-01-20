/**
 * Configuration mapping for form pages to their iframe URLs
 * Used to open iframes in modals instead of navigating to separate pages
 */
export interface IframeModalConfig {
  href: string;
  iframeSrc: string;
  title: string;
  height?: string | number;
}

export const iframeModalConfigs: IframeModalConfig[] = [
  {
    href: "/energieausweis-anfrage/",
    iframeSrc:
      "https://app-embed.evalion.net/?formId=energieausweis-bedarfsausweis&pId=Gutachten_org",
    title: "Energieausweis Anfrage Formular",
    height: "900px",
  },
  {
    href: "/kaufpreisaufteilung-anfrage/",
    iframeSrc:
      "https://app-embed.evalion.net/?formId=kaufpreisteilung&pId=Gutachten_org",
    title: "Kaufpreisaufteilung Anfrage Formular",
    height: "1064px",
  },
  {
    href: "/restnutzungsdauergutachten-ersteinschaetzung/",
    iframeSrc:
      "https://app-embed.evalion.net/?formId=nutzungsdauer&pId=Gutachten_org&v=lite",
    title: "Restnutzungsdauergutachten Ersteinschätzung Formular",
    height: "600px",
  },
  {
    href: "/verkehrswertgutachten-anfrage/",
    iframeSrc:
      "https://app-embed.evalion.net/?formId=verkehrswert&pId=Gutachten_org",
    title: "Verkehrswertgutachten Anfrage Formular",
    height: "1064px",
  },
];

/**
 * Get iframe config for a given href
 */
export function getIframeConfigForHref(href: string): IframeModalConfig | null {
  return iframeModalConfigs.find((config) => config.href === href) || null;
}

/**
 * Check if a href should open in a modal
 */
export function shouldOpenInModal(href: string): boolean {
  return iframeModalConfigs.some((config) => config.href === href);
}
