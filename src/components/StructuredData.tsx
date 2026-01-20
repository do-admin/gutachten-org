import Script from "next/script";

// Helper to normalize date strings to full ISO 8601 with timezone (for schema.org)
// Ensures values like "2020-01-01" become "2020-01-01T00:00:00.000Z"
// while leaving already valid ISO datetimes untouched.
function normalizeDateTime(dateString?: string): string | undefined {
  if (!dateString) return undefined;

  const trimmed = dateString.trim();
  if (!trimmed) return undefined;

  // If the string already looks like a full ISO datetime with timezone, keep it as-is
  if (/T.*(Z|[+-]\d{2}:\d{2})$/u.test(trimmed)) {
    return trimmed;
  }

  const timestamp = Date.parse(trimmed);
  if (Number.isNaN(timestamp)) {
    // Fall back to original value if parsing fails
    return trimmed;
  }

  return new Date(timestamp).toISOString();
}

// Base interfaces for common properties
interface ContactPoint {
  telephone?: string;
  email?: string;
  contactType?: string;
}

interface PostalAddress {
  addressCountry?: string;
  addressRegion?: string;
  addressLocality?: string;
  postalCode?: string;
  streetAddress?: string;
}

interface ImageObject {
  url: string;
  width?: number;
  height?: number;
}

interface Organization {
  name: string;
  logo?: ImageObject;
  url?: string;
}

interface MonetaryAmount {
  currency: string;
  value: string | number;
}

interface BreadcrumbItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string; // Optional - last item doesn't need item
}

interface BreadcrumbData {
  itemListElement: BreadcrumbItem[];
}

// Specific interfaces for each structured data type
interface OrganizationData {
  name: string;
  alternateName?: string;
  legalName?: string;
  description: string;
  url: string;
  logo?: string;
  image?:
    | string
    | string[]
    | Array<{
        "@type"?: string;
        url: string;
        width?: number;
        height?: number;
      }>;
  sameAs?: string[];
  address?: PostalAddress;
  legalAddress?: PostalAddress;
  contactPoint?: ContactPoint;
  email?: string;
  telephone?: string;
  faxNumber?: string;
  areaServed?: {
    "@type"?: string;
    name: string;
  };
  serviceArea?: {
    "@type"?: string;
    name?: string;
    geoMidpoint?: {
      "@type": string;
      latitude: string;
      longitude: string;
    };
    geoRadius?: string;
  };
  location?: PostalAddress | string;
  foundingDate?: string;
  foundingLocation?: {
    "@type"?: string;
    name?: string;
    address?: PostalAddress;
  };
  founder?:
    | {
        "@type"?: string;
        name: string;
        url?: string;
      }
    | Array<{
        "@type"?: string;
        name: string;
        url?: string;
      }>;
  mission?: string;
  slogan?: string;
  priceRange?: string;
  taxID?: string;
  vatID?: string;
  duns?: string;
  leiCode?: string;
  companyRegistration?: {
    "@type"?: string;
    name?: string;
    identifier?: string;
  };
  parentOrganization?: {
    "@type"?: string;
    name: string;
    url?: string;
  };
  subOrganization?: Array<{
    "@type"?: string;
    name: string;
    url?: string;
  }>;
  brand?: {
    "@type"?: string;
    name: string;
    logo?: string;
  };
  aggregateRating?: {
    "@type"?: string;
    ratingValue: string | number;
    bestRating?: string | number;
    worstRating?: string | number;
    ratingCount?: number;
  };
  award?: string | string[];
  knowsAbout?: string | string[];
  knowsLanguage?: string | string[];
  hasOfferCatalog?: {
    "@type": string;
    name: string;
    itemListElement: Array<{
      "@type": string;
      itemOffered: {
        "@type": string;
        name: string;
        description: string;
      };
    }>;
  };
}

interface WebsiteData {
  name: string;
  url: string;
  description?: string;
  inLanguage?: string;
  publisher?: Organization;
  potentialAction?: {
    "@type": string;
    target: {
      "@type": string;
      urlTemplate: string;
    };
    "query-input": string;
  };
}

interface ArticleData {
  headline: string;
  description?: string;
  image?:
    | string
    | string[]
    | Array<{
        "@type"?: string;
        url: string;
        width?: number;
        height?: number;
      }>;
  author?:
    | Organization
    | {
        "@type"?: string;
        name: string;
        url?: string;
        image?: string;
      };
  publisher?: Organization;
  datePublished?: string;
  dateModified?: string;
  articleSection?: string | string[];
  url?: string;
  breadcrumb?: BreadcrumbItem[];
  inLanguage?: string;
  wordCount?: number;
  articleBody?: string;
  keywords?: string | string[];
  commentCount?: number;
  articleType?: "Article" | "BlogPosting" | "NewsArticle";
  mainEntityOfPage?:
    | {
        "@type"?: string;
        "@id"?: string;
      }
    | string;
}

interface DonationData {
  name: string;
  description: string;
  url: string;
  organization?: Organization;
  donationAmount?: MonetaryAmount;
}

interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

interface FAQPageData {
  items: FAQItem[];
  url?: string;
  name?: string;
}

// New interfaces for educational content
interface CourseData {
  name: string;
  description: string;
  provider: {
    name: string;
    url?: string;
    type?: "Person" | "Organization";
  };
  courseCode?: string;
  educationalLevel?: string;
  inLanguage?: string;
  teaches?: string[];
  learningResourceType?: string;
  timeRequired?: string; // ISO 8601 Duration format (e.g., 'PT2H30M')
  numberOfCredits?: number;
  isAccessibleForFree?: boolean;
  url: string;
  courseInstance?: {
    courseMode: string;
    courseWorkload?: string;
  };
}

interface LearningResourceData {
  name: string;
  description: string;
  learningResourceType: string;
  educationalUse?: string;
  typicalAgeRange?: string;
  timeRequired?: string; // ISO 8601 Duration format (e.g., 'PT2H30M')
  inLanguage?: string;
  teaches?: string[];
  author: {
    name: string;
    type?: "Person" | "Organization";
    url?: string;
  };
  url: string;
  isAccessibleForFree?: boolean;
  interactivityType?: "active" | "expositive" | "mixed";
  educationalLevel?: string;
}

type FAQData = FAQItem[] | FAQPageData;

// Union type for all possible data types
type StructuredDataType =
  | OrganizationData
  | WebsiteData
  | ArticleData
  | DonationData
  | CourseData
  | LearningResourceData
  | FAQData
  | BreadcrumbData;

export interface StructuredDataProps {
  type?:
    | "organization"
    | "website"
    | "article"
    | "donation"
    | "faq"
    | "course"
    | "learningResource"
    | "breadcrumb";
  schemaType?:
    | "organization"
    | "website"
    | "article"
    | "donation"
    | "faq"
    | "course"
    | "learningResource"
    | "breadcrumb";
  data: StructuredDataType;
}

export const StructuredData = ({
  type,
  schemaType,
  data,
}: StructuredDataProps) => {
  // Support both 'type' and 'schemaType' props for backwards compatibility
  const schemaTypeToUse = schemaType || type || "organization";

  const getStructuredData = () => {
    switch (schemaTypeToUse) {
      case "organization": {
        const orgData = data as OrganizationData;
        // Normalize image field (string, array of strings, or ImageObjects)
        let orgImageValue: any = undefined;
        if (orgData.image) {
          if (typeof orgData.image === "string") {
            orgImageValue = orgData.image;
          } else if (Array.isArray(orgData.image)) {
            orgImageValue = orgData.image.map((img) =>
              typeof img === "string"
                ? img
                : {
                    "@type": img["@type"] || "ImageObject",
                    url: img.url,
                    ...(img.width && { width: img.width }),
                    ...(img.height && { height: img.height }),
                  }
            );
          }
        }

        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: orgData.name,
          ...(orgData.alternateName && {
            alternateName: orgData.alternateName,
          }),
          ...(orgData.legalName && { legalName: orgData.legalName }),
          description: orgData.description,
          url: orgData.url,
          ...(orgData.logo && { logo: orgData.logo }),
          ...(orgImageValue && { image: orgImageValue }),
          ...(orgData.sameAs && { sameAs: orgData.sameAs }),
          ...(orgData.address && {
            address: {
              "@type": "PostalAddress",
              ...orgData.address,
            },
          }),
          ...(orgData.legalAddress && {
            legalAddress: {
              "@type": "PostalAddress",
              ...orgData.legalAddress,
            },
          }),
          ...(orgData.contactPoint && {
            contactPoint: {
              "@type": "ContactPoint",
              ...orgData.contactPoint,
            },
          }),
          ...(orgData.email && { email: orgData.email }),
          ...(orgData.telephone && { telephone: orgData.telephone }),
          ...(orgData.faxNumber && { faxNumber: orgData.faxNumber }),
          ...(orgData.areaServed && {
            areaServed: {
              "@type": orgData.areaServed["@type"] || "City",
              name: orgData.areaServed.name,
            },
          }),
          ...(orgData.serviceArea && {
            serviceArea: orgData.serviceArea["@type"]
              ? orgData.serviceArea
              : {
                  "@type": "State",
                  name: orgData.serviceArea.name,
                },
          }),
          ...(orgData.location && {
            location:
              typeof orgData.location === "string"
                ? orgData.location
                : {
                    "@type": "PostalAddress",
                    ...orgData.location,
                  },
          }),
          ...(orgData.foundingDate && { foundingDate: orgData.foundingDate }),
          ...(orgData.foundingLocation && {
            foundingLocation: orgData.foundingLocation["@type"]
              ? orgData.foundingLocation
              : {
                  "@type": "Place",
                  ...(orgData.foundingLocation.name && {
                    name: orgData.foundingLocation.name,
                  }),
                  ...(orgData.foundingLocation.address && {
                    address: {
                      "@type": "PostalAddress",
                      ...orgData.foundingLocation.address,
                    },
                  }),
                },
          }),
          ...(orgData.founder && {
            founder: Array.isArray(orgData.founder)
              ? orgData.founder.map((f) => ({
                  "@type": f["@type"] || "Person",
                  name: f.name,
                  ...(f.url && { url: f.url }),
                }))
              : {
                  "@type": orgData.founder["@type"] || "Person",
                  name: orgData.founder.name,
                  ...(orgData.founder.url && { url: orgData.founder.url }),
                },
          }),
          ...(orgData.mission && { mission: orgData.mission }),
          ...(orgData.slogan && { slogan: orgData.slogan }),
          ...(orgData.priceRange && { priceRange: orgData.priceRange }),
          ...(orgData.taxID && { taxID: orgData.taxID }),
          ...(orgData.vatID && { vatID: orgData.vatID }),
          ...(orgData.duns && { duns: orgData.duns }),
          ...(orgData.leiCode && { leiCode: orgData.leiCode }),
          ...(orgData.companyRegistration && {
            companyRegistration: {
              "@type": orgData.companyRegistration["@type"] || "Certification",
              ...(orgData.companyRegistration.name && {
                name: orgData.companyRegistration.name,
              }),
              ...(orgData.companyRegistration.identifier && {
                identifier: orgData.companyRegistration.identifier,
              }),
            },
          }),
          ...(orgData.parentOrganization && {
            parentOrganization: {
              "@type": orgData.parentOrganization["@type"] || "Organization",
              name: orgData.parentOrganization.name,
              ...(orgData.parentOrganization.url && {
                url: orgData.parentOrganization.url,
              }),
            },
          }),
          ...(orgData.subOrganization && {
            subOrganization: orgData.subOrganization.map((sub) => ({
              "@type": sub["@type"] || "Organization",
              name: sub.name,
              ...(sub.url && { url: sub.url }),
            })),
          }),
          ...(orgData.brand && {
            brand: {
              "@type": orgData.brand["@type"] || "Brand",
              name: orgData.brand.name,
              ...(orgData.brand.logo && { logo: orgData.brand.logo }),
            },
          }),
          ...(orgData.aggregateRating && {
            aggregateRating: {
              "@type": orgData.aggregateRating["@type"] || "AggregateRating",
              ratingValue: orgData.aggregateRating.ratingValue,
              ...(orgData.aggregateRating.bestRating && {
                bestRating: orgData.aggregateRating.bestRating,
              }),
              ...(orgData.aggregateRating.worstRating && {
                worstRating: orgData.aggregateRating.worstRating,
              }),
              ...(orgData.aggregateRating.ratingCount && {
                ratingCount: orgData.aggregateRating.ratingCount,
              }),
            },
          }),
          ...(orgData.award && {
            award: Array.isArray(orgData.award) ? orgData.award : orgData.award,
          }),
          ...(orgData.knowsAbout && {
            knowsAbout: Array.isArray(orgData.knowsAbout)
              ? orgData.knowsAbout
              : orgData.knowsAbout,
          }),
          ...(orgData.knowsLanguage && {
            knowsLanguage: Array.isArray(orgData.knowsLanguage)
              ? orgData.knowsLanguage
              : orgData.knowsLanguage,
          }),
          ...(orgData.hasOfferCatalog && {
            hasOfferCatalog: orgData.hasOfferCatalog,
          }),
        };
      }

      case "website": {
        const websiteData = data as WebsiteData;
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: websiteData.name,
          url: websiteData.url,
          ...(websiteData.description && {
            description: websiteData.description,
          }),
          ...(websiteData.inLanguage && {
            inLanguage: websiteData.inLanguage,
          }),
          ...(websiteData.publisher && {
            publisher: {
              "@type": "Organization",
              ...websiteData.publisher,
            },
          }),
          ...(websiteData.potentialAction && {
            potentialAction: websiteData.potentialAction,
          }),
        };
      }

      case "article": {
        const articleData = data as ArticleData;
        const articleType = articleData.articleType || "Article";

        // Handle image - can be string, array of strings, or array of ImageObjects
        let imageValue: any = undefined;
        if (articleData.image) {
          if (typeof articleData.image === "string") {
            imageValue = articleData.image;
          } else if (Array.isArray(articleData.image)) {
            imageValue = articleData.image.map((img) =>
              typeof img === "string"
                ? img
                : {
                    "@type": img["@type"] || "ImageObject",
                    url: img.url,
                    ...(img.width && { width: img.width }),
                    ...(img.height && { height: img.height }),
                  }
            );
          }
        }

        // Handle author - can be Organization or Person
        let authorValue: any = undefined;
        if (articleData.author) {
          if ("name" in articleData.author) {
            authorValue = {
              "@type": articleData.author["@type"] || "Person",
              name: articleData.author.name,
              ...(articleData.author.url && { url: articleData.author.url }),
              ...(articleData.author.image && {
                image: articleData.author.image,
              }),
            };
          } else {
            authorValue = {
              "@type": "Organization",
              ...articleData.author,
            };
          }
        }

        const normalizedDatePublished = normalizeDateTime(
          articleData.datePublished
        );
        const normalizedDateModified = normalizeDateTime(
          articleData.dateModified
        );

        return {
          "@context": "https://schema.org",
          "@type": articleType,
          headline: articleData.headline,
          ...(articleData.description && {
            description: articleData.description,
          }),
          ...(imageValue && { image: imageValue }),
          ...(authorValue && { author: authorValue }),
          ...(articleData.publisher && {
            publisher: {
              "@type": "Organization",
              ...articleData.publisher,
            },
          }),
          ...(normalizedDatePublished && {
            datePublished: normalizedDatePublished,
          }),
          ...(normalizedDateModified && {
            dateModified: normalizedDateModified,
          }),
          ...(articleData.articleSection && {
            articleSection: Array.isArray(articleData.articleSection)
              ? articleData.articleSection
              : articleData.articleSection,
          }),
          ...(articleData.inLanguage && { inLanguage: articleData.inLanguage }),
          ...(articleData.wordCount && { wordCount: articleData.wordCount }),
          ...(articleData.articleBody && {
            articleBody: articleData.articleBody,
          }),
          ...(articleData.keywords && {
            keywords: Array.isArray(articleData.keywords)
              ? articleData.keywords.join(", ")
              : articleData.keywords,
          }),
          ...(articleData.commentCount !== undefined && {
            commentCount: articleData.commentCount,
          }),
          ...(articleData.mainEntityOfPage && {
            mainEntityOfPage:
              typeof articleData.mainEntityOfPage === "string"
                ? {
                    "@type": "WebPage",
                    "@id": articleData.mainEntityOfPage,
                  }
                : {
                    "@type": articleData.mainEntityOfPage["@type"] || "WebPage",
                    ...(articleData.mainEntityOfPage["@id"] && {
                      "@id": articleData.mainEntityOfPage["@id"],
                    }),
                  },
          }),
          ...(articleData.url &&
            !articleData.mainEntityOfPage && {
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": articleData.url,
              },
            }),
          ...(articleData.breadcrumb && {
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: articleData.breadcrumb,
            },
          }),
        };
      }

      case "donation": {
        const donationData = data as DonationData;
        return {
          "@context": "https://schema.org",
          "@type": "DonationPage",
          name: donationData.name,
          description: donationData.description,
          url: donationData.url,
          ...(donationData.organization && {
            organization: {
              "@type": "NonProfit",
              ...donationData.organization,
            },
          }),
          ...(donationData.donationAmount && {
            donationAmount: {
              "@type": "MonetaryAmount",
              ...donationData.donationAmount,
            },
          }),
        };
      }

      case "faq": {
        const faqData = data as FAQData;
        const items = Array.isArray(faqData) ? faqData : faqData.items;
        const url = !Array.isArray(faqData) ? faqData.url : undefined;
        const name = !Array.isArray(faqData) ? faqData.name : undefined;

        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          ...(url && { url }),
          ...(name && { name }),
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        };
      }

      case "course": {
        const courseData = data as CourseData;
        return {
          "@context": "https://schema.org",
          "@type": "Course",
          name: courseData.name,
          description: courseData.description,
          provider: {
            "@type": courseData.provider.type || "Person",
            name: courseData.provider.name,
            ...(courseData.provider.url && { url: courseData.provider.url }),
          },
          ...(courseData.courseCode && { courseCode: courseData.courseCode }),
          ...(courseData.educationalLevel && {
            educationalLevel: courseData.educationalLevel,
          }),
          ...(courseData.inLanguage && { inLanguage: courseData.inLanguage }),
          ...(courseData.teaches && { teaches: courseData.teaches }),
          ...(courseData.learningResourceType && {
            learningResourceType: courseData.learningResourceType,
          }),
          ...(courseData.timeRequired && {
            timeRequired: courseData.timeRequired,
          }),
          ...(courseData.numberOfCredits !== undefined && {
            numberOfCredits: courseData.numberOfCredits,
          }),
          ...(courseData.isAccessibleForFree !== undefined && {
            isAccessibleForFree: courseData.isAccessibleForFree,
          }),
          url: courseData.url,
          ...(courseData.courseInstance && {
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: courseData.courseInstance.courseMode,
              ...(courseData.courseInstance.courseWorkload && {
                courseWorkload: courseData.courseInstance.courseWorkload,
              }),
            },
          }),
        };
      }

      case "learningResource": {
        const learningData = data as LearningResourceData;
        return {
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: learningData.name,
          description: learningData.description,
          learningResourceType: learningData.learningResourceType,
          ...(learningData.educationalUse && {
            educationalUse: learningData.educationalUse,
          }),
          ...(learningData.typicalAgeRange && {
            typicalAgeRange: learningData.typicalAgeRange,
          }),
          ...(learningData.timeRequired && {
            timeRequired: learningData.timeRequired,
          }),
          ...(learningData.inLanguage && {
            inLanguage: learningData.inLanguage,
          }),
          ...(learningData.teaches && { teaches: learningData.teaches }),
          author: {
            "@type": learningData.author.type || "Person",
            name: learningData.author.name,
            ...(learningData.author.url && { url: learningData.author.url }),
          },
          url: learningData.url,
          ...(learningData.isAccessibleForFree !== undefined && {
            isAccessibleForFree: learningData.isAccessibleForFree,
          }),
          ...(learningData.interactivityType && {
            interactivityType: learningData.interactivityType,
          }),
          ...(learningData.educationalLevel && {
            educationalLevel: learningData.educationalLevel,
          }),
        };
      }

      case "breadcrumb": {
        const breadcrumbData = data as BreadcrumbData;
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbData.itemListElement.map((item) => ({
            "@type": "ListItem",
            position: item.position,
            name: item.name,
            ...(item.item && { item: item.item }),
          })),
        };
      }

      default:
        return data;
    }
  };

  return (
    <Script
      id={`structured-data-${schemaTypeToUse}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
};
