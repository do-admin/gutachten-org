"use client";

import React from "react";
import { containsHtml as serverContainsHtml } from "@/lib/html-detector";

/**
 * Client-side wrapper for HTML detection
 * Uses the server-side function for consistency
 */
export function containsHtml(text: string): boolean {
  return serverContainsHtml(text);
}

/**
 * Safely parses HTML string and converts it to React elements
 * Only supports safe HTML tags: p, strong, b, em, i, a, ul, ol, li, br
 * All other tags are stripped for security
 */
function parseHtmlToReact(html: string): React.ReactNode {
  // If no HTML detected, return as plain text
  if (!containsHtml(html)) {
    return html;
  }

  // Check if we're in a browser environment
  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    // Server-side rendering: use simple text extraction
    return html;
  }

  // Create a temporary DOM element to parse HTML (browser only)
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const body = doc.body;

  // Recursively convert DOM nodes to React elements
  const convertNode = (node: Node): React.ReactNode => {
    // Text nodes
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || "";
    }

    // Element nodes
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      // Only allow safe HTML tags
      const allowedTags = [
        "p",
        "strong",
        "b",
        "em",
        "i",
        "a",
        "ul",
        "ol",
        "li",
        "br",
        "span",
        "div",
      ];

      if (!allowedTags.includes(tagName)) {
        // For disallowed tags, just return their text content
        return Array.from(element.childNodes).map(convertNode);
      }

      // Get attributes
      const props: Record<string, string> = {};
      Array.from(element.attributes).forEach((attr) => {
        // Only allow safe attributes
        if (
          attr.name === "href" ||
          attr.name === "target" ||
          attr.name === "rel" ||
          attr.name === "class" ||
          attr.name === "className"
        ) {
          props[attr.name === "class" ? "className" : attr.name] = attr.value;
        }
      });

      // Add default attributes for links
      if (tagName === "a" && !props.target) {
        props.target = "_blank";
        props.rel = "noopener noreferrer";
      }

      // Convert children
      const children = Array.from(element.childNodes).map(convertNode);

      // Handle self-closing tags
      if (tagName === "br") {
        return React.createElement("br", { key: Math.random() });
      }

      // Create React element
      return React.createElement(
        tagName,
        { key: Math.random(), ...props },
        ...children
      );
    }

    return null;
  };

  // Convert all body children
  return Array.from(body.childNodes).map(convertNode);
}

/**
 * Props for SafeHtmlRenderer component
 */
export interface SafeHtmlRendererProps {
  content: string;
  className?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  [key: string]: unknown;
}

/**
 * Safely renders HTML content as React components
 * Replaces dangerouslySetInnerHTML with safe parsing
 */
export function SafeHtmlRenderer({
  content,
  className,
  tag = "span",
  ...otherProps
}: SafeHtmlRendererProps): React.ReactElement {
  const Tag = tag as keyof React.JSX.IntrinsicElements;

  if (!containsHtml(content)) {
    return (
      <Tag className={className} {...otherProps}>
        {content}
      </Tag>
    );
  }

  const parsedContent = parseHtmlToReact(content);

  return (
    <Tag className={className} {...otherProps}>
      {parsedContent}
    </Tag>
  );
}

/**
 * Renders text or HTML content as a React node
 * Useful for inline rendering without a wrapper element
 */
export function renderTextOrHtmlSafe(content: string): React.ReactNode {
  if (!containsHtml(content)) {
    return content;
  }
  return parseHtmlToReact(content);
}

/**
 * Props for SafeHtml component (backward compatibility alias)
 */
export interface SafeHtmlProps {
  content: string;
  className?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  [key: string]: unknown;
}

/**
 * Safely renders HTML content or plain text
 * Alias for SafeHtmlRenderer for backward compatibility
 */
export function SafeHtml({
  content,
  className,
  tag = "span",
  ...otherProps
}: SafeHtmlProps): React.ReactElement {
  return (
    <SafeHtmlRenderer
      content={content}
      className={className}
      tag={tag}
      {...otherProps}
    />
  );
}
