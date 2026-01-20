import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FlexibleCardProps {
  // Content props
  title: string;
  description?: string;
  category?: string;
  icon?: LucideIcon;
  iconAriaLabel?: string;

  // List content
  keyPoints?: string[];
  keyPointsTitle?: string;

  // Action buttons
  primaryAction?: {
    href: string;
    label: string;
    external?: boolean;
    icon?: LucideIcon;
  };
  secondaryActions?: Array<{
    href: string;
    label: string;
    external?: boolean;
    icon?: LucideIcon;
  }>;

  // Styling props
  variant?: "default" | "primary" | "secondary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  cardClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;

  // Layout props
  showIcon?: boolean;
  showCategory?: boolean;
  showKeyPoints?: boolean;
  showActions?: boolean;
  fullHeight?: boolean;

  // Color customization
  iconColor?: "primary" | "secondary" | "accent" | "muted";
  categoryVariant?: "default" | "secondary" | "outline" | "destructive";
  primaryActionVariant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "accent";
  secondaryActionVariant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "accent";
}

const FlexibleCard: React.FC<FlexibleCardProps> = ({
  title,
  description,
  category,
  icon: Icon,
  iconAriaLabel,
  keyPoints = [],
  keyPointsTitle = "Kernpunkte:",
  primaryAction,
  secondaryActions = [],
  variant = "default",
  size = "md",
  className,
  cardClassName,
  headerClassName,
  contentClassName,
  footerClassName,
  showIcon = true,
  showCategory = true,
  showKeyPoints = true,
  showActions = true,
  fullHeight = true,
  iconColor = "primary",
  categoryVariant = "secondary",
  primaryActionVariant = "default",
  secondaryActionVariant = "outline",
}) => {
  // Variant-based styling
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "border-primary/20 bg-primary/5 hover:bg-primary/10";
      case "secondary":
        return "border-secondary/20 bg-secondary/5 hover:bg-secondary/10";
      case "accent":
        return "border-accent/20 bg-accent/5 hover:bg-accent/10";
      case "outline":
        return "border-2 border-muted-foreground/20 bg-transparent hover:bg-muted/5";
      default:
        return "shadow-medium hover:shadow-strong";
    }
  };

  // Size-based styling
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "p-4";
      case "lg":
        return "p-8";
      default:
        return "p-6";
    }
  };

  // Icon color classes
  const getIconColorClasses = () => {
    switch (iconColor) {
      case "primary":
        return "text-primary";
      case "secondary":
        return "text-secondary-foreground";
      case "accent":
        return "text-accent";
      case "muted":
        return "text-muted-foreground";
      default:
        return "text-primary";
    }
  };

  // Determine if the entire card should be clickable (only if there's a primaryAction and no secondaryActions)
  const isCardClickable = primaryAction && secondaryActions.length === 0;

  const cardContent = (
    <Card
      className={cn(
        "transition-smooth",
        fullHeight && "flex h-full flex-col",
        getVariantClasses(),
        isCardClickable && "cursor-pointer hover:shadow-lg",
        cardClassName
      )}
    >
      <CardHeader className={cn(headerClassName)}>
        <div className="flex items-start justify-between">
          <div
            className="flex-1"
            herokit-id="83aae8eb-3a25-4510-844c-c054da8f6725"
          >
            {(showIcon && Icon) || (showCategory && category) ? (
              <div
                className="mb-2 flex items-center"
                herokit-id="d7f7c969-7645-4a70-b224-7847a903167b"
              >
                {showIcon && Icon && (
                  <Icon
                    className={cn("mr-3 h-6 w-6", getIconColorClasses())}
                    aria-label={iconAriaLabel}
                  />
                )}
                {showCategory && category && (
                  <Badge
                    variant={categoryVariant}
                    herokit-id="14db1563-4605-482b-81b2-9fe8d4990052"
                  >
                    {category}
                  </Badge>
                )}
              </div>
            ) : null}
            <CardTitle
              className={cn(
                size === "sm"
                  ? "text-lg"
                  : size === "lg"
                    ? "text-2xl"
                    : "text-xl",
                "mb-2"
              )}
              herokit-id="33a5ef60-4642-4177-aac6-17a05d6edd9d"
            >
              {title}
            </CardTitle>
            {description && (
              <CardDescription herokit-id="64d6396f-d256-42dc-b798-612ed72f88dc">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent
        className={cn("flex flex-1 flex-col", contentClassName)}
        herokit-id="ac6e8932-84eb-443e-922f-32a4bee59a1b"
      >
        {showKeyPoints && keyPoints.length > 0 && (
          <div className="mb-4">
            <h4
              className="mb-3 text-sm font-semibold"
              herokit-id="d7165925-5daf-4b1b-8d04-a2c07eb40088"
            >
              {keyPointsTitle}
            </h4>
            <ul className="space-y-2">
              {keyPoints.map((point, pointIndex) => (
                <li
                  key={pointIndex}
                  className="text-muted-foreground flex items-start text-sm"
                  herokit-id="86923488-692f-48ed-99e4-6cb498549073"
                >
                  <span
                    className={cn(
                      "mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full",
                      iconColor === "primary"
                        ? "bg-primary"
                        : iconColor === "secondary"
                          ? "bg-secondary-foreground"
                          : iconColor === "accent"
                            ? "bg-accent"
                            : "bg-muted-foreground"
                    )}
                  ></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {showActions && (primaryAction || secondaryActions.length > 0) && (
          <div
            className="mt-auto flex flex-col gap-3"
            herokit-id="69550fff-e504-4975-8362-d475d56e2ee8"
          >
            {secondaryActions.length > 0 && (
              <div
                className="flex flex-col gap-2"
                herokit-id="50ae265b-563b-4ca4-abb9-6c27c28e9edf"
              >
                {secondaryActions.map((action, index) => {
                  const ActionIcon = action.icon;
                  return (
                    <Button
                      key={index}
                      asChild
                      variant={secondaryActionVariant}
                      size={size === "sm" ? "sm" : "default"}
                    >
                      <Link
                        href={action.href}
                        target={action.external ? "_blank" : undefined}
                        rel={
                          action.external ? "noopener noreferrer" : undefined
                        }
                        herokit-id="c0e17fdd-ba6d-4012-bf9a-928930a8fb69"
                      >
                        {ActionIcon && <ActionIcon className="mr-2 h-4 w-4" />}
                        {action.label}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            )}

            {primaryAction && (
              <div onClick={(e) => isCardClickable && e.stopPropagation()}>
                {isCardClickable ? (
                  <div
                    className={cn(
                      "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      primaryActionVariant === "outline"
                        ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                        : primaryActionVariant === "secondary"
                          ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          : primaryActionVariant === "accent"
                            ? "bg-accent text-accent-foreground hover:bg-accent/90"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                    role="button"
                    aria-label={primaryAction.label}
                  >
                    {primaryAction.icon ? (
                      <primaryAction.icon className="mr-2 h-4 w-4" />
                    ) : primaryAction.external ? (
                      <ExternalLink className="mr-2 h-4 w-4" />
                    ) : null}
                    {primaryAction.label}
                  </div>
                ) : (
                  <Button
                    asChild
                    variant={primaryActionVariant}
                    size={size === "sm" ? "sm" : "default"}
                  >
                    <Link
                      href={primaryAction.href}
                      target={primaryAction.external ? "_blank" : undefined}
                      rel={
                        primaryAction.external ? "noopener noreferrer" : undefined
                      }
                      herokit-id="6803ba12-0a45-4983-8e8c-9006393cea7f"
                    >
                      {primaryAction.icon ? (
                        <primaryAction.icon className="mr-2 h-4 w-4" />
                      ) : primaryAction.external ? (
                        <ExternalLink className="mr-2 h-4 w-4" />
                      ) : null}
                      {primaryAction.label}
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Wrap card in Link if it's clickable
  if (isCardClickable && primaryAction) {
    return (
      <Link
        href={primaryAction.href}
        target={primaryAction.external ? "_blank" : undefined}
        rel={primaryAction.external ? "noopener noreferrer" : undefined}
        className="block"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default FlexibleCard;
