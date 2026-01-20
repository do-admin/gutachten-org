import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/blocks/Heading/Heading";
import { DynamicIcon } from "@/lib/icon-utils";

export interface StepsBlockStepItem {
  stepNumber: number;
  icon: string;
  title: string;
  description: string;
  badgeText?: string;
  badgeClassName?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  className?: string;
}

export interface StepsBlockSubtitleLine {
  text: string;
  className?: string;
}

export interface StepsBlockCTAButton {
  text: string;
  href: string;
  icon?: string;
  variant?:
    | "outline"
    | "secondary"
    | "default"
    | "destructive"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export interface StepsBlockProps {
  title: string;
  subtitles?: StepsBlockSubtitleLine[];
  steps: StepsBlockStepItem[];
  ctaButton?: StepsBlockCTAButton;
  backgroundColor?: string;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  cardClassName?: string;
  iconSize?: "sm" | "md" | "lg";
}

export const Steps: React.FC<StepsBlockProps> = ({
  title,
  subtitles = [],
  steps,
  ctaButton,
  backgroundColor = "bg-white",
  className = "",
  columns = 3,
  cardClassName = "",
  iconSize = "md",
}) => {
  const renderDescriptionWithHighlights = (step: StepsBlockStepItem) => {
    if (!step.highlightWords || step.highlightWords.length === 0) {
      return step.description;
    }

    const text = step.description;
    const highlightClassName =
      step.highlightClassName || "text-accent font-semibold";

    // Create a more robust regex pattern that preserves word boundaries and spaces
    const escapedWords = step.highlightWords.map((word) =>
      word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );

    // Use a regex that captures the entire match including surrounding context
    const highlightPattern = new RegExp(`(${escapedWords.join("|")})`, "gi");

    // Find all matches with their positions
    const matches: Array<{
      text: string;
      start: number;
      end: number;
      originalWord: string;
    }> = [];
    let match: RegExpExecArray | null;

    while ((match = highlightPattern.exec(text)) !== null) {
      const originalWord = step.highlightWords.find(
        (word) => word.toLowerCase() === match![1].toLowerCase()
      );

      if (originalWord) {
        matches.push({
          text: match[1],
          start: match.index,
          end: match.index + match[1].length,
          originalWord,
        });
      }
    }

    // Sort matches by position (descending) to avoid index shifting issues
    matches.sort((a, b) => b.start - a.start);

    // Build the result by replacing matches from end to start
    let result = text;
    const elements: Array<{ content: React.ReactNode; key: number }> = [];
    let keyCounter = 0;

    matches.forEach((match) => {
      const before = result.substring(0, match.start);
      const after = result.substring(match.end);

      result = before + `__HIGHLIGHT_${keyCounter}__` + after;

      elements.push({
        content: (
          <span
            key={keyCounter}
            className={highlightClassName}
            herokit-id="cb181618-915d-438e-93b6-3fd343001b57"
          >
            {match.text}
          </span>
        ),
        key: keyCounter,
      });

      keyCounter++;
    });

    // Split by placeholder and reconstruct with React elements
    const parts = result.split(/(__HIGHLIGHT_\d+__)/);

    return parts.map((part, index) => {
      const highlightMatch = part.match(/__HIGHLIGHT_(\d+)__/);
      if (highlightMatch) {
        const highlightIndex = parseInt(highlightMatch[1]);
        return (
          elements.find((el) => el.key === highlightIndex)?.content || part
        );
      }
      return part;
    });
  };
  const getGridCols = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-3";
    }
  };

  const getIconSize = () => {
    switch (iconSize) {
      case "sm":
        return "h-6 w-6";
      case "md":
        return "h-8 w-8";
      case "lg":
        return "h-10 w-10";
      default:
        return "h-8 w-8";
    }
  };

  const getIconContainerSize = () => {
    switch (iconSize) {
      case "sm":
        return "w-12 h-12";
      case "md":
        return "w-16 h-16";
      case "lg":
        return "w-20 h-20";
      default:
        return "w-16 h-16";
    }
  };

  return (
    <section className={`section-padding ${backgroundColor} ${className}`}>
      <div className="container">
        <div
          className="mx-auto max-w-6xl"
          herokit-id="aa61788d-73c2-4da6-9d9a-ccb36c181da0"
        >
          <div
            className="mb-12 text-center"
            herokit-id="e784ee67-e087-4903-ac69-a94d68a91c5e"
          >
            <Heading
              level={2}
              underline={true}
              herokit-id="8508a408-f100-4deb-8b26-c65ce2f04032"
            >
              {title}
            </Heading>
            {subtitles.map((subtitle, index) => (
              <p
                key={index}
                className={subtitle.className || "text-muted-foreground"}
                herokit-id="d9a21b29-1c6b-48fa-bfd2-38e979bf4236"
              >
                {subtitle.text}
              </p>
            ))}
          </div>

          <div
            className={`grid ${getGridCols()} gap-8`}
            herokit-id="a224f734-b9c1-438b-9a39-cef0030dd471"
          >
            {steps.map((step, index) => (
              <Card
                key={index}
                className={`shadow-medium hover:shadow-strong transition-smooth ${step.className}`}
              >
                <CardContent
                  className="p-8 text-center"
                  herokit-id="dea23670-6a03-4cfd-889e-831abb78645e"
                >
                  {step.badgeText && (
                    <div className="mb-4">
                      <span
                        className={`bg-accent text-accent-foreground inline-block rounded-full px-3 py-1 text-sm font-semibold ${step.badgeClassName || ""}`}
                        herokit-id="00d6caa3-641c-4487-8135-6d6d1d699df9"
                      >
                        {step.badgeText}
                      </span>
                    </div>
                  )}

                  <div
                    className={`${getIconContainerSize()} bg-accent/10 mx-auto mb-4 flex items-center justify-center rounded-full`}
                  >
                    <DynamicIcon
                      name={step.icon}
                      className={`${getIconSize()} text-accent`}
                    />
                  </div>

                  <h3
                    className="font-heading mb-4 text-xl font-bold"
                    herokit-id="d68d9152-23c3-4d9b-ac42-c6fa14276d8f"
                  >
                    {step.title}
                  </h3>

                  <p
                    className="text-muted-foreground"
                    herokit-id="e6be285a-b6bc-4d1b-856f-3508ac7784a5"
                  >
                    {renderDescriptionWithHighlights(step)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {ctaButton && (
            <div className="mt-12 text-center">
              <Button
                asChild
                variant={ctaButton.variant || "default"}
                size={ctaButton.size || "lg"}
              >
                <Link
                  href={ctaButton.href}
                  herokit-id="6107bf6d-4036-43e4-9110-dcda5b3ab913"
                >
                  {ctaButton.icon && (
                    <DynamicIcon
                      name={ctaButton.icon}
                      className="mr-2 h-5 w-5"
                    />
                  )}
                  {ctaButton.text}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Steps;
