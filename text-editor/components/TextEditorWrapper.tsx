"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { SEOEditorModal } from "@/components/SEOEditorModal";
import { SafeHtmlRenderer } from "@/lib/safe-html-renderer";

interface TextEditorConfig {
  projectId: string;
  apiEndpoint?: string;
  apiToken?: string;
  enabledByDefault?: boolean;
  showToggle?: boolean;
  enabled?: boolean;
}

interface TextEditorWrapperProps {
  children: React.ReactNode;
  config: TextEditorConfig;
}

interface EditContext {
  originalText: string;
  newText: string;
  herokitId: string;
  componentId?: string;
  elementTag: string;
  pageUrl: string;
  pageTitle?: string;
  projectId: string;
}

interface EditingState {
  element: HTMLElement;
  herokitId: string;
  originalText: string;
}

const EDITABLE_ELEMENTS = [
  "P",
  "SPAN",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "LI",
  "TD",
  "TH",
  "BLOCKQUOTE",
  "LABEL",
  "A",
  "BUTTON",
  "DIV",
];

const DeepTextEditor: React.FC<{
  enabled: boolean;
  config: TextEditorConfig;
}> = ({ enabled = false, config }) => {
  // Store enabled state before type narrowing
  const isEditorEnabled = config.enabled !== false;
  const shouldShowToggle = config.showToggle !== false;

  // If editor is explicitly disabled in config, don't render anything
  // This prevents editor/SEO buttons from appearing even with query params
  // enabled can be true, false, or undefined - only skip rendering if explicitly false
  if (config.enabled === false) {
    return null;
  }

  const [isActive, setIsActive] = useState(enabled);
  const [editingState, setEditingState] = useState<EditingState | null>(null);
  const [editValue, setEditValue] = useState("");
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isMarkingPage, setIsMarkingPage] = useState(false);
  const [lastEditResult, setLastEditResult] = useState<{
    success: boolean;
    message: string;
    editId?: string;
    isProduction?: boolean;
  } | null>(null);
  const [isSEOEditorOpen, setIsSEOEditorOpen] = useState(false);
  const pathname = usePathname();

  // Link functionality state
  const [selectedText, setSelectedText] = useState("");
  const [selectedRange, setSelectedRange] = useState<Range | null>(null);
  const [linkHref, setLinkHref] = useState("");
  const [availableLinks, setAvailableLinks] = useState<
    Array<{
      label: string;
      href: string;
      isExternal: boolean;
      category?: string;
    }>
  >([]);
  const [linkCategories, setLinkCategories] = useState<
    Array<{
      name: string;
      links: Array<{
        label: string;
        href: string;
        isExternal: boolean;
        category?: string;
      }>;
    }>
  >([]);
  const [showLinkControls, setShowLinkControls] = useState(false);
  const [textEditorRef, setTextEditorRef] = useState<HTMLDivElement | null>(
    null
  );

  const apiEndpoint = config.apiEndpoint || "/api/text-editor";
  const apiToken = config.apiToken;

  const cleanText = (text: string): string => {
    return text.trim().replace(/\s+/g, " ");
  };

  const findHerokitElement = (target: HTMLElement): HTMLElement | null => {
    // First check if target itself has herokit-id
    if (target.hasAttribute("herokit-id")) {
      return target;
    }
    // Otherwise find the closest parent with herokit-id
    return target.closest("[herokit-id]") as HTMLElement | null;
  };

  const findComponentId = (element: HTMLElement): string | undefined => {
    // Find the closest parent with data-component-id
    const componentElement = element.closest(
      "[data-component-id]"
    ) as HTMLElement | null;
    return componentElement?.getAttribute("data-component-id") || undefined;
  };

  const isEditableElement = (element: HTMLElement): boolean => {
    if (!EDITABLE_ELEMENTS.includes(element.tagName)) return false;
    if (element.closest(".deep-text-control, .text-editor-modal")) return false;
    const text = element.textContent?.trim();
    return !!text && text.length >= 3;
  };

  const captureEditContext = useCallback(
    (element: HTMLElement, herokitId: string): EditContext => {
      const text = cleanText(element.textContent || "");
      const componentId = findComponentId(element);
      return {
        originalText: text,
        newText: text,
        herokitId,
        componentId,
        elementTag: element.tagName.toLowerCase(),
        pageUrl: window.location.href,
        pageTitle: document.title,
        projectId: config.projectId,
      };
    },
    [config.projectId]
  );

  useEffect(() => {
    if (!isActive || editingState) return;

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const herokitElement = findHerokitElement(target);

      if (!herokitElement || !isEditableElement(herokitElement)) {
        return;
      }

      if (hoveredElement && hoveredElement !== herokitElement) {
        hoveredElement.style.backgroundColor = "";
        hoveredElement.style.outline = "";
        hoveredElement.style.cursor = "";
      }

      herokitElement.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
      herokitElement.style.outline = "2px dashed #3b82f6";
      herokitElement.style.cursor = "pointer";
      setHoveredElement(herokitElement);
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const herokitElement = findHerokitElement(target);

      if (herokitElement && hoveredElement === herokitElement) {
        herokitElement.style.backgroundColor = "";
        herokitElement.style.outline = "";
        herokitElement.style.cursor = "";
        setHoveredElement(null);
      }
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const herokitElement = findHerokitElement(target);

      if (!herokitElement || !isEditableElement(herokitElement)) {
        return;
      }

      const herokitId = herokitElement.getAttribute("herokit-id");
      if (!herokitId) return;

      event.preventDefault();
      event.stopPropagation();

      const text = cleanText(herokitElement.textContent || "");
      // Get innerHTML if element contains HTML, otherwise use textContent
      const htmlContent = herokitElement.innerHTML || text;
      setEditingState({
        element: herokitElement,
        herokitId,
        originalText: text,
      });
      // Store HTML content if it contains links, otherwise store plain text
      setEditValue(htmlContent.includes("<a") ? htmlContent : text);
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("click", handleClick);

    return () => {
      if (hoveredElement) {
        hoveredElement.style.backgroundColor = "";
        hoveredElement.style.outline = "";
        hoveredElement.style.cursor = "";
      }
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("click", handleClick);
    };
  }, [isActive, editingState, hoveredElement]);

  const toggleEditor = () => {
    if (isActive && hoveredElement) {
      hoveredElement.style.backgroundColor = "";
      hoveredElement.style.outline = "";
      hoveredElement.style.cursor = "";
      setHoveredElement(null);
    }
    setIsActive(!isActive);
    if (isActive) {
      setEditingState(null);
      setEditValue("");
    }
  };

  const saveEdit = async () => {
    if (!editingState || !editValue.trim()) return;

    setIsProcessing(true);
    setLastEditResult(null);

    try {
      const editContext = captureEditContext(
        editingState.element,
        editingState.herokitId
      );
      editContext.newText = editValue.trim();

      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (apiToken) {
        headers["Authorization"] = `Bearer ${apiToken}`;
      }

      // Check if the text contains HTML links
      const containsHtmlLinks = /<a\s+[^>]*href\s*=/i.test(editValue);

      // Extract link metadata if HTML links are present
      let linkMetadata: Record<string, unknown> | undefined;
      if (containsHtmlLinks) {
        const linkMatches = editValue.matchAll(
          /<a\s+[^>]*href\s*=\s*["']([^"']+)["'][^>]*>(.*?)<\/a>/gi
        );
        const links: Array<{ href: string; text: string }> = [];
        for (const match of linkMatches) {
          links.push({
            href: match[1],
            text: match[2],
          });
        }
        if (links.length > 0) {
          linkMetadata = { links, linkCount: links.length };
        }
      }

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...editContext,
          containsHtmlLinks,
          linkMetadata,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setLastEditResult({
          success: true,
          message: result.message || "Text successfully updated!",
          editId: result.editId,
          isProduction: result.isProduction,
        });
        // Update element with HTML content if it contains links, otherwise use plain text
        if (editValue.includes("<a")) {
          editingState.element.innerHTML = editValue;
        } else {
          editingState.element.textContent = stripHtml(editValue);
        }
        setEditingState(null);
        setEditValue("");
        setSelectedText("");
        setSelectedRange(null);
        setLinkHref("");
        setShowLinkControls(false);
      } else {
        setLastEditResult({
          success: false,
          message: result.message || "Failed to submit text edit",
        });
      }
    } catch (error) {
      console.error("[TextEditorWrapper] Failed to save edit:", error);
      setLastEditResult({
        success: false,
        message: "Network error occurred while saving edit",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetToOriginal = async () => {
    if (!editingState) return;

    setIsResetting(true);
    setLastEditResult(null);

    try {
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (apiToken) {
        headers["Authorization"] = `Bearer ${apiToken}`;
      }

      const response = await fetch(`${apiEndpoint}/original`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          projectId: config.projectId,
          pageUrl: window.location.href,
          herokitId: editingState.herokitId,
        }),
      });

      const result = await response.json();

      if (result.success && result.originalText) {
        setEditValue(result.originalText);
        setLastEditResult({
          success: true,
          message: "Text reset to original!",
        });
      } else {
        setLastEditResult({
          success: false,
          message: result.message || "No original text found",
        });
      }
    } catch (error) {
      console.error("[TextEditor] Failed to reset text:", error);
      setLastEditResult({ success: false, message: "Failed to reset text" });
    } finally {
      setIsResetting(false);
    }
  };

  const markPageAsApplied = async () => {
    setIsMarkingPage(true);
    setLastEditResult(null);

    try {
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (apiToken) {
        headers["Authorization"] = `Bearer ${apiToken}`;
      }

      const response = await fetch(`${apiEndpoint}/mark-page-applied`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          projectId: config.projectId,
          pageUrl: window.location.href,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setLastEditResult({
          success: true,
          message:
            result.message ||
            `Marked ${result.updatedCount || 0} edit(s) as applied`,
        });
      } else {
        setLastEditResult({
          success: false,
          message: result.error || "Failed to mark page edits as applied",
        });
      }
    } catch (error) {
      console.error("[TextEditor] Failed to mark page as applied:", error);
      setLastEditResult({ success: false, message: "Network error occurred" });
    } finally {
      setIsMarkingPage(false);
    }
  };

  useEffect(() => {
    if (lastEditResult) {
      const duration = lastEditResult.isProduction ? 10000 : 5000;
      const timer = setTimeout(() => setLastEditResult(null), duration);
      return () => clearTimeout(timer);
    }
  }, [lastEditResult]);

  const closeModal = () => {
    setEditingState(null);
    setEditValue("");
    setSelectedText("");
    setSelectedRange(null);
    setLinkHref("");
    setShowLinkControls(false);
  };

  // Load available links when modal opens
  useEffect(() => {
    if (editingState) {
      const headers: HeadersInit = {};
      if (apiToken) {
        headers["Authorization"] = `Bearer ${apiToken}`;
      }

      fetch("/api/text-editor/links", { headers })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setAvailableLinks(data.allLinks || []);
            setLinkCategories(data.categories || []);
          }
        })
        .catch((error) => {
          console.error("Failed to load links:", error);
        });
    }
  }, [editingState, apiToken]);

  // Sync contentEditable content with editValue
  useEffect(() => {
    if (textEditorRef && editingState) {
      // Check if editValue contains HTML tags (like links)
      const hasHtmlTags = /<[a-z][\s\S]*>/i.test(editValue);

      if (hasHtmlTags) {
        // If it has HTML tags, use as-is
        if (textEditorRef.innerHTML !== editValue) {
          textEditorRef.innerHTML = editValue;
        }
      } else {
        // If it's plain text, escape it properly for display
        const currentHtml = getHtmlContent(editValue);
        // Compare decoded versions to avoid unnecessary updates
        const currentDecoded = decodeHtmlEntities(textEditorRef.innerHTML);
        if (currentDecoded !== editValue) {
          textEditorRef.innerHTML = currentHtml;
        }
      }
    }
  }, [editValue, textEditorRef, editingState]);

  // Handle text selection in contenteditable
  const handleTextSelection = useCallback(() => {
    if (!textEditorRef) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      setSelectedText("");
      setSelectedRange(null);
      setShowLinkControls(false);
      return;
    }

    const range = selection.getRangeAt(0);
    const selectedTextContent = range.toString().trim();

    if (selectedTextContent.length > 0) {
      setSelectedText(selectedTextContent);
      setSelectedRange(range.cloneRange());
      setShowLinkControls(true);
    } else {
      setSelectedText("");
      setSelectedRange(null);
      setShowLinkControls(false);
    }
  }, [textEditorRef]);

  // Apply link to selected text
  const applyLink = () => {
    if (!selectedRange || !linkHref.trim()) {
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }

    try {
      // Remove existing selection
      selection.removeAllRanges();
      selection.addRange(selectedRange);

      // Create anchor element
      const anchor = document.createElement("a");
      anchor.href = linkHref.trim();
      anchor.textContent = selectedText;

      // Delete selected content and insert link
      selectedRange.deleteContents();
      selectedRange.insertNode(anchor);

      // Update editValue with HTML content
      if (textEditorRef) {
        const htmlContent = textEditorRef.innerHTML;
        setEditValue(htmlContent);
      }

      // Clear selection and link controls
      selection.removeAllRanges();
      setSelectedText("");
      setSelectedRange(null);
      setLinkHref("");
      setShowLinkControls(false);
    } catch (error) {
      console.error("Failed to apply link:", error);
    }
  };

  // Decode HTML entities to plain text
  const decodeHtmlEntities = (html: string): string => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Strip HTML tags to get plain text for display/editing
  const stripHtml = (html: string): string => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Convert plain text to HTML (preserving existing HTML if any)
  const getHtmlContent = (text: string): string => {
    // If text contains HTML tags (like <a>), return as is
    if (/<[a-z][\s\S]*>/i.test(text)) {
      return text;
    }
    // Otherwise, escape HTML and convert newlines to <br>
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>");
  };

  // Extract page key from pathname
  const getPageKey = (): { pageKey: string; programmaticInstance?: string } => {
    if (!pathname) return { pageKey: "home" };

    // Remove leading slash and query params
    const path = pathname.replace(/^\//, "").split("?")[0];

    // Check if it's a programmatic page (e.g., /hamburg or /nutzungsdauer-hamburg)
    // This is a simplified check - you may need to adjust based on your routing
    const parts = path.split("/");

    if (parts.length === 1 && parts[0]) {
      // Single segment - could be a city or a page
      // For now, assume it's a page key
      return { pageKey: parts[0] || "home" };
    } else if (parts.length === 2) {
      // Two segments - likely [slug]/[instance]
      return { pageKey: parts[0], programmaticInstance: parts[1] };
    }

    // Default to home if path is empty
    return { pageKey: path || "home" };
  };

  const { pageKey, programmaticInstance } = getPageKey();

  return (
    <>
      {/* Toggle Button - Only show if enabled and showToggle is not false */}
      {/* For final deployments, config.enabled will be false, so buttons won't show */}
      {isEditorEnabled && shouldShowToggle && (
        <div
          className="deep-text-control fixed right-4 bottom-4 z-[9999] flex flex-row gap-2"
          herokit-id="c19f60bc-7e4d-4cbf-8149-e18a181a3b5a"
        >
          <button
            onClick={toggleEditor}
            className={`rounded px-3 py-2 font-medium shadow-lg transition-all duration-200 ${
              isActive
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            herokit-id="b6ae6739-4d08-4427-9aec-cf1059077f6b"
          >
            {isActive ? "✓ Editor ON" : "✗ Editor OFF"}
          </button>

          {/* SEO Editor Button */}
          <button
            onClick={() => setIsSEOEditorOpen(true)}
            className="rounded bg-blue-500 px-3 py-2 font-medium text-white shadow-lg transition-all duration-200 hover:bg-blue-600"
            herokit-id="seo-editor-button"
            title="Edit SEO Metadata & Structured Data"
          >
            📝 SEO
          </button>

          {/* Toast Notification */}
          {lastEditResult && !editingState && (
            <div
              className={`absolute right-0 bottom-full mb-2 max-w-sm rounded-lg p-3 shadow-lg ${
                lastEditResult.success
                  ? "border border-green-200 bg-green-50 text-green-800"
                  : "border border-red-200 bg-red-50 text-red-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-sm font-medium"
                  herokit-id="9a9db90a-6c48-4ecd-931f-0e8303e67d22"
                >
                  {lastEditResult.success ? "✓ Success" : "✕ Error"}
                </span>
                <button
                  onClick={() => setLastEditResult(null)}
                  className="ml-2 opacity-70 hover:opacity-100"
                  aria-label="Dismiss"
                  herokit-id="50a25265-5460-405c-be3f-6be2e2d7742a"
                >
                  ✕
                </button>
              </div>
              <p
                className="mt-1 text-xs"
                herokit-id="79abfa7b-2056-414c-bf09-9bbe274ccc64"
              >
                {lastEditResult.message}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {editingState && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div
            className="text-editor-modal mx-4 w-full max-w-4xl rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                  <span
                    className="text-white"
                    herokit-id="0b969905-881d-4fe3-a229-8a11c11866f9"
                  >
                    ✎
                  </span>
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold text-gray-900"
                    herokit-id="2acc76f5-7b96-4902-82c7-20c09c14cfdb"
                  >
                    Text Editor
                  </h3>
                  <p
                    className="text-xs text-gray-500"
                    herokit-id="919b6ae4-6ad7-434f-ae45-59a8bf14f86a"
                  >
                    ID: {editingState.herokitId.slice(0, 8)}...
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close"
                herokit-id="8d186052-2376-4df6-98d5-861a30779fcc"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div
              className="space-y-3 px-4 py-3"
              herokit-id="8d048cb4-95c0-4cbc-b410-661bb131f84d"
            >
              {/* Original Text */}
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-gray-700"
                  herokit-id="b4d98314-524c-4520-8b9f-859e5680267c"
                >
                  Original Text
                </label>
                <div
                  className="rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm text-gray-700"
                  herokit-id="a7fa57da-770d-4830-b0f3-356d5fbd9edc"
                >
                  {editingState.originalText}
                </div>
              </div>

              {/* New Text */}
              <div className="space-y-2">
                <label
                  className="flex items-center justify-between text-sm font-semibold text-gray-700"
                  herokit-id="5023984c-8ab7-4c50-862e-e3a0aba62c92"
                >
                  New Text
                  <span
                    className="text-xs font-normal text-gray-400"
                    herokit-id="0c09c1db-1c9c-4a0d-b65f-645bd7e108f3"
                  >
                    {stripHtml(editValue).length} characters
                  </span>
                </label>
                <div className="relative">
                  <div
                    ref={setTextEditorRef}
                    contentEditable
                    onSelect={handleTextSelection}
                    onInput={(e) => {
                      const element = e.currentTarget;
                      const html = element.innerHTML;

                      // Check if content contains actual HTML tags (like links)
                      const hasHtmlTags = /<[a-z][\s\S]*>/i.test(html);

                      if (hasHtmlTags) {
                        // If it has HTML tags, use innerHTML as-is
                        setEditValue(html);
                      } else {
                        // If it's plain text, decode HTML entities to prevent double-encoding
                        // This fixes the issue where typing "&" becomes "&amp;" and can't be deleted
                        const decodedText = decodeHtmlEntities(html);
                        setEditValue(decodedText);
                      }
                    }}
                    className="min-h-[80px] w-full resize-none rounded-lg border-2 border-gray-200 bg-white p-3 font-mono text-sm text-black focus:border-blue-500 focus:outline-none"
                    style={{ whiteSpace: "pre-wrap" }}
                    suppressContentEditableWarning
                  />
                  <div className="absolute right-2 bottom-2 text-xs text-gray-400">
                    Select text to add link
                  </div>
                </div>
              </div>

              {/* Link Controls */}
              {showLinkControls && selectedText && (
                <div className="space-y-2 rounded-lg border-2 border-blue-200 bg-blue-50 p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">
                      Add Link to: &quot;{selectedText}&quot;
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <input
                      type="text"
                      value={linkHref}
                      onChange={(e) => setLinkHref(e.target.value)}
                      placeholder="Enter URL or select from dropdown"
                      className="min-w-[200px] flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                    <select
                      value={linkHref}
                      onChange={(e) => setLinkHref(e.target.value)}
                      className="min-w-[200px] flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select from available links</option>
                      {linkCategories.map((category) => (
                        <optgroup key={category.name} label={category.name}>
                          {category.links.map((link) => (
                            <option key={link.href} value={link.href}>
                              {link.label} {link.isExternal ? "🔗" : ""}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <button
                      onClick={applyLink}
                      disabled={!linkHref.trim()}
                      className="rounded bg-green-500 px-4 py-2 text-sm font-medium whitespace-nowrap text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Apply Link
                    </button>
                    <button
                      onClick={() => {
                        setShowLinkControls(false);
                        setSelectedText("");
                        setSelectedRange(null);
                        setLinkHref("");
                      }}
                      className="rounded bg-gray-400 px-3 py-2 text-sm font-medium whitespace-nowrap text-white hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Preview */}
              {editValue.includes("<a") && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Preview
                  </label>
                  <SafeHtmlRenderer
                    content={editValue}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm"
                    tag="div"
                  />
                </div>
              )}

              {/* Status Message */}
              {lastEditResult && (
                <div
                  className={`rounded-lg border p-3 ${
                    lastEditResult.success
                      ? "border-green-200 bg-green-50 text-green-800"
                      : "border-red-200 bg-red-50 text-red-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-medium"
                      herokit-id="4c956224-1d31-4057-871a-6b30c808a230"
                    >
                      {lastEditResult.success ? "✓ " : "✕ "}
                      {lastEditResult.message}
                    </span>
                    <button
                      onClick={() => setLastEditResult(null)}
                      className="opacity-50 hover:opacity-100"
                      aria-label="Dismiss"
                      herokit-id="0d3f466f-b613-4564-92f9-1a1938236e5e"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="space-y-2 rounded-b-xl border-t border-gray-200 bg-gray-50 px-4 py-3">
              <div className="flex gap-2">
                <button
                  onClick={saveEdit}
                  disabled={isProcessing || !editValue.trim()}
                  className="flex-1 rounded bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                  herokit-id="5ab85f76-28e1-4a7f-b9d6-b4b0212427ac"
                >
                  {isProcessing ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={resetToOriginal}
                  disabled={isResetting}
                  className="rounded bg-[#ff985c] px-3 py-2 font-medium text-white hover:bg-[#ff7a3d] disabled:opacity-50"
                  herokit-id="685167ea-695b-4199-865d-c23c28f5e1b4"
                >
                  {isResetting ? "..." : "Reset"}
                </button>
                <button
                  onClick={closeModal}
                  className="rounded bg-gray-500 px-3 py-2 font-medium text-white hover:bg-gray-600"
                  herokit-id="34f2e5c6-8667-4589-9f25-2bd5d5ed48d9"
                >
                  Cancel
                </button>
              </div>
              {/* <button
                onClick={markPageAsApplied}
                disabled={isMarkingPage}
                className="w-full rounded bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 disabled:opacity-50"
                herokit-id="6255cfa5-c26a-4af1-af9d-8ac0e8b14402"
              >
                {isMarkingPage
                  ? "Marking..."
                  : "Mark All Page Edits as Applied"}
              </button> */}
            </div>
          </div>
        </div>
      )}

      {/* SEO Editor Modal */}
      <SEOEditorModal
        open={isSEOEditorOpen}
        onOpenChange={setIsSEOEditorOpen}
        pageKey={pageKey}
        pageUrl={typeof window !== "undefined" ? window.location.href : ""}
        programmaticInstance={programmaticInstance}
      />

      <style jsx global>{`
        .text-editor-modal {
          background: white !important;
          color: black !important;
        }
        .text-editor-modal * {
          color: inherit !important;
        }
        .text-editor-modal textarea {
          background: white !important;
          color: black !important;
        }
        .text-editor-modal button {
          color: white !important;
        }
      `}</style>
    </>
  );
};

export const TextEditorWrapper: React.FC<TextEditorWrapperProps> = ({
  children,
  config,
}) => {
  const [isEditorEnabled] = useState(config.enabledByDefault || false);

  if (config.enabled === false) {
    return <>{children}</>;
  }

  return (
    <div className="relative" herokit-id="b95bc8bc-92a3-4d81-b521-aa42e78e4051">
      <DeepTextEditor
        enabled={isEditorEnabled}
        config={{ ...config, enabledByDefault: isEditorEnabled }}
      />
      {children}
    </div>
  );
};

interface ConditionalTextEditorProps {
  config: TextEditorConfig;
  children: React.ReactNode;
}

export function ConditionalTextEditor({
  config,
  children,
}: ConditionalTextEditorProps) {
  // If editor is explicitly disabled in config, never show it (even with query params)
  // This ensures final deployments never show editor/SEO buttons
  if (config.enabled === false) {
    return <>{children}</>;
  }

  // Use state to track if we should show the editor (only after hydration)
  // This prevents hydration mismatches by ensuring server and client render the same initially
  const [shouldShowEditor, setShouldShowEditor] = useState(false);

  useEffect(() => {
    // Only check hostname after component has mounted (client-side only)
    const hostname = window.location.hostname;
    const isTextEditorSubdomain = hostname.includes("texteditor.");
    const isLocalhost =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname === "[::1]";

    // At this point, config.enabled is either true or undefined (not false)
    // So we can show the editor if it's a texteditor subdomain or localhost
    if (isTextEditorSubdomain || isLocalhost) {
      setShouldShowEditor(true);
    }
  }, []);

  // Always render the same structure on server and client initially
  // Only wrap with TextEditorWrapper after hydration if conditions are met
  if (shouldShowEditor) {
    return <TextEditorWrapper config={config}>{children}</TextEditorWrapper>;
  }

  return <>{children}</>;
}

export type {
  TextEditorConfig,
  TextEditorWrapperProps,
  EditContext,
  ConditionalTextEditorProps,
};
