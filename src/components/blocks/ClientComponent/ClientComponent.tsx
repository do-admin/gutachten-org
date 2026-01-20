"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import ClientComponentRegistryService from "@/lib/client-component-registry";
import type { ClientComponentProps } from "./types";
import { Heading } from "@/components/blocks/Heading/Heading";
import { Button } from "@/components/ui/button";
import { DynamicIcon, LucideIconName } from "@/lib/icon-utils";
import { cn } from "@/lib/utils";
import { SafeHtml } from "@/lib/safe-html-renderer";

const ClientComponent: React.FC<ClientComponentProps> = ({
  componentName,
  props = {},
  serverData = {},
  className = "",
  id,
  title,
  subtitle,
  titleContainerClassName,
  titleClassName,
  subtitleClassName,
  cta,
  _htmlProps,
}) => {
  // Get the client component from the registry
  const ClientComponentToRender =
    ClientComponentRegistryService.getComponent(componentName);

  if (!ClientComponentToRender) {
    console.error(`Client component "${componentName}" not found in registry`);
    return (
      <div
        className={`rounded-lg border border-red-300 bg-red-50 p-4 ${className}`}
      >
        <p
          className="text-red-600"
          herokit-id="2167dede-8c41-4e9b-bea7-06038c3c0316"
        >
          Error: Client component "{componentName}" not found in registry.
        </p>
        <p
          className="mt-2 text-sm text-red-500"
          herokit-id="c1c92312-f6ee-47c2-b669-0ce894b42f7f"
        >
          Available components:{" "}
          {ClientComponentRegistryService.getAllComponents()
            .map((c) => c.name)
            .join(", ")}
        </p>
      </div>
    );
  }

  // Merge server data with props, including title and subtitle
  const mergedProps = {
    ...props,
    ...serverData,
    ...(title !== undefined && { title }),
    ...(subtitle !== undefined && { subtitle }),
  };

  const CTAIconName: LucideIconName | null =
    (cta?.icon as LucideIconName | undefined) ?? "ArrowUpRight";

  return (
    <div
      id={id}
      className={cn("!space-y-16", className)}
      herokit-id="26e188e1-db72-4b02-a388-02d2cf2f6fb5"
    >
      {(title || subtitle) && (
        <div
          className={cn("space-y-10 text-center", titleContainerClassName)}
          herokit-id="4570923c-1513-4f96-b046-756ef81da563"
        >
          {title && (
            <Heading
              level={2}
              className={cn(
                "justify-start text-center text-3xl leading-10 font-medium text-[#273238]",
                titleClassName
              )}
              herokit-id="1a4c7e5c-30d0-41c3-b07e-dc42f01ce216"
            >
              {title}
            </Heading>
          )}
          {subtitle &&
            (_htmlProps?.subtitle ? (
              <SafeHtml
                content={subtitle}
                tag="p"
                className={cn(
                  "mx-auto max-w-2xl text-base text-[#515A5F]",
                  subtitleClassName
                )}
                herokit-id="1393163b-7259-4fa5-876e-805cc6756d85"
              />
            ) : (
              <p
                className={cn(
                  "mx-auto max-w-2xl text-base text-[#515A5F]",
                  subtitleClassName
                )}
                herokit-id="1393163b-7259-4fa5-876e-805cc6756d85"
              >
                {subtitle}
              </p>
            ))}
        </div>
      )}

      <Suspense
        fallback={
          <div className="flex items-center justify-center p-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
            <span
              className="ml-2 text-gray-600"
              herokit-id="2ba75ddc-e99f-44bb-af21-ab61091bfc52"
            >
              Loading {componentName}...
            </span>
          </div>
        }
      >
        <ClientComponentToRender {...mergedProps} />
      </Suspense>
      <div
        className="flex justify-center"
        herokit-id="ac8f2a33-9573-4df6-a5d4-beeb10a73bc3"
      >
        {cta && (
          <Button
            asChild
            variant={cta.variant || "default"}
            className={cn(
              "inline-flex items-center justify-start gap-2 rounded-[8px] px-6 py-6 text-sm font-semibold",
              "gap-6 bg-slate-900 text-white hover:bg-slate-900/90",
              cta.className
            )}
          >
            <Link
              href={cta.href}
              target={cta.external ? "_blank" : undefined}
              rel={cta.external ? "noopener noreferrer" : undefined}
              herokit-id="d4f2c711-2e83-4c26-865d-eac089ab2848"
            >
              {cta.label}
              {CTAIconName && (
                <DynamicIcon
                  name={CTAIconName}
                  className={cn("h-3 w-3", cta.iconClassName)}
                  aria-hidden="true"
                />
              )}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ClientComponent;
