// Shared navigation types used across the application

export interface NavigationItem {
  name: string;
  href: string;
  section: string;
  children?: NavigationItem[];
  external?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export interface NavigationConfig {
  main: NavigationItem[];
  legal: NavigationItem[];
}

// Utility type for navigation with dropdown support
export interface NavigationWithDropdowns extends NavigationItem {
  children?: NavigationItem[];
}
