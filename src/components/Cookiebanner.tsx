"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export interface CookieBannerContent {
  title?: string;
  description: string;
  acceptButton: {
    text: string;
    variant?:
      | "default"
      | "outline"
      | "secondary"
      | "ghost"
      | "link"
      | "destructive";
    className?: string;
  };
  rejectButton: {
    text: string;
    variant?:
      | "default"
      | "outline"
      | "secondary"
      | "ghost"
      | "link"
      | "destructive";
    className?: string;
  };
  settingsButton?: {
    text: string;
    variant?:
      | "default"
      | "outline"
      | "secondary"
      | "ghost"
      | "link"
      | "destructive";
    className?: string;
  };
  settings?: {
    title: string;
    description: string;
    categories: {
      essential: {
        title: string;
        description: string;
        required?: boolean;
      };
      analytics: {
        title: string;
        description: string;
      };
      marketing: {
        title: string;
        description: string;
      };
    };
    saveButton: {
      text: string;
      variant?:
        | "default"
        | "outline"
        | "secondary"
        | "ghost"
        | "link"
        | "destructive";
      className?: string;
    };
  };
  className?: string;
  position?: "bottom-left" | "bottom-right" | "bottom-center";
}

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieBannerProps {
  content: CookieBannerContent;
  onAccept?: () => void;
  onReject?: () => void;
}

export const CookieBanner = ({
  content,
  onAccept,
  onReject,
}: CookieBannerProps) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always required
    analytics: false,
    marketing: false,
  });

  const updateConsentMode = (analytics: boolean, marketing: boolean) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: analytics ? "granted" : "denied",
        ad_storage: marketing ? "granted" : "denied",
      });
    }
  };

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookieConsent");
    const savedPreferences = localStorage.getItem("cookiePreferences");

    if (cookieConsent === null) {
      setShowBanner(true);
    } else if (cookieConsent === "accepted") {
      // Load saved preferences if available
      if (savedPreferences) {
        try {
          const parsed = JSON.parse(savedPreferences);
          setPreferences({
            essential: true,
            analytics: parsed.analytics ?? false,
            marketing: parsed.marketing ?? false,
          });
          updateConsentMode(
            parsed.analytics ?? false,
            parsed.marketing ?? false
          );
        } catch (e) {
          // If parsing fails, use default (all accepted)
          updateConsentMode(true, true);
        }
      } else {
        // Legacy: if accepted but no preferences, grant all
        updateConsentMode(true, true);
      }
    } else if (cookieConsent === "declined") {
      // User declined all non-essential
      updateConsentMode(false, false);
    }
  }, []);

  const handleAcceptAll = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cookieConsent", "accepted");
      localStorage.setItem(
        "cookiePreferences",
        JSON.stringify({ analytics: true, marketing: true })
      );
      setPreferences({
        essential: true,
        analytics: true,
        marketing: true,
      });
      console.log("🍪 Cookies accepted, updating consent...");

      updateConsentMode(true, true);

      if (window.gtag) {
        // Send a test event to verify tracking works
        window.gtag("event", "cookie_consent_accepted", {
          event_category: "engagement",
          event_label: "user_accepted_cookies",
        });
        console.log("📊 Test event sent to GA4");
      } else {
        console.warn("⚠️ gtag not found - GA4 may not be loaded");
      }
    }
    setShowBanner(false);
    onAccept?.();
  };

  const handleRejectNonEssential = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cookieConsent", "declined");
      localStorage.setItem(
        "cookiePreferences",
        JSON.stringify({ analytics: false, marketing: false })
      );
      updateConsentMode(false, false);
    }
    setShowBanner(false);
    onReject?.();
  };

  const handleSaveSettings = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cookieConsent", "accepted");
      localStorage.setItem(
        "cookiePreferences",
        JSON.stringify({
          analytics: preferences.analytics,
          marketing: preferences.marketing,
        })
      );
      updateConsentMode(preferences.analytics, preferences.marketing);

      if (preferences.analytics || preferences.marketing) {
        window.gtag?.("event", "cookie_consent_custom", {
          event_category: "engagement",
          event_label: `analytics:${preferences.analytics},marketing:${preferences.marketing}`,
        });
      }
    }
    setShowSettings(false);
    setShowBanner(false);
    onAccept?.();
  };

  const handleOpenSettings = () => {
    // Load current preferences if available
    const savedPreferences = localStorage.getItem("cookiePreferences");
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences({
          essential: true,
          analytics: parsed.analytics ?? false,
          marketing: parsed.marketing ?? false,
        });
      } catch (e) {
        // Use defaults if parsing fails
      }
    }
    setShowSettings(true);
  };

  // Cookie Settings Dialog
  const SettingsDialog = content.settings ? (
    <Dialog open={showSettings} onOpenChange={setShowSettings}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle herokit-id="b234f4bb-67d1-492a-87ab-7ac653ddffb6">
            {content.settings.title}
          </DialogTitle>
          <DialogDescription herokit-id="63e525b6-7651-414c-8eec-9a90bdf3d18e">
            {content.settings.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Essential Cookies */}
          <div className="space-y-3 rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4
                    className="font-semibold text-gray-900"
                    herokit-id="0a0cafc6-a1bf-4dec-817d-29af0e75cc3e"
                  >
                    {content.settings.categories.essential.title}
                  </h4>
                  <span
                    className="text-xs text-gray-500"
                    herokit-id="5f57cef2-6571-4330-bb03-95440fbf5a06"
                  >
                    (Immer aktiv)
                  </span>
                </div>
                <p
                  className="text-sm text-gray-600"
                  herokit-id="dfd0a8b4-a7af-4b3a-8cf5-c71b47f61730"
                >
                  {content.settings.categories.essential.description}
                </p>
              </div>
              <Checkbox checked={true} disabled className="mt-1" />
            </div>
          </div>

          {/* Analytics Cookies */}
          <div className="space-y-3 rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-1">
                <h4
                  className="font-semibold text-gray-900"
                  herokit-id="e23b637b-13a8-4e76-a065-48ea3a3302a5"
                >
                  {content.settings.categories.analytics.title}
                </h4>
                <p
                  className="text-sm text-gray-600"
                  herokit-id="68b949e1-07fc-4dfe-bfc3-c46df32246ac"
                >
                  {content.settings.categories.analytics.description}
                </p>
              </div>
              <Checkbox
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({
                    ...prev,
                    analytics: checked === true,
                  }))
                }
                className="mt-1"
              />
            </div>
          </div>

          {/* Marketing Cookies */}
          <div className="space-y-3 rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-1">
                <h4
                  className="font-semibold text-gray-900"
                  herokit-id="76ec4491-737c-4b01-9de0-305c51ec4897"
                >
                  {content.settings.categories.marketing.title}
                </h4>
                <p
                  className="text-sm text-gray-600"
                  herokit-id="6ac79ccc-7e98-4e76-a520-eff0d398edd0"
                >
                  {content.settings.categories.marketing.description}
                </p>
              </div>
              <Checkbox
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({
                    ...prev,
                    marketing: checked === true,
                  }))
                }
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSaveSettings}
            variant={content.settings.saveButton.variant || "default"}
            className={cn(
              content.settings.saveButton.className,
              "min-w-[140px] rounded-md px-8 py-2"
            )}
            herokit-id="bf9a6c4b-6c25-4c0f-8a52-f30c40cc5ced"
          >
            {content.settings.saveButton.text}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : null;

  // Use transform to prevent layout shift - render off-screen instead of hiding
  return (
    <>
      <div
        className={`fixed right-[10px] bottom-[10px] left-[10px] z-50 w-[calc(100%-20px)] bg-white p-6 shadow-lg [425px]:right-auto [425px]:w-[421px] ${content.className || ""}`}
        style={{
          transform: showBanner
            ? "translateY(0)"
            : "translateY(calc(100% + 20px))",
          transition: "transform 0.3s ease-in-out",
        }}
        aria-hidden={!showBanner}
      >
        <div
          className="flex flex-col gap-4"
          herokit-id="84e1bbb9-499a-442c-a6eb-f492af9c02c3"
        >
          {content.title && (
            <h3
              className="text-lg font-semibold text-gray-900"
              herokit-id="ee8a9e40-5bea-436c-b3f8-0148a3beeff9"
            >
              {content.title}
            </h3>
          )}
          <div className="flex flex-col gap-2">
            <p
              className="text-sm text-gray-700 md:text-lg"
              herokit-id="e4c40dda-0b08-4178-9a2b-4054d777442f"
            >
              {content.description}
            </p>
          </div>
          <div
            className="flex flex-wrap items-center gap-4"
            herokit-id="ee2d83b0-3ca4-4bfe-abf9-0c6925114197"
          >
            <Button
              onClick={handleAcceptAll}
              variant={content.acceptButton.variant || "default"}
              className={cn(
                content.acceptButton.className,
                "min-w-[140px] rounded-md px-8 py-2"
              )}
              tabIndex={showBanner ? undefined : -1}
              aria-disabled={!showBanner}
              herokit-id="218a7a5c-f310-498a-a2ba-d07ae6368b17"
            >
              {content.acceptButton.text}
            </Button>
            <Button
              onClick={handleRejectNonEssential}
              variant={content.rejectButton.variant || "outline"}
              className={cn(
                content.rejectButton.className,
                "min-w-[140px] rounded-md px-8 py-2"
              )}
              tabIndex={showBanner ? undefined : -1}
              aria-disabled={!showBanner}
              herokit-id="01b44b22-e54c-412d-b3b0-6363308a7c9c"
            >
              {content.rejectButton.text}
            </Button>
            {content.settingsButton && (
              <Button
                onClick={handleOpenSettings}
                variant={content.settingsButton.variant || "outline"}
                className={cn(
                  content.settingsButton.className,
                  "min-w-[140px] rounded-md px-8 py-2"
                )}
                tabIndex={showBanner ? undefined : -1}
                aria-disabled={!showBanner}
                herokit-id="17799314-d140-4119-b8b2-7499b4e68b2f"
              >
                {content.settingsButton.text}
              </Button>
            )}
          </div>
        </div>
      </div>
      {SettingsDialog}
    </>
  );
};
