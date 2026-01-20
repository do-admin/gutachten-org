// TypeScript declarations for Google reCAPTCHA v3

interface Grecaptcha {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options?: { action: string }) => Promise<string>;
  render: (
    container: string | HTMLElement,
    parameters: {
      sitekey: string;
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
      theme?: "light" | "dark";
      size?: "normal" | "compact" | "invisible";
    }
  ) => number;
  reset: (widgetId?: number) => void;
  getResponse: (widgetId?: number) => string;
}

declare global {
  interface Window {
    grecaptcha: Grecaptcha;
  }
}

export {};
