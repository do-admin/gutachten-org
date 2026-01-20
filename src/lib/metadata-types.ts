// Type definitions for the metadata structure
export interface PageMetadata {
  title: string;
  description: string;
  authors: Array<{ name: string }>;
  creator: string;
  publisher: string;
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    locale: string;
    type: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    url: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
}

export interface PageStructuredData {
  [key: string]: any;
}

export interface PageData {
  path: string;
  metadata: PageMetadata;
  structuredData: PageStructuredData;
}

export interface SiteConfig {
  client: {
    name: string;
    slug: string;
  };
  name: string;
  sitename: string;
  url: string;
  locale: string;
  defaultAuthor: string;
  defaultCreator: string;
  defaultPublisher: string;
  slug: string;
}

export interface MetadataFile {
  sites: {
    [siteId: string]: {
      site: SiteConfig;
      pages: {
        [key: string]: PageData;
      };
    };
  };
}

// Subpage metadata interface for defining metadata within subpage files
export interface SubpageMetadata {
  title: string;
  description: string;
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
  structuredData?: PageStructuredData;
}

// Enhanced subpage content interface that includes metadata
export interface SubpageContentWithMetadata {
  metadata: SubpageMetadata;
  components: any[]; // This will be the existing SubpageContent array
}
