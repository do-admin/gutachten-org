"use client";

/// <reference path="../../types/recaptcha.d.ts" />

import React, { useState, useRef, useEffect } from "react";
import { Container, Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  sendEmail,
  formatFormDataAsEmail,
  formatFormDataAsHtmlEmail,
} from "@/lib/email-utils";
import Link from "next/link";
import Image from "next/image";
import { Heading } from "@/components/blocks/Heading/Heading";
import { cn } from "@/lib/utils";

// Helper function to format confirmation email text
const formatConfirmationEmailText = (formData: Record<string, any>): string => {
  const name = formData.name || "";
  const email = formData.email || "";
  const phone = formData.phone || formData.telefon || "";
  const anliegen =
    formData.anliegen ||
    formData.concern ||
    formData.message ||
    formData.nachricht ||
    "";

  return `Wir haben Ihre Nachricht erhalten und melden uns in Kürze mit den nächsten Schritten.

Hallo ${name},
vielen Dank für Ihre Anfrage. Wir haben Ihre Nachricht erhalten und melden uns in Kürze bei Ihnen, um das weitere Vorgehen zu besprechen.
Zusammenfassung Ihrer Anfrage:
- Name: ${name}
- E-Mail: ${email}
- Telefonnummer: ${phone}
- Anliegen: ${anliegen}
- Beschreibung:
  ${anliegen}
Wenn Sie ergänzende Informationen haben (z. B. eine bestehende Anfragenummer, Objektadresse, Unterlagen, Fristen), antworten Sie einfach auf diese E-Mail.
Kontakt:
E-Mail: support@gutachten.org
Telefon: +49 30 754 364 81
Mit freundlichen Grüßen
Ihr Gutachten.org Team
__
Evalion GmbH
Brunnenstr. 178
10119 Berlin
E. support@gutachten.org
Amtsgericht Charlottenburg HRB 270864 B
Geschäftsführer: Kolja Czudnochowski, Gerrit Kolweyh
Diese eMail kann vertrauliche und/oder rechtlich geschützte Informationen enthalten. Wenn Sie nicht der richtige Adressat sind oder diese eMail irrtümlich erhalten haben, informieren Sie bitte sofort den Absender und vernichten Sie diese eMail. Das unerlaubte Kopieren sowie die unbefugte Weitergabe dieser eMail ist nicht gestattet.`;
};

// Helper function to format confirmation email HTML
const formatConfirmationEmailHtml = (formData: Record<string, any>): string => {
  const name = formData.name || "";
  const email = formData.email || "";
  const phone = formData.phone || formData.telefon || "";
  const anliegen =
    formData.anliegen ||
    formData.concern ||
    formData.message ||
    formData.nachricht ||
    "";

  // Escape HTML
  const escapeHtml = (text: string): string => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  };

  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedPhone = escapeHtml(phone);
  const escapedAnliegen = escapeHtml(anliegen);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #1f2937; background-color: #ffffff;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
    <p style="margin: 0 0 16px 0;">Hallo ${escapedName},</p>
    <p style="margin: 0 0 16px 0;">vielen Dank für Ihre Anfrage. Wir haben Ihre Nachricht erhalten und melden uns in Kürze bei Ihnen, um das weitere Vorgehen zu besprechen.</p>
    
    <p style="margin: 16px 0 8px 0; font-weight: 600;">Zusammenfassung Ihrer Anfrage:</p>
    <ul style="margin: 0 0 16px 0; padding-left: 20px;">
      <li style="margin-bottom: 8px;">Name: ${escapedName}</li>
      <li style="margin-bottom: 8px;">E-Mail: ${escapedEmail}</li>
      <li style="margin-bottom: 8px;">Telefonnummer: ${escapedPhone}</li>
      <li style="margin-bottom: 8px;">Anliegen: ${escapedAnliegen}</li>
      <li style="margin-bottom: 8px;">Beschreibung:<br>${escapedAnliegen}</li>
    </ul>
    
    <p style="margin: 16px 0 8px 0;">Wenn Sie ergänzende Informationen haben (z. B. eine bestehende Anfragenummer, Objektadresse, Unterlagen, Fristen), antworten Sie einfach auf diese E-Mail.</p>
    
    <p style="margin: 16px 0 8px 0; font-weight: 600;">Kontakt:</p>
    <p style="margin: 0 0 4px 0;">E-Mail: <a href="mailto:support@gutachten.org" style="color: #CC4400;">support@gutachten.org</a></p>
    <p style="margin: 0 0 16px 0;">Telefon: <a href="tel:+493075436481" style="color: #CC4400;">+49 30 754 364 81</a></p>
    
    <p style="margin: 16px 0 8px 0;">Mit freundlichen Grüßen</p>
    <p style="margin: 0 0 24px 0;">Ihr Gutachten.org Team</p>
    
    <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
      <p style="margin: 0 0 4px 0;"><strong>Evalion GmbH</strong></p>
      <p style="margin: 0 0 4px 0;">Brunnenstr. 178</p>
      <p style="margin: 0 0 4px 0;">10119 Berlin</p>
      <p style="margin: 0 0 4px 0;">E. <a href="mailto:support@gutachten.org" style="color: #6b7280;">support@gutachten.org</a></p>
      <p style="margin: 0 0 4px 0;">Amtsgericht Charlottenburg HRB 270864 B</p>
      <p style="margin: 0 0 16px 0;">Geschäftsführer: Kolja Czudnochowski, Gerrit Kolweyh</p>
      <p style="margin: 0;">Diese eMail kann vertrauliche und/oder rechtlich geschützte Informationen enthalten. Wenn Sie nicht der richtige Adressat sind oder diese eMail irrtümlich erhalten haben, informieren Sie bitte sofort den Absender und vernichten Sie diese eMail. Das unerlaubte Kopieren sowie die unbefugte Weitergabe dieser eMail ist nicht gestattet.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
};

// Form field configuration
export interface FormField {
  id: string;
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "number"
    | "select"
    | "checkbox"
    | "textarea";
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  gridSpan?: 1 | 2 | 3;
  gridColumns?: 2 | 3;
  breakRow?: boolean;
  rows?: number;
  inputClassName?: string;
}

// Form section configuration
export interface FormSection {
  title?: string;
  fields: FormField[];
}

// Base props for the LeadForm component
export interface LeadFormProps {
  // Content props
  title: string;
  subtitle?: string;
  cardTitle?: string;
  sections: FormSection[];
  submitButtonText?: string;
  description?: string;
  // Success state props
  successTitle?: string;
  successMessage?: string;
  successIcon?: string;
  resetButtonText?: string;

  // Section props
  sectionId?: string;
  variant?: "default" | "secondary" | "image-form";

  // Styling props
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  textAlign?: "left" | "center" | "right";

  // Custom styling
  className?: string;
  containerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  cardClassName?: string;
  formClassName?: string;

  // Behavior
  onSubmit?: (data: Record<string, any>) => void | Promise<void>;
  enableToast?: boolean;
  toastSuccessTitle?: string;
  toastSuccessDescription?: string;
  toastErrorTitle?: string;
  toastErrorDescription?: string;

  // Email configuration
  emailRecipients?: string[];
  emailFrom?: string;
  emailSubject?: string;
  emailTags?: Array<{ name: string; value: string }>;
  replyTo?: string;

  // Validation
  privacyFieldId?: string;
  customValidation?: (data: Record<string, any>) => {
    isValid: boolean;
    error?: string;
  };

  // Privacy link (for image-form variant)
  privacyLinkUrl?: string;
  privacyLinkText?: string;
  privacyText?: string;
  privacyLinkColor?: string;
  privacyCheckboxClassName?: string;

  // Image (for image-form variant with two-column layout)
  imageSrc?: string;
  imageAlt?: string;

  // Submit button styling
  submitButtonColor?: string;

  // Reset button styling
  resetButtonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "accent";
  resetButtonSize?: "default" | "sm" | "lg" | "icon";
  resetButtonClassName?: string;

  // reCAPTCHA configuration
  enableRecaptcha?: boolean;
  recaptchaTheme?: "light" | "dark";
  recaptchaSize?: "normal" | "compact";
}

export const LeadForm: React.FC<LeadFormProps> = ({
  title,
  subtitle,
  cardTitle,
  sections,
  submitButtonText = "Absenden",
  description,
  successTitle = "Erfolgreich!",
  successMessage = "Vielen Dank für Ihre Anfrage. Wir werden uns bald bei Ihnen melden.",
  successIcon = "✓",
  resetButtonText = "Weitere Anfrage senden",
  sectionId = "lead-form",
  variant = "secondary",
  maxWidth = "2xl",
  textAlign = "center",
  className,
  containerClassName,
  titleClassName,
  subtitleClassName,
  cardClassName,
  formClassName,
  onSubmit,
  enableToast = true,
  toastSuccessTitle = "Erfolgreich!",
  toastSuccessDescription = "Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.",
  toastErrorTitle = "Fehler",
  toastErrorDescription = "Bitte akzeptieren Sie die Datenschutzerklärung.",
  privacyFieldId = "privacy",
  customValidation,
  emailRecipients,
  emailFrom = "noreply@hero-pages.com",
  replyTo,
  emailSubject,
  emailTags,
  privacyLinkUrl = "/datenschutz",
  privacyLinkText = "Datenschutzerklärung",
  privacyText,
  privacyLinkColor,
  privacyCheckboxClassName,
  imageSrc,
  imageAlt,
  submitButtonColor,
  resetButtonVariant = "accent",
  resetButtonSize = "default",
  resetButtonClassName,
  enableRecaptcha = true,
  recaptchaTheme = "light",
  recaptchaSize = "normal",
}) => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const formPositionRef = useRef<number | null>(null);

  // Load reCAPTCHA v3 script lazily when form is visible or user interacts
  const [shouldLoadRecaptcha, setShouldLoadRecaptcha] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Load reCAPTCHA only when user interacts with form (not on visibility)
  // This delays the ~400ms reCAPTCHA load until actually needed
  useEffect(() => {
    if (!enableRecaptcha || !process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      return;
    }

    // Don't auto-load on visibility - wait for user interaction
    // The handleFormInteraction function will trigger loading on focus/click
  }, [enableRecaptcha]);

  // Also load reCAPTCHA when user focuses any form element
  const handleFormInteraction = () => {
    if (enableRecaptcha && !shouldLoadRecaptcha) {
      setShouldLoadRecaptcha(true);
    }
  };

  // Load reCAPTCHA v3 script
  useEffect(() => {
    if (!shouldLoadRecaptcha || !process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      return;
    }

    // Check if script is already loaded
    if (window.grecaptcha) {
      setRecaptchaLoaded(true);
      return;
    }

    // Load reCAPTCHA v3 script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setRecaptchaLoaded(true);
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script if component unmounts
      const existingScript = document.querySelector(
        `script[src*="recaptcha/api.js"]`
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [shouldLoadRecaptcha]);

  // Scroll to success message when form is submitted
  useEffect(() => {
    if (submitted) {
      // Use multiple attempts to ensure the element is rendered
      const scrollToSuccess = (attempts = 0) => {
        const element = successRef.current;

        if (element) {
          // Get the element's position after it's rendered
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;

          // Calculate offset to account for any fixed headers (typically 80-100px)
          const offset = 100;

          // Scroll to the success element with offset
          window.scrollTo({
            top: Math.max(0, elementTop - offset),
            behavior: "smooth",
          });
        } else if (attempts < 3) {
          // Retry if element not found yet (max 3 attempts)
          setTimeout(() => scrollToSuccess(attempts + 1), 100);
        } else {
          // Final fallback: use stored form position if available
          if (formPositionRef.current !== null) {
            window.scrollTo({
              top: Math.max(0, formPositionRef.current - 100),
              behavior: "smooth",
            });
          }
        }
      };

      // Use requestAnimationFrame and setTimeout to ensure the DOM has fully updated
      requestAnimationFrame(() => {
        setTimeout(() => scrollToSuccess(), 200);
      });
    }
  }, [submitted]);

  // Validation functions
  const validateEmail = (
    email: string
  ): { isValid: boolean; error?: string } => {
    if (!email || email.trim() === "") {
      return { isValid: false, error: "E-Mail Adresse ist erforderlich." };
    }

    // Strict email validation regex
    const emailRegex =
      /^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}$/;

    // Check basic structure
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        error:
          "Bitte geben Sie eine gültige E-Mail Adresse ein (z.B. test@test.de).",
      };
    }

    // Check for consecutive dots
    if (email.includes("..")) {
      return {
        isValid: false,
        error: "E-Mail Adresse enthält ungültige Zeichen.",
      };
    }

    // Check for @ at start or end
    if (email.startsWith("@") || email.endsWith("@")) {
      return {
        isValid: false,
        error: "Bitte geben Sie eine gültige E-Mail Adresse ein.",
      };
    }

    // Check domain structure
    const parts = email.split("@");
    if (parts.length !== 2) {
      return {
        isValid: false,
        error: "Bitte geben Sie eine gültige E-Mail Adresse ein.",
      };
    }

    const [localPart, domain] = parts;

    // Check local part (before @)
    if (localPart.length === 0 || localPart.length > 64) {
      return { isValid: false, error: "E-Mail Adresse ist ungültig." };
    }

    // Check domain (after @)
    if (domain.length === 0 || !domain.includes(".")) {
      return {
        isValid: false,
        error:
          "Bitte geben Sie eine gültige E-Mail Adresse ein (z.B. test@test.de).",
      };
    }

    const domainParts = domain.split(".");
    if (
      domainParts.length < 2 ||
      domainParts[domainParts.length - 1].length < 2
    ) {
      return { isValid: false, error: "E-Mail Domain ist ungültig." };
    }

    return { isValid: true };
  };

  const validatePhone = (
    phone: string
  ): { isValid: boolean; error?: string } => {
    if (!phone || phone.trim() === "") {
      return { isValid: true }; // Phone is optional
    }

    // Remove all whitespace for validation
    const cleanedPhone = phone.replace(/\s/g, "");

    // Only allow numbers, +, -, and parentheses
    const phoneRegex = /^[\d\+\-\(\)]+$/;
    if (!phoneRegex.test(cleanedPhone)) {
      return {
        isValid: false,
        error: "Telefonnummer darf nur Zahlen, +, - und Klammern enthalten.",
      };
    }

    // Remove non-numeric characters except + at start to count digits
    const digitsOnly = cleanedPhone.replace(/[^\d]/g, "");

    // Check minimum length (at least 3 digits for area codes like 030)
    if (digitsOnly.length < 3) {
      return {
        isValid: false,
        error:
          "Telefonnummer ist zu kurz. Bitte geben Sie eine gültige Telefonnummer ein (z.B. 030 oder +49...).",
      };
    }

    // Check maximum length (15 digits for international numbers)
    if (digitsOnly.length > 15) {
      return { isValid: false, error: "Telefonnummer ist zu lang." };
    }

    // Check for German phone number patterns
    // Starts with +49, 0049, 0, or area code (like 030)
    const startsWithPlus = cleanedPhone.startsWith("+");
    const startsWithZero = cleanedPhone.startsWith("0");
    const startsWithCountryCode =
      cleanedPhone.startsWith("0049") || cleanedPhone.startsWith("+49");

    // If it starts with +, it should be +49 for Germany
    if (
      startsWithPlus &&
      !cleanedPhone.startsWith("+49") &&
      digitsOnly.length > 5
    ) {
      // Allow other country codes but warn if format seems wrong
      if (digitsOnly.length < 10) {
        return {
          isValid: false,
          error:
            "Bitte geben Sie eine vollständige internationale Telefonnummer ein.",
        };
      }
    }

    // If starts with 0, should be followed by area code (at least 2 digits)
    if (startsWithZero && digitsOnly.length < 3) {
      return {
        isValid: false,
        error:
          "Telefonnummer ist zu kurz. Bitte geben Sie eine gültige Telefonnummer ein (z.B. 030...).",
      };
    }

    return { isValid: true };
  };

  // Custom validation message handlers for different element types
  const handleInvalidInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.setCustomValidity("Füllen Sie dieses Feld aus.");
  };

  const handleInvalidTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.setCustomValidity("Füllen Sie dieses Feld aus.");
  };

  const handleInvalidSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;
    target.setCustomValidity("Füllen Sie dieses Feld aus.");
  };

  // Get max width class
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-xl";
      case "2xl":
        return "max-w-2xl";
      case "3xl":
        return "max-w-3xl";
      case "4xl":
        return "max-w-4xl";
      default:
        return "max-w-2xl";
    }
  };

  // Get text alignment class
  const getTextAlignClass = () => {
    switch (textAlign) {
      case "left":
        return "text-left";
      case "right":
        return "text-right";
      default:
        return "text-center";
    }
  };

  // Check if all required fields are filled
  const areAllRequiredFieldsFilled = (): boolean => {
    // Get all fields from all sections
    const allFields = sections.flatMap((section) => section.fields);

    // Filter to only required fields (excluding privacy field which is handled separately)
    const requiredFields = allFields.filter(
      (field) => field.required && field.id !== privacyFieldId
    );

    // Check if all required fields have valid values
    for (const field of requiredFields) {
      const value = formData[field.id];

      // For checkboxes, value must be true
      if (field.type === "checkbox") {
        if (value !== true) {
          return false;
        }
      } else {
        // For other fields, value must exist and not be empty string
        if (!value || (typeof value === "string" && value.trim() === "")) {
          return false;
        }
      }
    }

    // Check privacy field separately if it exists
    if (privacyFieldId) {
      const privacyField = allFields.find(
        (field) => field.id === privacyFieldId
      );
      if (privacyField?.required && !formData[privacyFieldId]) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    // Anti-spam: Check honeypot field (if filled, it's a bot)
    if (formData.website_url || formData.website) {
      // Silent fail - don't show error to bots
      console.log("Spam detected - honeypot field filled");
      setIsSubmitting(false);
      return;
    }

    // Execute reCAPTCHA v3 if enabled
    let token: string | null = null;
    if (enableRecaptcha && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      console.log("Loading reCAPTCHA");
      if (!recaptchaLoaded || !window.grecaptcha) {
        if (enableToast) {
          toast({
            title: toastErrorTitle || "Fehler",
            description:
              "reCAPTCHA wird geladen. Bitte versuchen Sie es erneut.",
            variant: "destructive",
          });
        }
        setIsSubmitting(false);
        return;
      }

      try {
        // Execute reCAPTCHA v3
        token = await window.grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          { action: "submit" }
        );
        setRecaptchaToken(token);
      } catch (error) {
        console.error("reCAPTCHA execution error:", error);
        if (enableToast) {
          toast({
            title: toastErrorTitle || "Fehler",
            description: "reCAPTCHA-Fehler. Bitte versuchen Sie es erneut.",
            variant: "destructive",
          });
        }
        setIsSubmitting(false);
        return;
      }
    }

    // Check privacy acceptance if privacy field exists
    if (privacyFieldId && !formData[privacyFieldId]) {
      if (enableToast) {
        toast({
          title: toastErrorTitle,
          description: toastErrorDescription,
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
      return;
    }

    // Validate email field
    const emailFields = sections
      .flatMap((section) => section.fields)
      .filter((field) => field.type === "email" && formData[field.id]);

    for (const field of emailFields) {
      const emailValue = formData[field.id];
      if (emailValue) {
        const emailValidation = validateEmail(emailValue);
        if (!emailValidation.isValid) {
          setFieldErrors((prev) => ({
            ...prev,
            [field.id]: emailValidation.error || "",
          }));
          if (enableToast) {
            toast({
              title: toastErrorTitle,
              description:
                emailValidation.error ||
                "Bitte korrigieren Sie die E-Mail Adresse.",
              variant: "destructive",
            });
          }
          const input = document.getElementById(field.id) as HTMLInputElement;
          if (input) {
            input.focus();
            input.setCustomValidity(emailValidation.error || "");
          }
          setIsSubmitting(false);
          return;
        }
        setFieldErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field.id];
          return newErrors;
        });
      }
    }

    // Validate phone field
    const phoneFields = sections
      .flatMap((section) => section.fields)
      .filter((field) => field.type === "tel" && formData[field.id]);

    for (const field of phoneFields) {
      const phoneValue = formData[field.id];
      if (phoneValue) {
        const phoneValidation = validatePhone(phoneValue);
        if (!phoneValidation.isValid) {
          setFieldErrors((prev) => ({
            ...prev,
            [field.id]: phoneValidation.error || "",
          }));
          if (enableToast) {
            toast({
              title: toastErrorTitle,
              description:
                phoneValidation.error ||
                "Bitte korrigieren Sie die Telefonnummer.",
              variant: "destructive",
            });
          }
          const input = document.getElementById(field.id) as HTMLInputElement;
          if (input) {
            input.focus();
            input.setCustomValidity(phoneValidation.error || "");
          }
          setIsSubmitting(false);
          return;
        }
        setFieldErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field.id];
          return newErrors;
        });
      }
    }

    // Custom validation
    if (customValidation) {
      const validationResult = customValidation(formData);
      if (!validationResult.isValid) {
        if (enableToast && validationResult.error) {
          toast({
            title: toastErrorTitle,
            description: validationResult.error,
            variant: "destructive",
          });
        }
        setIsSubmitting(false);
        return;
      }
    }

    // Handle form submission
    try {
      // Verify reCAPTCHA on backend if enabled
      if (enableRecaptcha && token) {
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;

          if (!apiUrl) {
            throw new Error("NEXT_PUBLIC_API_URL is not configured");
          }

          const verifyResponse = await fetch(
            `${apiUrl}/api/hero-page-helper/recaptcha`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token,
                siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
              }),
            }
          );

          if (!verifyResponse.ok) {
            throw new Error(
              `reCAPTCHA verification failed: ${verifyResponse.status} ${verifyResponse.statusText}`
            );
          }

          const verifyData = await verifyResponse.json();

          if (!verifyData.success) {
            const errorCodes = verifyData["error-codes"] || [];
            console.error("reCAPTCHA verification failed:", errorCodes);
            throw new Error("reCAPTCHA verification failed");
          }
        } catch (recaptchaError) {
          console.error("reCAPTCHA verification error:", recaptchaError);
          setRecaptchaToken(null);
          if (enableToast) {
            toast({
              title: "Fehler",
              description:
                "reCAPTCHA-Verifizierung fehlgeschlagen. Bitte versuchen Sie es erneut.",
              variant: "destructive",
            });
          }
          setIsSubmitting(false);
          return;
        }
      }

      if (onSubmit) {
        await onSubmit({ ...formData, recaptchaToken: token });
      } else if (emailRecipients && emailRecipients.length > 0) {
        // Auto-send email if email recipients are configured
        const name = formData.name || "Anfrage";

        // Send confirmation email to the form submitter & recipients defined in config file
        if (formData.email) {
          try {
            const confirmationText = formatConfirmationEmailText(formData);
            const confirmationHtml = formatConfirmationEmailHtml(formData);

            await sendEmail({
              to: [formData.email, ...emailRecipients],
              from: emailFrom,
              subject: "Bestätigung Ihrer Anfrage bei Gutachten.org",
              text: confirmationText,
              html: confirmationHtml,
              replyTo: replyTo,
            });
          } catch (confirmationError) {
            // Log error but don't fail the form submission
            console.error(
              "Error sending confirmation email:",
              confirmationError
            );
          }
        }
      } else {
        console.log("Form submitted:", formData);
      }

      // Store the form's position before showing success state
      // This prevents unwanted scrolling when the success state appears
      const formElement =
        (e.target as HTMLFormElement)?.closest("form") ||
        document.querySelector(`#${sectionId} form`) ||
        document.querySelector("form");
      if (formElement) {
        const rect = formElement.getBoundingClientRect();
        formPositionRef.current = window.scrollY + rect.top;
      } else {
        // Fallback: store current scroll position
        formPositionRef.current = window.scrollY;
      }

      // Set submitted state BEFORE resetting reCAPTCHA to ensure success message shows
      setSubmitted(true);
      setIsSubmitting(false);

      // Reset reCAPTCHA token after successful submission
      if (enableRecaptcha) {
        setRecaptchaToken(null);
      }

      if (enableToast) {
        toast({
          title: toastSuccessTitle,
          description: toastSuccessDescription,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);

      // Reset reCAPTCHA token on error
      if (enableRecaptcha) {
        setRecaptchaToken(null);
      }

      if (enableToast) {
        toast({
          title: "Fehler",
          description:
            "Fehler beim Senden des Formulars. Bitte versuchen Sie es erneut.",
          variant: "destructive",
        });
      }
    }
  };

  const handleInputChange = (
    fieldId: string,
    value: any,
    fieldType?: string
  ) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));

    // Clear previous error
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldId];
      return newErrors;
    });

    // Clear custom validity when user starts typing
    const input = document.getElementById(fieldId) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    if (input) {
      input.setCustomValidity("");
    }

    // Real-time validation for email
    if (fieldType === "email" && value) {
      const emailValidation = validateEmail(value);
      if (!emailValidation.isValid && value.length > 0) {
        setFieldErrors((prev) => ({
          ...prev,
          [fieldId]: emailValidation.error || "",
        }));
        if (input) {
          input.setCustomValidity(emailValidation.error || "");
        }
      }
    }

    // Real-time validation for phone (only if field has value)
    if (fieldType === "tel" && value) {
      const phoneValidation = validatePhone(value);
      if (!phoneValidation.isValid && value.length > 0) {
        setFieldErrors((prev) => ({
          ...prev,
          [fieldId]: phoneValidation.error || "",
        }));
        if (input) {
          input.setCustomValidity(phoneValidation.error || "");
        }
      }
    }
  };

  // Handle phone input - restrict to numbers, +, -, spaces, and parentheses
  const handlePhoneInput = (fieldId: string, value: string) => {
    // Only allow numbers, +, -, spaces, and parentheses
    const cleaned = value.replace(/[^\d\+\-\s\(\)]/g, "");
    handleInputChange(fieldId, cleaned, "tel");
  };

  const groupFieldsIntoRows = (
    fields: FormField[]
  ): Array<{ fields: FormField[]; gridColumns: 2 | 3 | null }> => {
    const rows: Array<{ fields: FormField[]; gridColumns: 2 | 3 | null }> = [];
    let currentRow: FormField[] = [];
    let currentGridColumns: 2 | 3 | null = 2;

    fields.forEach((field, index) => {
      if (field.type === "checkbox") {
        if (currentRow.length > 0 && currentGridColumns !== null) {
          rows.push({
            fields: [...currentRow],
            gridColumns: currentGridColumns,
          });
          currentRow = [];
        }

        if (
          field.breakRow &&
          currentRow.length > 0 &&
          currentGridColumns === null
        ) {
          rows.push({ fields: [...currentRow], gridColumns: null });
          currentRow = [];
        }
        if (currentGridColumns !== null) {
          currentGridColumns = null;
        }
        currentRow.push(field);
        return;
      }

      if (currentGridColumns === null && currentRow.length > 0) {
        rows.push({ fields: [...currentRow], gridColumns: null });
        currentRow = [];
        currentGridColumns = 2;
      }

      if (field.breakRow && currentRow.length > 0) {
        rows.push({ fields: [...currentRow], gridColumns: currentGridColumns });
        currentRow = [];
      }

      const fieldGridColumns = field.gridColumns || currentGridColumns || 2;

      if (fieldGridColumns !== currentGridColumns && currentRow.length > 0) {
        rows.push({ fields: [...currentRow], gridColumns: currentGridColumns });
        currentRow = [];
      }

      currentGridColumns = fieldGridColumns;
      currentRow.push(field);
    });

    if (currentRow.length > 0) {
      rows.push({ fields: currentRow, gridColumns: currentGridColumns });
    }

    return rows;
  };

  const renderField = (field: FormField, isImageForm: boolean = false) => {
    const gridSpanClass =
      field.gridSpan === 3
        ? "md:col-span-3"
        : field.gridSpan === 2
          ? "md:col-span-2"
          : "";

    if (field.type === "select" && field.options) {
      if (isImageForm) {
        return (
          <div key={field.id} herokit-id="c229f60c-6047-4297-950b-33e12f0324ee">
            {field.required && (
              <select
                id={field.id}
                name={field.name}
                value={formData[field.id] || ""}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                onInvalid={handleInvalidSelect}
                required={field.required}
                className="sr-only"
                aria-hidden="true"
                tabIndex={-1}
              >
                <option value="">
                  {field.placeholder || "Bitte auswählen"}
                </option>
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            <Select
              value={formData[field.id] || ""}
              onValueChange={(value: string) =>
                handleInputChange(field.id, value)
              }
              required={field.required}
            >
              <SelectTrigger
                id={field.id}
                aria-label={field.label || field.placeholder || "Auswahl"}
                className={
                  field.inputClassName ||
                  "form-input-base h-14 text-gray-900 sm:h-16"
                }
              >
                <SelectValue
                  placeholder={field.placeholder || "Bitte auswählen"}
                />
              </SelectTrigger>
              <SelectContent herokit-id="2646566d-296d-4387-bd46-6b14d3b342ea">
                {field.options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    herokit-id="96e83d3d-67d3-4acc-b9f5-be19721990a5"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      }
      return (
        <div
          key={field.id}
          className={`space-y-2 ${gridSpanClass}`}
          herokit-id="c211b896-6b19-45c1-95b2-0d28c345e004"
        >
          <Label
            id={`${field.id}-label`}
            htmlFor={field.id}
            herokit-id="11ad93c6-f174-4f53-b342-7b90eb575214"
          >
            {field.label} {field.required && "*"}
          </Label>
          {field.required && (
            <select
              id={field.id}
              name={field.name}
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              onInvalid={handleInvalidSelect}
              required={field.required}
              className="sr-only"
              aria-hidden="true"
              tabIndex={-1}
            >
              <option value="">{field.placeholder || "Bitte auswählen"}</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          <Select
            value={formData[field.id] || ""}
            onValueChange={(value: string) =>
              handleInputChange(field.id, value)
            }
            required={field.required}
          >
            <SelectTrigger aria-labelledby={`${field.id}-label`}>
              <SelectValue
                placeholder={field.placeholder || "Bitte auswählen"}
              />
            </SelectTrigger>
            <SelectContent herokit-id="2e004908-96b5-49bc-8843-c056bf03072b">
              {field.options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  herokit-id="c9693346-4f6a-44d4-b35b-c56f137d2495"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    if (field.type === "checkbox") {
      if (isImageForm) {
        return (
          <div key={field.id} className="flex items-start gap-3 sm:gap-4">
            <Checkbox
              id={field.id}
              checked={formData[field.id] || false}
              onCheckedChange={(checked: boolean | "indeterminate") =>
                handleInputChange(field.id, checked === true)
              }
              required={field.required}
              className="mt-1 h-7 w-7 shrink-0 rounded-[5px] sm:h-8 sm:w-8"
            />
            <Label
              htmlFor={field.id}
              className="flex-1 cursor-pointer text-sm leading-relaxed font-normal text-gray-900"
              herokit-id="686faa5f-a183-49fa-9a62-ae7c01018d87"
            >
              {field.label}
            </Label>
          </div>
        );
      }
      return (
        <div
          key={field.id}
          className={`flex items-start gap-2 ${gridSpanClass}`}
        >
          <Checkbox
            id={field.id}
            checked={formData[field.id] || false}
            onCheckedChange={(checked: boolean | "indeterminate") =>
              handleInputChange(field.id, checked === true)
            }
            required={field.required}
          />
          <Label
            htmlFor={field.id}
            className="cursor-pointer font-normal"
            herokit-id="62244470-704c-4a07-bedf-a919a4842eac"
          >
            {field.label} {field.required && "*"}
          </Label>
        </div>
      );
    }

    if (field.type === "textarea") {
      if (isImageForm) {
        return (
          <div key={field.id}>
            <textarea
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              onInvalid={field.required ? handleInvalidTextarea : undefined}
              required={field.required}
              rows={field.rows || 5}
              className={
                field.inputClassName ||
                "form-input-base font-primary min-h-32 resize-none sm:min-h-40"
              }
            />
          </div>
        );
      }
      return (
        <div key={field.id} className={`space-y-2 ${gridSpanClass}`}>
          <Label
            htmlFor={field.id}
            herokit-id="b0abec6b-ae27-4a20-97f2-fce2847369c3"
          >
            {field.label} {field.required && "*"}
          </Label>
          <textarea
            id={field.id}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.id] || ""}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            onInvalid={field.required ? handleInvalidTextarea : undefined}
            required={field.required}
            rows={field.rows || 5}
            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      );
    }

    if (isImageForm) {
      const hasError = fieldErrors[field.id];
      const isPhoneField = field.type === "tel";
      const isEmailField = field.type === "email";

      return (
        <div
          key={field.id}
          className="space-y-1"
          herokit-id="899896fa-4fac-4df9-a677-b2b44c83cdd2"
        >
          <Input
            id={field.id}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.id] || ""}
            onChange={(e) => {
              if (isPhoneField) {
                handlePhoneInput(field.id, e.target.value);
              } else {
                handleInputChange(field.id, e.target.value, field.type);
              }
            }}
            onInvalid={field.required ? handleInvalidInput : undefined}
            required={field.required}
            pattern={isPhoneField ? "^[\\d\\+\\-\\s\\(\\)]*$" : undefined}
            className={`${field.inputClassName || "form-input-base h-14 sm:h-16"} ${hasError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={hasError ? `${field.id}-error` : undefined}
          />
          {hasError && (
            <p
              id={`${field.id}-error`}
              className="text-sm text-red-500"
              role="alert"
              herokit-id="e6236224-9ae6-4fc0-8636-9fc2f6bfa067"
            >
              {hasError}
            </p>
          )}
        </div>
      );
    }

    const hasError = fieldErrors[field.id];
    const isPhoneField = field.type === "tel";
    const isEmailField = field.type === "email";

    return (
      <div
        key={field.id}
        className={`space-y-2 ${gridSpanClass}`}
        herokit-id="d51f82e8-4fec-408f-bc94-9131f4faee42"
      >
        <Label
          htmlFor={field.id}
          herokit-id="36710f3d-7820-4b41-9d57-aef324345a97"
        >
          {field.label} {field.required && "*"}
        </Label>
        <Input
          id={field.id}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={formData[field.id] || ""}
          onChange={(e) => {
            if (isPhoneField) {
              handlePhoneInput(field.id, e.target.value);
            } else {
              handleInputChange(field.id, e.target.value, field.type);
            }
          }}
          onInvalid={field.required ? handleInvalidInput : undefined}
          required={field.required}
          pattern={isPhoneField ? "^[\\d\\+\\-\\s\\(\\)]*$" : undefined}
          className={
            hasError ? "border-red-500 focus-visible:ring-red-500" : ""
          }
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={hasError ? `${field.id}-error` : undefined}
        />
        {hasError && (
          <p
            id={`${field.id}-error`}
            className="text-sm text-red-500"
            role="alert"
            herokit-id="ece572de-c089-4e43-b2cb-d605f2f6ef6f"
          >
            {hasError}
          </p>
        )}
      </div>
    );
  };

  // Render image-form variant (ContactForm style)
  const renderImageForm = () => {
    // Flatten all fields from all sections for image-form, excluding privacy field
    const allFields = sections.flatMap((section) =>
      section.fields.filter((field) => field.id !== privacyFieldId)
    );
    const renderedIndices = new Set<number>();

    return (
      <div
        ref={formRef}
        className={`w-full ${getMaxWidthClass()} rounded-[27px] border border-[hsl(0_0%_90%)] bg-white p-6 sm:p-10 md:p-12`}
      >
        <form
          onSubmit={handleSubmit}
          onFocus={handleFormInteraction}
          className={`space-y-5 sm:space-y-6 ${formClassName || ""}`}
        >
          {allFields.map((field, index) => {
            // Skip if already rendered in a grid
            if (renderedIndices.has(index)) {
              return null;
            }

            // Handle grid layout for email/phone fields (2 columns on sm+)
            if (field.type === "email" || field.type === "tel") {
              // Check if next field is the complementary type (email/tel)
              const nextField = allFields[index + 1];
              if (
                (field.type === "email" && nextField?.type === "tel") ||
                (field.type === "tel" && nextField?.type === "email")
              ) {
                // Mark both as rendered
                renderedIndices.add(index);
                renderedIndices.add(index + 1);
                // Render both fields in a grid
                return (
                  <div
                    key={`grid-${index}`}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
                    herokit-id="2674e3ee-eae5-4443-89c8-1b7077fc8a48"
                  >
                    {renderField(field, true)}
                    {renderField(nextField, true)}
                  </div>
                );
              }
            }

            renderedIndices.add(index);
            return (
              <React.Fragment key={field.id}>
                {renderField(field, true)}
              </React.Fragment>
            );
          })}

          {/* Honeypot field - hidden from users, visible to bots */}
          <div className="sr-only" aria-hidden="true">
            <label
              htmlFor="website_url"
              style={{ display: "none" }}
              herokit-id="3956b402-8ec1-4b5c-9365-b0476a5435a3"
            >
              Bitte lassen Sie dieses Feld leer
            </label>
            <input
              type="text"
              id="website_url"
              name="website_url"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website_url || ""}
              onChange={(e) => handleInputChange("website_url", e.target.value)}
            />
          </div>

          {/* Privacy checkbox with link */}
          {privacyFieldId && (
            <div className="flex items-start gap-3 sm:gap-4">
              <Checkbox
                id={privacyFieldId}
                checked={formData[privacyFieldId] || false}
                onCheckedChange={(checked: boolean | "indeterminate") =>
                  handleInputChange(privacyFieldId, checked === true)
                }
                className={cn(
                  "mt-1 h-7 w-7 shrink-0 rounded-[5px] border border-[#AEAEAE] bg-white",
                  "sm:h-8 sm:w-8",
                  "data-[state=checked]:bg-slate-900",
                  privacyCheckboxClassName
                )}
              />
              <Label
                htmlFor={privacyFieldId}
                className="flex-1 cursor-pointer text-sm leading-relaxed font-normal text-gray-900"
                herokit-id="4325a7f9-6d9e-4c08-8383-72cea8f6ec52"
              >
                {privacyText ? (
                  (() => {
                    const parts = privacyText.split(privacyLinkText);
                    if (parts.length === 2) {
                      return (
                        <>
                          {parts[0]}
                          <Link
                            href={privacyLinkUrl}
                            className="font-semibold hover:underline"
                            style={{ color: privacyLinkColor || "#CC4400" }}
                            herokit-id="224b8d2c-1965-46d2-a84e-d1b1c501a0c5"
                          >
                            {privacyLinkText}
                          </Link>
                          {parts[1]}
                        </>
                      );
                    }
                    return <>{privacyText}</>;
                  })()
                ) : (
                  <>
                    Mit Absenden des Formulars willige ich in die Verarbeitung
                    meiner Daten gemäß der{" "}
                    <Link
                      href={privacyLinkUrl}
                      className="font-semibold hover:underline"
                      style={{ color: privacyLinkColor || "#CC4400" }}
                      herokit-id="57ba288b-fa9e-4e1a-9f10-f748c182efb6"
                    >
                      {privacyLinkText}
                    </Link>{" "}
                    ein. Diese Einwilligung kann ich jederzeit widerrufen.
                  </>
                )}
              </Label>
            </div>
          )}

          {/* reCAPTCHA v3 is invisible and executes on form submit */}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !areAllRequiredFieldsFilled()}
            className="h-14 w-full font-semibold sm:h-16"
            style={
              submitButtonColor
                ? {
                    backgroundColor: submitButtonColor,
                    color: "#FFFFFF",
                  }
                : undefined
            }
            herokit-id="32728671-6d21-4d29-b858-050746ea18d0"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Wird gesendet...
              </span>
            ) : (
              submitButtonText
            )}
          </Button>
        </form>
      </div>
    );
  };

  if (submitted) {
    if (variant === "image-form") {
      return (
        <div className={className || ""} ref={successRef} id={sectionId}>
          <div
            className={`w-full ${getMaxWidthClass()} mx-auto rounded-[27px] border border-[hsl(0_0%_90%)] bg-white p-6 text-center sm:p-10 md:p-12`}
          >
            <div className="space-y-4">
              <div className="bg-accent/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                <span
                  className="text-3xl"
                  herokit-id="e368d4e9-de77-4502-9214-2c586a58580a"
                >
                  {successIcon}
                </span>
              </div>
              <h3
                className="text-2xl font-semibold"
                herokit-id="f64924be-1877-4eec-a241-bb4403a8dd68"
              >
                {successTitle}
              </h3>
              <p
                className="text-muted-foreground"
                herokit-id="3fc5ee26-502c-4903-911c-54338b5caab2"
              >
                {successMessage}
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({});
                  setFieldErrors({});
                }}
                variant={resetButtonVariant}
                className={cn(
                  "h-14 w-full rounded-[8px] bg-[#ff985c] font-semibold hover:bg-[#ff985c]/90 sm:h-16",
                  resetButtonClassName
                )}
                herokit-id="817457b4-b31b-4925-a325-5f68c415bf94"
              >
                {resetButtonText}
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div ref={successRef}>
        <Section id={sectionId} variant={variant} className={className}>
          <Container className={containerClassName}>
            <Card
              className={`mx-auto ${getMaxWidthClass()} ${cardClassName || ""}`}
            >
              <CardContent className="space-y-4 p-8 text-center">
                <div className="bg-accent/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                  <span
                    className="text-3xl"
                    herokit-id="64aa3471-d774-447d-b3af-64e9b1b2d0ea"
                  >
                    {successIcon}
                  </span>
                </div>
                <h3
                  className="text-2xl font-semibold"
                  herokit-id="ddf0fdaa-0cc2-43dc-b7cc-412110c0c0eb"
                >
                  {successTitle}
                </h3>
                <p
                  className="text-muted-foreground"
                  herokit-id="127e6557-62b6-4cbd-b859-baab4463cc11"
                >
                  {successMessage}
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({});
                    setFieldErrors({});
                  }}
                  variant={resetButtonVariant}
                  size="lg"
                  className={cn("w-full", resetButtonClassName)}
                  herokit-id="a7d83cd1-c3f5-46a8-9e5b-76982dfecec1"
                >
                  {resetButtonText}
                </Button>
              </CardContent>
            </Card>
          </Container>
        </Section>
      </div>
    );
  }

  if (variant === "image-form") {
    // If imageSrc is provided, render two-column layout (image left, form right)
    if (imageSrc) {
      return (
        <section className={`py-12 md:py-20 ${className || ""}`}>
          <div className={`container px-4 md:px-6 ${containerClassName || ""}`}>
            <div className="mx-auto grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2 lg:items-center">
              {/* Left column: Title, Subtitle, and Image */}
              <div
                className="flex h-full flex-col justify-start gap-6"
                herokit-id="0cf5262f-40a6-41c8-9d86-b7956c4b9c8e"
              >
                {(title || subtitle) && (
                  <div
                    className="space-y-2"
                    herokit-id="1da4e497-8180-47a7-bec2-83a6fa68dec7"
                  >
                    {title && (
                      <Heading
                        level={2}
                        className={cn(
                          "!m-0 text-left text-4xl leading-tight font-bold md:text-5xl",
                          titleClassName
                        )}
                        herokit-id="9394edef-30bf-49d3-af97-3c11daadd3a2"
                      >
                        {title}
                      </Heading>
                    )}
                    {subtitle && (
                      <p
                        className={cn(
                          "font-primary text-xl font-normal text-gray-700 md:text-2xl",
                          subtitleClassName
                        )}
                        herokit-id="4b468174-885a-4e8c-88f4-dced810e8ead"
                      >
                        {subtitle}
                      </p>
                    )}
                  </div>
                )}
                <div className="flex h-full justify-center">
                  <div className="relative h-full w-full">
                    <Image
                      src={imageSrc}
                      alt={imageAlt || "Kontaktformular Bild"}
                      width={651}
                      height={558}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Right column: Form */}
              <div herokit-id="710a5a9a-fec1-43ad-a30f-add41c3ef148">
                {renderImageForm()}
              </div>
            </div>
          </div>
        </section>
      );
    }

    // If no image, render just the form
    return (
      <div
        className={className || ""}
        herokit-id="0f1bf15e-c4ac-4a38-a73a-c08ccb80c3cd"
      >
        {renderImageForm()}
      </div>
    );
  }

  return (
    <Section id={sectionId} variant={variant} className={className}>
      <Container className={containerClassName}>
        <div ref={formRef} className={`mx-auto ${getMaxWidthClass()}`}>
          <div
            className={`mb-8 space-y-4 ${getTextAlignClass()}`}
            herokit-id="82f7a34f-b450-49d8-8b91-00d47acf4165"
          >
            <h2
              id={`${sectionId}-title`}
              className={titleClassName}
              herokit-id="cb0a1bde-1154-48ed-91f8-8326fb12eba9"
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className={`text-muted-foreground text-xl ${subtitleClassName || ""}`}
                herokit-id="748208a3-c0e0-4a7d-9360-664d4b354b50"
              >
                {subtitle}
              </p>
            )}
          </div>

          <Card
            className={cardClassName}
            herokit-id="21e99680-1a34-464e-a8e2-db337bea6a93"
          >
            {cardTitle && (
              <CardHeader className="gap-0 p-6">
                <CardTitle
                  className="text-2xl"
                  herokit-id="261f68ff-ae11-420e-aef9-8fc56bde87f6"
                >
                  {cardTitle}
                </CardTitle>
              </CardHeader>
            )}
            <CardContent className="pb-6">
              <form
                onSubmit={handleSubmit}
                onFocus={handleFormInteraction}
                className={`space-y-6 ${formClassName || ""}`}
              >
                {sections.map((section, sectionIndex) => {
                  const rows = groupFieldsIntoRows(section.fields);
                  return (
                    <div
                      key={sectionIndex}
                      herokit-id="0a1493f6-65f9-4ea2-8449-22444af7d239"
                    >
                      {section.title && (
                        <div
                          className={sectionIndex > 0 ? "border-t pt-6" : ""}
                        >
                          <h3
                            className="mb-4 text-3xl font-semibold"
                            herokit-id="dc61522b-26e1-49b1-9bbe-4fbf078cf632"
                          >
                            {section.title}
                          </h3>
                        </div>
                      )}
                      <div
                        className="space-y-4"
                        herokit-id="bd05ae49-471d-4496-af16-aef3fc5344d7"
                      >
                        {rows.map((row, rowIndex) => {
                          if (row.gridColumns === null) {
                            return (
                              <div
                                key={rowIndex}
                                className="space-y-3"
                                herokit-id="fdfdfe84-5212-4334-92bc-17a1460fb789"
                              >
                                {row.fields.map((field) => renderField(field))}
                              </div>
                            );
                          }
                          const gridColsClass =
                            row.gridColumns === 3
                              ? "md:grid-cols-3"
                              : "md:grid-cols-2";
                          return (
                            <div
                              key={rowIndex}
                              className={`grid ${gridColsClass} gap-4`}
                              herokit-id="94d4bc04-a2e4-43d0-8a4c-53d8c740d745"
                            >
                              {row.fields.map((field) => renderField(field))}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Honeypot field - hidden from users, visible to bots */}
                <div className="sr-only" aria-hidden="true">
                  <label
                    htmlFor="website_url"
                    style={{ display: "none" }}
                    herokit-id="02567ab5-5bdc-409b-a78f-bc88e42d1358"
                  >
                    Bitte lassen Sie dieses Feld leer
                  </label>
                  <input
                    type="text"
                    id="website_url"
                    name="website_url"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website_url || ""}
                    onChange={(e) =>
                      handleInputChange("website_url", e.target.value)
                    }
                  />
                </div>

                {/* reCAPTCHA v3 is invisible and executes on form submit */}

                <p
                  className="text-muted-foreground text-sm"
                  herokit-id="e825c244-e6c7-4ccc-9c1b-31be0dcff73f"
                >
                  {description}
                </p>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting || !areAllRequiredFieldsFilled()}
                  herokit-id="a13ce2f3-fd8f-4188-9f2b-d83ccf1431c5"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Wird gesendet...
                    </span>
                  ) : (
                    submitButtonText
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
};
