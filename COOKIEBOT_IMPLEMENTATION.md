# Cookiebot Implementation Guide

This document outlines how to implement Cookiebot (by Usercentrics) cookie consent banner on your website, based on the implementation found on [gutachten.org](https://www.gutachten.org/).

## Overview

Cookiebot is a Consent Management Platform (CMP) that helps websites comply with GDPR, ePrivacy Directive, and other privacy regulations. It automatically scans your website for cookies and tracking technologies, then manages user consent for data collection.

## Official Resources

- **Cookiebot Website**: https://www.cookiebot.com/
- **Cookiebot Documentation**: https://www.cookiebot.com/de/manuel-implementierung/
- **Cookiebot Developer Docs**: https://www.cookiebot.com/en/developer/
- **Cookiebot WordPress Plugin**: https://www.cookiebot.com/en/developer/wordpress/

## Implementation Details from gutachten.org

### 1. Main Cookiebot Script

The primary script is loaded in the `<head>` section with the following configuration:

```html
<script
  id="Cookiebot"
  src="https://consent.cookiebot.com/uc.js"
  data-implementation="wp"
  data-cbid="a617cf86-2d24-40fc-8fbf-28bbd2d9f3b0"
  data-culture="DE"
  data-blockingmode="auto"
  defer
  data-deferred="1"
  type="text/javascript"
  async
></script>
```

**Script Attributes Explained:**

- `id="Cookiebot"` - Required identifier for the script
- `src="https://consent.cookiebot.com/uc.js"` - Main Cookiebot script URL
- `data-implementation="wp"` - Implementation type (wp = WordPress, can be omitted for custom implementations)
- `data-cbid="YOUR-CBID"` - **REQUIRED**: Your unique Cookiebot Domain Group ID (get this from your Cookiebot account)
- `data-culture="DE"` - Language/culture code (DE = German, EN = English, etc.)
- `data-blockingmode="auto"` - Automatic blocking mode (blocks cookies until consent is given)
- `defer` - Defers script execution until HTML parsing is complete
- `data-deferred="1"` - Additional defer flag
- `async` - Loads script asynchronously

### 2. Additional Scripts Loaded Automatically

When the main script loads, Cookiebot automatically fetches:

1. **Configuration Script**:

   ```
   https://consentcdn.cookiebot.com/consentconfig/{CBID}/{DOMAIN}/configuration.js
   ```

2. **Consent Script**:

   ```
   https://consent.cookiebot.com/{CBID}/cc.js?renew=false&referer={DOMAIN}&dnt=false&init=false&culture={CULTURE}
   ```

3. **SDK HTML**:
   ```
   https://consentcdn.cookiebot.com/sdk/bc-v4.min.html
   ```

### 3. Google Consent Mode Integration

Cookiebot integrates with Google Consent Mode v2. The site uses a consent mode initialization script:

```javascript
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}

gtag("consent", "default", {
  ad_personalization: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  analytics_storage: "denied",
  functionality_storage: "denied",
  personalization_storage: "denied",
  security_storage: "granted",
  wait_for_update: 500,
});
gtag("set", "ads_data_redaction", true);
```

This script should be placed **before** the Cookiebot script to ensure proper consent mode initialization.

## Step-by-Step Implementation Guide

### Step 1: Create Cookiebot Account

1. Visit https://www.cookiebot.com/
2. Sign up for an account (free trial available)
3. Add your website domain
4. Wait for automatic cookie scan (can take up to 24 hours)

### Step 2: Get Your Cookiebot ID (CBID)

1. Log into your Cookiebot account
2. Navigate to **Settings** > **Your scripts**
3. Copy your **Domain Group ID** (CBID) - it looks like: `a617cf86-2d24-40fc-8fbf-28bbd2d9f3b0`

### Step 3: Configure Cookie Banner

1. Go to **Settings** > **Dialog**
2. Customize:
   - Banner design and position
   - Text content
   - Button labels
   - Cookie categories
   - Language settings

### Step 4: Implement Script in Next.js

For Next.js/React applications, add the script in your root layout file:

**File: `src/app/layout.tsx`**

```tsx
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        {/* Google Consent Mode - MUST be before Cookiebot */}
        <Script id="consent-mode-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_personalization': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'analytics_storage': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'granted',
              'wait_for_update': 500,
            });
            gtag('set', 'ads_data_redaction', true);
          `}
        </Script>

        {/* Cookiebot Script */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="YOUR-CBID-HERE"
          data-culture="DE"
          data-blockingmode="auto"
          defer
          data-deferred="1"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Important Notes:**

- Replace `YOUR-CBID-HERE` with your actual Cookiebot Domain Group ID
- Set `data-culture` to your site's language code (DE, EN, FR, etc.)
- Use `strategy="afterInteractive"` for Next.js Script component
- The consent mode script should use `strategy="beforeInteractive"`

### Step 5: Mark Cookie-Setting Scripts

For any scripts that set cookies or track users, you need to mark them with Cookiebot attributes:

**Before (without Cookiebot):**

```html
<script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

**After (with Cookiebot):**

```html
<script
  type="text/plain"
  data-cookieconsent="statistics"
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
```

**Cookie Consent Categories:**

- `statistics` - Analytics cookies (Google Analytics, etc.)
- `marketing` - Marketing/advertising cookies
- `preferences` - Preference cookies
- `necessary` - Essential cookies (always allowed, no attribute needed)

**Example for Google Analytics:**

```tsx
<Script
  type="text/plain"
  data-cookieconsent="statistics"
  src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
  strategy="afterInteractive"
/>
```

### Step 6: Remove Custom Cookie Banner (Optional)

If you're replacing a custom cookie banner component with Cookiebot:

1. Remove the custom `<CookieBanner>` component from your layout
2. Remove any custom cookie consent logic
3. Cookiebot will handle all cookie consent UI automatically

## Configuration Options

### Language/Culture Codes

Common culture codes for `data-culture`:

- `DE` - German
- `EN` - English
- `FR` - French
- `ES` - Spanish
- `IT` - Italian
- `NL` - Dutch
- `PL` - Polish
- See full list: https://www.cookiebot.com/en/developer/

### Blocking Modes

- `auto` - Automatic blocking (recommended)
- `manual` - Manual blocking (requires custom implementation)

### Implementation Types

- `wp` - WordPress
- `shopify` - Shopify
- `drupal` - Drupal
- Omit for custom implementations

## Cookiebot JavaScript API

You can interact with Cookiebot programmatically:

```javascript
// Check if Cookiebot is loaded
if (window.Cookiebot) {
  // Get current consent status
  const consent = window.Cookiebot.consent;
  console.log("Necessary:", consent.necessary);
  console.log("Statistics:", consent.statistics);
  console.log("Marketing:", consent.marketing);
  console.log("Preferences:", consent.preferences);

  // Listen for consent changes
  window.addEventListener("CookiebotOnConsentReady", function () {
    console.log("Cookiebot consent ready");
  });

  window.addEventListener("CookiebotOnAccept", function () {
    console.log("User accepted cookies");
  });

  window.addEventListener("CookiebotOnDecline", function () {
    console.log("User declined cookies");
  });
}
```

## Testing

1. **Clear browser cookies and localStorage** before testing
2. **Open your website** - Cookiebot banner should appear
3. **Test consent options**:
   - Accept all
   - Decline all
   - Customize preferences
4. **Verify cookie blocking** - Check browser DevTools > Application > Cookies
5. **Verify Google Consent Mode** - Check browser console for consent updates

## Troubleshooting

### Banner Not Appearing

- Verify your CBID is correct
- Check browser console for errors
- Ensure script is in `<head>` section
- Clear browser cache and cookies
- Wait for Cookiebot scan to complete (up to 24 hours)

### Scripts Not Blocking

- Ensure scripts have `type="text/plain"` and `data-cookieconsent` attribute
- Verify blocking mode is set to `auto`
- Check that scripts are loaded after Cookiebot script

### Google Analytics Not Working

- Ensure Google Consent Mode is initialized before Cookiebot
- Verify consent mode updates on user consent
- Check that GA script has `data-cookieconsent="statistics"`

## Environment Variables

For production, consider storing your CBID in environment variables:

```env
NEXT_PUBLIC_COOKIEBOT_CBID=your-cbid-here
NEXT_PUBLIC_COOKIEBOT_CULTURE=DE
```

Then use in your code:

```tsx
data-cbid={process.env.NEXT_PUBLIC_COOKIEBOT_CBID}
data-culture={process.env.NEXT_PUBLIC_COOKIEBOT_CULTURE}
```

## Additional Resources

- **Cookiebot Support**: https://support.cookiebot.com/
- **Cookiebot API Reference**: https://www.cookiebot.com/en/developer/
- **Google Consent Mode v2**: https://support.google.com/tagmanager/answer/10718549
- **GDPR Compliance Guide**: https://www.cookiebot.com/en/gdpr-cookie-consent/

## Current Implementation Status

Based on the codebase inspection:

- ✅ Cookiebot script is conditionally loaded for `gutachten.org` in `src/app/layout.tsx` (lines 124-137)
- ✅ Google Consent Mode is initialized
- ✅ Custom `CookieBanner` component exists but may need to be replaced/removed when using Cookiebot
- ⚠️ Need to ensure all tracking scripts are marked with `data-cookieconsent` attributes

## Next Steps

1. Get your Cookiebot account and CBID
2. Replace the hardcoded CBID in `layout.tsx` with your own
3. Mark all cookie-setting scripts with appropriate `data-cookieconsent` attributes
4. Test the implementation
5. Remove or disable custom cookie banner if using Cookiebot exclusively
