import { z } from "zod";

// Email schema for validation (same as ContactSection.tsx)
export const emailSchema = z
  .object({
    to: z.array(z.string()),
    from: z.string(),
    subject: z.string().min(1, "Subject is required"),
    html: z.string().optional(),
    text: z.string().optional(),
    replyTo: z.string().optional(),
    cc: z.array(z.string()).optional(),
    bcc: z.array(z.string()).optional(),
    attachments: z
      .array(
        z.object({
          filename: z.string(),
          content: z.string(), // base64 encoded content
          contentType: z.string().optional(),
          encoding: z.literal("base64").optional().default("base64"),
        })
      )
      .optional(),
    tags: z
      .array(
        z.object({
          name: z.string(),
          value: z.string(),
        })
      )
      .optional(),
  })
  .refine((data) => data.html || data.text, {
    message: "Either 'html' or 'text' content must be provided",
    path: ["html", "text"],
  });

export interface SendEmailOptions {
  to: string | string[];
  from: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  tags?: Array<{ name: string; value: string }>;
}

/**
 * Sends an email via the hero-pages API
 * @param options Email options
 * @throws Error if email sending fails
 */
export async function sendEmail(options: SendEmailOptions): Promise<void> {
  const emailData = {
    to: options.to,
    from: options.from,
    subject: options.subject,
    text: options.text,
    html: options.html,
    replyTo: options.replyTo,
    tags: options.tags || [],
  };

  // Validate email data
  emailSchema.parse(emailData);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const url = `${apiUrl}/api/hero-page-helper/mail/send`;

  // Send email via API
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(emailData),
  });

  console.log("response:", response);

  if (!response.ok) {
    throw new Error("Fehler beim Senden der E-Mail");
  }
}

/**
 * Maps field values to human-readable labels
 */
const fieldValueMaps: Record<string, Record<string, string>> = {
  propertyType: {
    house: "Einfamilienhaus",
    apartment: "Eigentumswohnung",
    multi: "Mehrfamilienhaus",
    land: "Grundstück",
    commercial: "Gewerbe",
  },
  condition: {
    new: "Neuwertig",
    renovated: "Saniert",
    good: "Gepflegt",
    moderate: "Modernisierungsbedarf",
    renovation: "Sanierungsbedürftig",
  },
};

/**
 * Formats form data into a readable email text
 * @param formData Form data object
 * @param formTitle Optional title for the form submission
 * @returns Formatted email text (plain text version)
 */
export function formatFormDataAsEmail(
  formData: Record<string, any>,
  formTitle: string = "Neue Anfrage"
): string {
  // Field labels mapping
  const fieldLabels: Record<string, string> = {
    propertyType: "Objektart",
    zipCode: "PLZ / Ort",
    area: "Wohnfläche (m²)",
    rooms: "Zimmer",
    yearBuilt: "Baujahr",
    condition: "Zustand",
    name: "Name",
    email: "E-Mail",
    phone: "Telefon",
    phoneContact: "Kontakt per Telefon gewünscht",
    concern: "Anliegen",
    message: "Nachricht",
    privacy: "Datenschutz akzeptiert",
  };

  // Fields to exclude from email (system/internal fields)
  const excludedFields = [
    "privacy",
    "recaptchaToken",
    "website",
    "website_url",
  ];

  const lines: string[] = [];

  // Process all fields from formData
  Object.keys(formData).forEach((key) => {
    // Skip excluded fields
    if (excludedFields.includes(key)) {
      return;
    }

    const value = formData[key];
    // Skip empty values
    if (value === undefined || value === null || value === "") {
      return;
    }

    const label = fieldLabels[key] || key;
    let formattedValue = value;

    // Apply value mapping if available
    if (fieldValueMaps[key] && fieldValueMaps[key][value]) {
      formattedValue = fieldValueMaps[key][value];
    } else if (key === "phoneContact") {
      formattedValue = value === true ? "Ja" : "Nein";
    } else if (typeof value === "boolean") {
      formattedValue = value ? "Ja" : "Nein";
    }

    lines.push(`${label}: ${formattedValue}`);
  });

  // Add separator
  lines.push("\n---");
  lines.push("Diese Nachricht wurde über das Kontaktformular gesendet.");

  return lines.join("\n");
}

/**
 * Escapes HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Formats form data into a minimal HTML email
 * @param formData Form data object
 * @param formTitle Optional title for the form submission
 * @returns Formatted email HTML
 */
export function formatFormDataAsHtmlEmail(
  formData: Record<string, any>,
  formTitle: string = "Neue Anfrage"
): string {
  // Field labels mapping
  const fieldLabels: Record<string, string> = {
    propertyType: "Objektart",
    zipCode: "PLZ / Ort",
    area: "Wohnfläche (m²)",
    rooms: "Zimmer",
    yearBuilt: "Baujahr",
    condition: "Zustand",
    name: "Name",
    email: "E-Mail",
    phone: "Telefon",
    phoneContact: "Kontakt per Telefon gewünscht",
    concern: "Anliegen",
    message: "Nachricht",
    privacy: "Datenschutz akzeptiert",
  };

  // Fields to exclude from email (system/internal fields)
  const excludedFields = [
    "privacy",
    "recaptchaToken",
    "website",
    "website_url",
  ];

  const formatValue = (key: string, value: any): string => {
    if (fieldValueMaps[key] && fieldValueMaps[key][value]) {
      return fieldValueMaps[key][value];
    }
    if (key === "phoneContact") {
      return value === true ? "Ja" : "Nein";
    }
    if (typeof value === "boolean") {
      return value ? "Ja" : "Nein";
    }
    return String(value || "");
  };

  const formatField = (key: string, value: any): string => {
    if (value === undefined || value === null || value === "") {
      return "";
    }
    const label = fieldLabels[key] || key;
    const formattedValue = formatValue(key, value);
    const escapedValue = escapeHtml(formattedValue);
    // Use different styling for message/textarea fields (multiline)
    const isMultiline = key === "message" || formattedValue.length > 100;
    const cellStyle = isMultiline
      ? "padding: 8px 0; border-bottom: 1px solid #e5e7eb; white-space: pre-wrap;"
      : "padding: 8px 0; border-bottom: 1px solid #e5e7eb;";
    return `<tr><td style="${cellStyle}"><strong>${escapeHtml(label)}:</strong></td><td style="${cellStyle}">${escapedValue}</td></tr>`;
  };

  let allRows = "";
  // Process all fields from formData
  Object.keys(formData).forEach((key) => {
    // Skip excluded fields
    if (excludedFields.includes(key)) {
      return;
    }

    const row = formatField(key, formData[key]);
    if (row) allRows += row;
  });

  const escapedTitle = escapeHtml(formTitle);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #1f2937; background-color: #ffffff;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
    <h2 style="margin: 0 0 24px 0; font-size: 18px; font-weight: 600; color: #111827;">${escapedTitle}</h2>
    
    ${allRows ? `<table style="width: 100%; margin-bottom: 24px; border-collapse: collapse;"><tbody>${allRows}</tbody></table>` : ""}
    
    <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0; font-size: 12px; color: #6b7280;">Diese Nachricht wurde über das Kontaktformular gesendet.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
