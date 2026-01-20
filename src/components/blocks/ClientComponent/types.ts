import { LucideIconName } from "@/lib/icon-utils";

export type CTAConfig = {
  label: string;
  href: string;
  icon?: LucideIconName;
  external?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "accent";
  className?: string;
  iconClassName?: string;
};

export interface ClientComponentProps {
  componentName: string;
  props?: Record<string, unknown>;
  serverData?: Record<string, unknown>;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
  titleContainerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  cta?: CTAConfig;
  _htmlProps?: Record<string, boolean>; // Metadata about which props contain HTML
}
