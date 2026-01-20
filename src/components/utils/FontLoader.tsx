import { generateFontCSS, getFontCSSVariables } from "@/lib/fonts";

export function FontLoader() {
  const fontUrls = generateFontCSS();
  const fontVars = getFontCSSVariables();
  const cssVarContent = `:root {\n  ${Object.entries(fontVars)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n  ")}\n}`;

  // Font loading script - load fonts after initial render to avoid blocking
  const fontLoadScript = `
    (function() {
      function loadFonts() {
        var fontLinks = document.querySelectorAll('link[rel="stylesheet"][data-font-load]');
        fontLinks.forEach(function(link) {
          link.media = 'all';
        });
      }

      // Load fonts immediately after DOM is ready, don't wait for full page load
      if (document.readyState !== 'loading') {
        requestAnimationFrame(loadFonts);
      } else {
        document.addEventListener('DOMContentLoaded', function() {
          requestAnimationFrame(loadFonts);
        });
      }
    })();
  `;

  return (
    <>
      {/* CSS Variables for fonts - inline for immediate application */}
      <style dangerouslySetInnerHTML={{ __html: cssVarContent }} />

      {/* Font loading script - runs immediately */}
      <script dangerouslySetInnerHTML={{ __html: fontLoadScript }} />

      {/* Primary Font - Load asynchronously after page is interactive */}
      <link
        rel="preload"
        href={fontUrls.primary}
        as="style"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href={fontUrls.primary}
        crossOrigin="anonymous"
        media="print"
        data-font-load
        suppressHydrationWarning
      />
      <noscript>
        <link
          rel="stylesheet"
          href={fontUrls.primary}
          crossOrigin="anonymous"
        />
      </noscript>

      {/* Heading Font - Load asynchronously */}
      <link
        rel="preload"
        href={fontUrls.heading}
        as="style"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href={fontUrls.heading}
        crossOrigin="anonymous"
        media="print"
        data-font-load
        suppressHydrationWarning
      />
      <noscript>
        <link
          rel="stylesheet"
          href={fontUrls.heading}
          crossOrigin="anonymous"
        />
      </noscript>

      {/* Secondary Font - Load last, least critical - defer even more */}
      <link
        rel="preload"
        href={fontUrls.secondary}
        as="style"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href={fontUrls.secondary}
        crossOrigin="anonymous"
        media="print"
        data-font-load
        data-defer
        suppressHydrationWarning
      />
      <noscript>
        <link
          rel="stylesheet"
          href={fontUrls.secondary}
          crossOrigin="anonymous"
        />
      </noscript>
    </>
  );
}
