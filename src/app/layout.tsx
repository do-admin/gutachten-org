import type { Metadata } from "next";
import Script from "next/script";
import { ConditionalTextEditor } from "@text-editor/components/TextEditorWrapper";

import { Suspense } from "react";

import "./globals.css";
import Header from "@/components/blocks/Header/Header";
import Footer from "@/components/blocks/Footer/Footer";
import { CookieBanner } from "@/components/Cookiebanner";
import { Analytics } from "@/components/utils/Analytics";
import { FontLoader } from "@/components/utils/FontLoader";
import SiteColors from "@/components/utils/SiteColors";
import { getSiteConfig, getCurrentSite } from "@/lib/config";
import { getFontClasses } from "@/lib/fonts";
import { getResponsiveOptimizedImagePaths } from "@/lib/site-config-helper";

const siteConfig = getSiteConfig();
const fontClasses = getFontClasses();

// Build icon configuration
const faviconPath = siteConfig.site.favicon;
const faviconDir = faviconPath.substring(0, faviconPath.lastIndexOf("/"));
const icons: Metadata["icons"] = {
  icon: faviconPath,
  shortcut: faviconPath,
};

// Add SVG icon if available
const svgIcon = faviconPath.replace(".ico", ".svg");
if (svgIcon !== faviconPath) {
  icons.icon = [
    { url: faviconPath, sizes: "any" },
    { url: svgIcon, type: "image/svg+xml" },
  ];
}

// Add apple touch icon if available
const appleIcon = `${faviconDir}/apple-touch-icon.png`;
icons.apple = appleIcon;

export const metadata: Metadata = {
  title: "Website Template",
  description:
    "A modern, SEO-friendly website template with customizable blocks and server-side rendering.",
  icons,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if text editor is enabled via environment variable
  // For final deployments (Cloudflare R2), ENABLE_TEXT_EDITOR should be "false"
  const isTextEditorEnabled = process.env.ENABLE_TEXT_EDITOR === "true";

  // Use external API URL if set (for Cloudflare static deployments),
  // otherwise fall back to internal API route
  const apiEndpoint = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/hero-page-helper/text-editor`
    : "/api/text-editor";

  // Bearer token for external API (only needed for external API)
  const apiToken = process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_TOKEN
    : undefined;

  const inlineTextEditorConfig = {
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "default-project",
    enabledByDefault: false,
    showToggle: isTextEditorEnabled, // Only show toggle if editor is enabled
    enabled: isTextEditorEnabled, // Only enable if ENABLE_TEXT_EDITOR is "true"
    apiEndpoint,
    apiToken,
  };

  const isGutachtenOrg =
    siteConfig.site.url === "gutachten.org" ||
    siteConfig.site.url.includes("gutachten.org");

  return (
    <html lang="de">
      <head>
        {/* Limit to 2 preconnects as recommended by Lighthouse */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Preload logo for faster LCP */}
        {siteConfig.site.logo?.light && (
          <link
            rel="preload"
            href={siteConfig.site.logo.light}
            as="image"
            fetchPriority="high"
          />
        )}

        {/* Preload hero images for LCP optimization - critical for home page */}
        {(() => {
          const heroImagePaths = getResponsiveOptimizedImagePaths(
            "/images/{{siteId}}/home/home-hero.webp"
          );
          const heroDesktopSrc =
            heroImagePaths.desktopSrc || heroImagePaths.src;
          const heroMobileSrc = heroImagePaths.mobileSrc || heroImagePaths.src;
          return (
            <>
              <link
                rel="preload"
                href={heroDesktopSrc}
                as="image"
                fetchPriority="high"
                media="(min-width: 769px)"
              />
              <link
                rel="preload"
                href={heroMobileSrc}
                as="image"
                fetchPriority="high"
                media="(max-width: 768px)"
              />
            </>
          );
        })()}

        <link rel="manifest" href="/site.webmanifest" />
        <FontLoader />
        <SiteColors />
        {/* Analytics loaded after fonts to avoid blocking */}
        <Analytics
          gaId={siteConfig.analytics.gaId}
          gtmId={siteConfig.analytics.gtmId}
          enabled={siteConfig.analytics.enabled}
        />
        {isGutachtenOrg && (
          <>
            {/* Google Consent Mode v2 - Minimal inline script for performance */}
            <Script
              id="google-consent-mode-v2"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{'ad_personalization':'denied','ad_storage':'denied','ad_user_data':'denied','analytics_storage':'denied','functionality_storage':'denied','personalization_storage':'denied','security_storage':'granted','wait_for_update':500});gtag('set','ads_data_redaction',true);`,
              }}
            />

            {/* Cookiebot consent script - lazyOnload for better performance
                Google Consent Mode v2 default state (above) ensures GDPR compliance
                even before Cookiebot loads */}
            <Script
              id="Cookiebot"
              src="https://consent.cookiebot.com/uc.js"
              data-implementation="wp"
              data-cbid="a617cf86-2d24-40fc-8fbf-28bbd2d9f3b0"
              data-culture="DE"
              data-blockingmode="auto"
              strategy="lazyOnload"
            />

            {/* Microsoft Clarity tracking - lazyOnload for better performance */}
            <Script id="clarity-tracking" strategy="lazyOnload">
              {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","sx9do1u6qm");`}
            </Script>

            {/* Google tag (gtag.js) - lazyOnload for better performance */}
            <Script
              id="google_gtagjs-js"
              src="https://www.googletagmanager.com/gtag/js?id=GT-WBKZTL89"
              strategy="lazyOnload"
            />
            <Script id="google_gtagjs-js-after" strategy="lazyOnload">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("set","linker",{"domains":["www.gutachten.org"]});gtag("js",new Date());gtag("set","developer_id.dZTNiMT",true);gtag("config","GT-WBKZTL89");`}
            </Script>
          </>
        )}
      </head>
      <body className={`font-primary antialiased`}>
        <Header
          variant={siteConfig.header?.variant}
          designVariant={siteConfig.header?.designVariant}
          logo={siteConfig.site.logo}
          logoClassName={siteConfig.header?.logoClassName}
          navigation={siteConfig.navigation.main}
          ctaButton={siteConfig.header?.ctaButton}
          className={siteConfig.header?.className}
          scrollEffects={siteConfig.header?.scrollEffects}
          mobileMenu={siteConfig.header?.mobileMenu}
        />
        <main className="pt-16">
          <Suspense fallback={children}>
            {isTextEditorEnabled ? (
              <ConditionalTextEditor config={inlineTextEditorConfig}>
                {children}
              </ConditionalTextEditor>
            ) : (
              children
            )}
          </Suspense>
        </main>
        {siteConfig.footer && <Footer {...siteConfig.footer} />}
        {/* Only show custom cookie banner if Cookiebot is not being used */}
        {siteConfig.cookieBanner && !isGutachtenOrg && (
          <CookieBanner content={siteConfig.cookieBanner} />
        )}
      </body>
    </html>
  );
}
