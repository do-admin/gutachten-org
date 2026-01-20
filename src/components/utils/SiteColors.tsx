import { getSiteConfig } from "@/lib/config";

export default function SiteColors() {
  const siteConfig = getSiteConfig();

  // Generate CSS variables from site config colors
  const cssVars: Record<string, string> = {};
  Object.entries(siteConfig.colors).forEach(([key, value]) => {
    // Convert camelCase to kebab-case for CSS variables
    const cssVarName = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    cssVars[`--${cssVarName}`] = value;
  });

  return (
    <style>
      {`:root { ${Object.entries(cssVars)
        .map(([key, value]) => `${key}: ${value};`)
        .join(" ")} }`}
    </style>
  );
}
