import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[äöüß]/g, (match) => {
      const replacements: { [key: string]: string } = {
        ä: "ae",
        ö: "oe",
        ü: "ue",
        ß: "ss",
      };
      return replacements[match] || match;
    })
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
};

/**
 * Converts **text** markers to HTML <strong> tags
 * This utility allows JSON files to use simple markdown-like syntax for bold text
 * 
 * @param text - The text string that may contain **bold** markers
 * @returns The text with **text** converted to <strong>text</strong>
 * 
 * @example
 * processBoldMarkers("This is **bold** text")
 * // Returns: "This is <strong>bold</strong> text"
 */
export const processBoldMarkers = (text: string): string => {
  if (!text || typeof text !== "string") {
    return text;
  }
  // Replace **text** with <strong>text</strong>
  // This regex matches **text** but avoids matching **** (empty bold)
  return text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
};

/**
 * Converts [[email:address]] markers to styled email links
 * This utility allows JSON files to use a simple marker for email links
 * that are automatically styled as bold and with color #005B8A
 * 
 * @param text - The text string that may contain [[email:address]] markers
 * @returns The text with [[email:address]] converted to styled <a> tags
 * 
 * @example
 * processStyledEmailLinks("Contact us at [[email:support@example.com]]")
 * // Returns: "Contact us at <a href=\"mailto:support@example.com\" class=\"text-[#005B8A] font-bold hover:underline\">support@example.com</a>"
 */
export const processStyledEmailLinks = (text: string): string => {
  if (!text || typeof text !== "string") {
    return text;
  }
  // Replace [[email:address]] with styled mailto link
  // The marker format is: [[email:email-address]]
  return text.replace(
    /\[\[email:([^\]]+)\]\]/g,
    '<a href="mailto:$1" class="text-[#005B8A] font-bold hover:underline">$1</a>'
  );
};
