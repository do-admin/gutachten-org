"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Component for Schema JSON-LD tab
function SchemaJSONLDTab({
  components,
  updateStructuredDataField,
  setSaveResult,
}: {
  components: StructuredDataComponent[];
  updateStructuredDataField: (
    componentId: string,
    fieldPath: string,
    value: any
  ) => void;
  setSaveResult: (result: { success: boolean; message: string }) => void;
}) {
  // Generate JSON-LD schema from component data
  const generateJSONLD = (component: StructuredDataComponent) => {
    // Handle specific schema types
    if (component.schemaType === "organization") {
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: component.data?.name,
        ...(component.data?.alternateName && {
          alternateName: component.data.alternateName,
        }),
        description: component.data?.description,
        url: component.data?.url,
        ...(component.data?.logo && { logo: component.data.logo }),
        ...(component.data?.sameAs && { sameAs: component.data.sameAs }),
        ...(component.data?.address && {
          address: {
            "@type": "PostalAddress",
            ...component.data.address,
          },
        }),
        ...(component.data?.contactPoint && {
          contactPoint: {
            "@type": "ContactPoint",
            ...component.data.contactPoint,
          },
        }),
        ...(component.data?.areaServed && {
          areaServed: {
            "@type": component.data.areaServed["@type"] || "City",
            name: component.data.areaServed.name,
          },
        }),
        ...(component.data?.serviceArea && {
          serviceArea: {
            "@type": component.data.serviceArea["@type"] || "Country",
            name: component.data.serviceArea.name,
          },
        }),
      };
    }

    if (component.schemaType === "faq") {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        ...(component.data?.url && { url: component.data.url }),
        ...(component.data?.name && { name: component.data.name }),
        mainEntity: (component.data?.items || []).map((item: any) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      };
    }

    if (component.schemaType === "website") {
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: component.data?.name,
        url: component.data?.url,
        description: component.data?.description,
        ...(component.data?.inLanguage && {
          inLanguage: component.data.inLanguage,
        }),
        ...(component.data?.publisher && {
          publisher: {
            "@type": "Organization",
            ...component.data.publisher,
          },
        }),
        ...(component.data?.potentialAction && {
          potentialAction: component.data.potentialAction,
        }),
      };
    }

    if (component.schemaType === "article") {
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: component.data?.headline,
        ...(component.data?.description && {
          description: component.data.description,
        }),
        ...(component.data?.image && { image: component.data.image }),
        ...(component.data?.author && {
          author: {
            "@type": "Organization",
            ...component.data.author,
          },
        }),
        ...(component.data?.publisher && {
          publisher: {
            "@type": "Organization",
            ...component.data.publisher,
          },
        }),
        ...(component.data?.datePublished && {
          datePublished: component.data.datePublished,
        }),
        ...(component.data?.dateModified && {
          dateModified: component.data.dateModified,
        }),
      };
    }

    // Default: return base schema
    return {
      "@context": "https://schema.org",
      "@type":
        component.schemaType.charAt(0).toUpperCase() +
        component.schemaType.slice(1),
      ...component.data,
    };
  };

  if (components.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        No structured data components found on this page
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      {components.map((component) => (
        <SchemaJSONLDEditor
          key={component.id}
          component={component}
          generateJSONLD={generateJSONLD}
          updateStructuredDataField={updateStructuredDataField}
          setSaveResult={setSaveResult}
        />
      ))}
    </div>
  );
}

// Individual schema editor component
function SchemaJSONLDEditor({
  component,
  generateJSONLD,
  updateStructuredDataField,
  setSaveResult,
}: {
  component: StructuredDataComponent;
  generateJSONLD: (component: StructuredDataComponent) => any;
  updateStructuredDataField: (
    componentId: string,
    fieldPath: string,
    value: any
  ) => void;
  setSaveResult: (result: { success: boolean; message: string }) => void;
}) {
  const jsonLD = generateJSONLD(component);
  const [jsonLDString, setJsonLDString] = useState(
    JSON.stringify(jsonLD, null, 2)
  );

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonLDString);
      // Remove @context and @type, keep the rest as data
      const { "@context": _, "@type": __, ...data } = parsed;
      // Update the component data
      updateStructuredDataField(component.id, "data", data);
      setSaveResult({
        success: true,
        message: "Schema updated (click 'Save Changes' to apply)",
      });
    } catch (error) {
      setSaveResult({
        success: false,
        message: `Invalid JSON: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    }
  };

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">
          {component.schemaType} ({component.id})
        </h3>
        <Button variant="outline" size="sm" onClick={handleApply}>
          Apply Changes
        </Button>
      </div>
      <div className="space-y-2">
        <Label>JSON-LD Schema</Label>
        <textarea
          value={jsonLDString}
          onChange={(e) => setJsonLDString(e.target.value)}
          className="border-input bg-background focus-visible:ring-ring flex min-h-[300px] w-full rounded-md border px-3 py-2 font-mono text-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          spellCheck={false}
        />
        <p className="text-muted-foreground text-xs">
          Edit the JSON-LD schema directly. Changes will be applied to the
          component data when you click "Apply Changes" and then "Save Changes".
        </p>
      </div>
      <div className="space-y-2">
        <Label>Preview (Current Generated Schema)</Label>
        <pre className="border-input bg-muted max-h-[200px] overflow-auto rounded-md border p-3 text-xs">
          {JSON.stringify(jsonLD, null, 2)}
        </pre>
      </div>
    </div>
  );
}

interface SEOEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pageKey: string;
  pageUrl: string;
  programmaticInstance?: string;
}

interface Metadata {
  title?: string;
  description?: string;
  authors?: Array<{ name: string }>;
  creator?: string;
  publisher?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    locale?: string;
    type?: string;
    images?: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    url?: string;
    images?: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
}

interface StructuredDataComponent {
  id: string;
  schemaType: string;
  data: any;
}

export function SEOEditorModal({
  open,
  onOpenChange,
  pageKey,
  pageUrl,
  programmaticInstance,
}: SEOEditorModalProps) {
  const [metadata, setMetadata] = useState<Metadata>({});
  const [originalMetadata, setOriginalMetadata] = useState<Metadata>({});
  const [structuredDataComponents, setStructuredDataComponents] = useState<
    StructuredDataComponent[]
  >([]);
  const [
    originalStructuredDataComponents,
    setOriginalStructuredDataComponents,
  ] = useState<StructuredDataComponent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<
    "metadata" | "structured" | "schema"
  >("metadata");

  // Fetch metadata and structured data when modal opens
  useEffect(() => {
    if (open && pageKey) {
      fetchPageData();
    }
  }, [open, pageKey, programmaticInstance]);

  const fetchPageData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/seo-editor/metadata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageKey,
          programmaticInstance,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const fetchedMetadata = data.metadata || {};
        const fetchedStructuredData = data.structuredDataComponents || [];
        setMetadata(fetchedMetadata);
        setOriginalMetadata(JSON.parse(JSON.stringify(fetchedMetadata))); // Deep copy
        setStructuredDataComponents(fetchedStructuredData);
        setOriginalStructuredDataComponents(
          JSON.parse(JSON.stringify(fetchedStructuredData))
        ); // Deep copy
      } else {
        console.error("Failed to fetch page data:", data.error);
        setSaveResult({
          success: false,
          message: `Failed to load page data: ${data.error}`,
        });
      }
    } catch (error) {
      console.error("Error fetching page data:", error);
      setSaveResult({
        success: false,
        message: `Error loading page data: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveResult(null);

    try {
      // Collect metadata edits by comparing current with original
      const metadataEdits: Array<{
        field: string;
        originalValue: any;
        newValue: any;
      }> = [];

      // Helper to compare and collect changes
      const collectMetadataChanges = (
        current: any,
        original: any,
        prefix: string = ""
      ) => {
        if (typeof current !== typeof original) {
          metadataEdits.push({
            field: prefix,
            originalValue: original,
            newValue: current,
          });
          return;
        }

        if (
          typeof current === "object" &&
          current !== null &&
          !Array.isArray(current)
        ) {
          const allKeys = new Set([
            ...Object.keys(current),
            ...Object.keys(original || {}),
          ]);
          for (const key of allKeys) {
            const fieldPath = prefix ? `${prefix}.${key}` : key;
            if (
              JSON.stringify(current[key]) !== JSON.stringify(original?.[key])
            ) {
              if (
                typeof current[key] === "object" &&
                current[key] !== null &&
                !Array.isArray(current[key])
              ) {
                collectMetadataChanges(
                  current[key],
                  original?.[key] || {},
                  fieldPath
                );
              } else {
                metadataEdits.push({
                  field: fieldPath,
                  originalValue: original?.[key],
                  newValue: current[key],
                });
              }
            }
          }
        } else if (Array.isArray(current)) {
          // For arrays, we'll do a simple comparison
          if (JSON.stringify(current) !== JSON.stringify(original)) {
            metadataEdits.push({
              field: prefix,
              originalValue: original,
              newValue: current,
            });
          }
        } else if (current !== original) {
          metadataEdits.push({
            field: prefix,
            originalValue: original,
            newValue: current,
          });
        }
      };

      collectMetadataChanges(metadata, originalMetadata);

      // Collect structured data edits
      const structuredDataEdits: Array<{
        componentId: string;
        field: string;
        originalValue: any;
        newValue: any;
      }> = [];

      structuredDataComponents.forEach((comp, index) => {
        const originalComp = originalStructuredDataComponents.find(
          (oc) => oc.id === comp.id
        );
        if (originalComp) {
          // Compare data objects
          const collectDataChanges = (
            current: any,
            original: any,
            prefix: string = "data"
          ) => {
            if (typeof current !== typeof original) {
              structuredDataEdits.push({
                componentId: comp.id,
                field: prefix,
                originalValue: original,
                newValue: current,
              });
              return;
            }

            if (
              typeof current === "object" &&
              current !== null &&
              !Array.isArray(current)
            ) {
              const allKeys = new Set([
                ...Object.keys(current),
                ...Object.keys(original || {}),
              ]);
              for (const key of allKeys) {
                const fieldPath = `${prefix}.${key}`;
                if (
                  JSON.stringify(current[key]) !==
                  JSON.stringify(original?.[key])
                ) {
                  if (
                    typeof current[key] === "object" &&
                    current[key] !== null &&
                    !Array.isArray(current[key])
                  ) {
                    collectDataChanges(
                      current[key],
                      original?.[key] || {},
                      fieldPath
                    );
                  } else {
                    structuredDataEdits.push({
                      componentId: comp.id,
                      field: fieldPath,
                      originalValue: original?.[key],
                      newValue: current[key],
                    });
                  }
                }
              }
            } else if (Array.isArray(current)) {
              if (JSON.stringify(current) !== JSON.stringify(original)) {
                structuredDataEdits.push({
                  componentId: comp.id,
                  field: prefix,
                  originalValue: original,
                  newValue: current,
                });
              }
            } else if (current !== original) {
              structuredDataEdits.push({
                componentId: comp.id,
                field: prefix,
                originalValue: original,
                newValue: current,
              });
            }
          };

          collectDataChanges(comp.data, originalComp.data);
        }
      });

      const response = await fetch("/api/seo-editor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageKey,
          pageUrl,
          programmaticInstance,
          metadataEdits: metadataEdits.length > 0 ? metadataEdits : undefined,
          structuredDataEdits:
            structuredDataEdits.length > 0 ? structuredDataEdits : undefined,
        }),
      });

      const data = await response.json();

      setSaveResult({
        success: data.success,
        message:
          data.message ||
          (data.success ? "Saved successfully" : "Failed to save"),
      });

      if (data.success) {
        // Refresh data after save
        setTimeout(() => {
          fetchPageData();
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving SEO data:", error);
      setSaveResult({
        success: false,
        message: `Error saving: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateMetadataField = (path: string, value: any) => {
    const keys = path.split(".");
    setMetadata((prev) => {
      const newMetadata = { ...prev };
      let current: any = newMetadata;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }

      current[keys[keys.length - 1]] = value;
      return newMetadata;
    });
  };

  const updateStructuredDataField = (
    componentId: string,
    fieldPath: string,
    value: any
  ) => {
    setStructuredDataComponents((prev) =>
      prev.map((comp) => {
        if (comp.id === componentId) {
          const keys = fieldPath.split(".").filter((k) => k !== "data");
          const newData = { ...comp.data };
          let current: any = newData;

          for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!current[key]) {
              current[key] = {};
            }
            current = current[key];
          }

          current[keys[keys.length - 1]] = value;

          return { ...comp, data: newData };
        }
        return comp;
      })
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>SEO & Structured Data Editor</DialogTitle>
          <DialogDescription>
            Edit SEO metadata and structured data for this page
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-8 text-center">Loading page data...</div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex gap-2 border-b">
              <button
                onClick={() => setActiveTab("metadata")}
                className={`px-4 py-2 font-medium ${
                  activeTab === "metadata"
                    ? "border-primary text-primary border-b-2"
                    : "text-muted-foreground"
                }`}
              >
                SEO Metadata
              </button>
              <button
                onClick={() => setActiveTab("structured")}
                className={`px-4 py-2 font-medium ${
                  activeTab === "structured"
                    ? "border-primary text-primary border-b-2"
                    : "text-muted-foreground"
                }`}
              >
                Structured Data ({structuredDataComponents.length})
              </button>
            </div>

            {/* Metadata Tab */}
            {activeTab === "metadata" && (
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={metadata.title || ""}
                    onChange={(e) =>
                      updateMetadataField("title", e.target.value)
                    }
                    placeholder="Page title"
                  />
                  <p className="text-muted-foreground text-xs">
                    {metadata.title?.length || 0} / 60 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    value={metadata.description || ""}
                    onChange={(e) =>
                      updateMetadataField("description", e.target.value)
                    }
                    placeholder="Page description"
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    rows={3}
                  />
                  <p className="text-muted-foreground text-xs">
                    {metadata.description?.length || 0} / 155 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="canonical">Canonical URL</Label>
                  <Input
                    id="canonical"
                    value={metadata.canonical || ""}
                    onChange={(e) =>
                      updateMetadataField("canonical", e.target.value)
                    }
                    placeholder="/page-path"
                  />
                </div>

                {/* OpenGraph Section */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold">OpenGraph</h3>

                  <div className="space-y-2">
                    <Label htmlFor="og-title">OG Title</Label>
                    <Input
                      id="og-title"
                      value={metadata.openGraph?.title || ""}
                      onChange={(e) =>
                        updateMetadataField("openGraph.title", e.target.value)
                      }
                      placeholder="OpenGraph title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="og-description">OG Description</Label>
                    <textarea
                      id="og-description"
                      value={metadata.openGraph?.description || ""}
                      onChange={(e) =>
                        updateMetadataField(
                          "openGraph.description",
                          e.target.value
                        )
                      }
                      placeholder="OpenGraph description"
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      rows={3}
                    />
                  </div>

                  {metadata.openGraph?.images &&
                    metadata.openGraph.images.length > 0 && (
                      <div className="space-y-2">
                        <Label>OG Images</Label>
                        {metadata.openGraph.images.map((image, index) => (
                          <div
                            key={index}
                            className="space-y-2 rounded border p-3"
                          >
                            <Input
                              value={image.url}
                              onChange={(e) => {
                                const newImages = [
                                  ...(metadata.openGraph?.images || []),
                                ];
                                newImages[index] = {
                                  ...newImages[index],
                                  url: e.target.value,
                                };
                                updateMetadataField(
                                  "openGraph.images",
                                  newImages
                                );
                              }}
                              placeholder="Image URL"
                            />
                            <Input
                              value={image.alt}
                              onChange={(e) => {
                                const newImages = [
                                  ...(metadata.openGraph?.images || []),
                                ];
                                newImages[index] = {
                                  ...newImages[index],
                                  alt: e.target.value,
                                };
                                updateMetadataField(
                                  "openGraph.images",
                                  newImages
                                );
                              }}
                              placeholder="Image alt text"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                </div>

                {/* Twitter Section */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold">Twitter</h3>

                  <div className="space-y-2">
                    <Label htmlFor="twitter-title">Twitter Title</Label>
                    <Input
                      id="twitter-title"
                      value={metadata.twitter?.title || ""}
                      onChange={(e) =>
                        updateMetadataField("twitter.title", e.target.value)
                      }
                      placeholder="Twitter title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter-description">
                      Twitter Description
                    </Label>
                    <textarea
                      id="twitter-description"
                      value={metadata.twitter?.description || ""}
                      onChange={(e) =>
                        updateMetadataField(
                          "twitter.description",
                          e.target.value
                        )
                      }
                      placeholder="Twitter description"
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Structured Data Tab */}
            {activeTab === "structured" && (
              <div className="space-y-6 py-4">
                {structuredDataComponents.length === 0 ? (
                  <div className="text-muted-foreground py-8 text-center">
                    No structured data components found on this page
                  </div>
                ) : (
                  structuredDataComponents.map((component) => (
                    <div
                      key={component.id}
                      className="space-y-4 rounded-lg border p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">
                          {component.schemaType} ({component.id})
                        </h3>
                      </div>

                      {/* Render editable fields based on schema type */}
                      {component.schemaType === "organization" && (
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input
                            value={component.data?.name || ""}
                            onChange={(e) =>
                              updateStructuredDataField(
                                component.id,
                                "data.name",
                                e.target.value
                              )
                            }
                          />
                          <Label>Description</Label>
                          <textarea
                            value={component.data?.description || ""}
                            onChange={(e) =>
                              updateStructuredDataField(
                                component.id,
                                "data.description",
                                e.target.value
                              )
                            }
                            className="border-input bg-background flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm"
                            rows={3}
                          />
                        </div>
                      )}

                      {component.schemaType === "faq" && (
                        <div className="space-y-4">
                          {component.data?.items?.map(
                            (item: any, index: number) => (
                              <div key={index} className="rounded border p-3">
                                <Label>Question {index + 1}</Label>
                                <Input
                                  value={item.question || ""}
                                  onChange={(e) => {
                                    const newItems = [
                                      ...(component.data?.items || []),
                                    ];
                                    newItems[index] = {
                                      ...newItems[index],
                                      question: e.target.value,
                                    };
                                    updateStructuredDataField(
                                      component.id,
                                      "data.items",
                                      newItems
                                    );
                                  }}
                                />
                                <Label className="mt-2">
                                  Answer {index + 1}
                                </Label>
                                <textarea
                                  value={item.answer || ""}
                                  onChange={(e) => {
                                    const newItems = [
                                      ...(component.data?.items || []),
                                    ];
                                    newItems[index] = {
                                      ...newItems[index],
                                      answer: e.target.value,
                                    };
                                    updateStructuredDataField(
                                      component.id,
                                      "data.items",
                                      newItems
                                    );
                                  }}
                                  className="border-input bg-background mt-2 flex min-h-[60px] w-full rounded-md border px-3 py-2 text-sm"
                                  rows={2}
                                />
                              </div>
                            )
                          )}
                        </div>
                      )}

                      {/* Add more schema type handlers as needed */}
                      {!["organization", "faq"].includes(
                        component.schemaType
                      ) && (
                        <div className="text-muted-foreground text-sm">
                          Editing for {component.schemaType} schema type is not
                          yet implemented. The raw data structure is available
                          in the source file.
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Schema JSON-LD Tab */}
            {activeTab === "schema" && (
              <SchemaJSONLDTab
                components={structuredDataComponents}
                updateStructuredDataField={updateStructuredDataField}
                setSaveResult={setSaveResult}
              />
            )}

            {/* Save Result Message */}
            {saveResult && (
              <div
                className={`rounded p-3 ${
                  saveResult.success
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {saveResult.message}
              </div>
            )}
          </>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving || isLoading}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
