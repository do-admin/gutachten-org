import Script from "next/script";

interface FAQItem {
  question: string;
  answer: string;
  id?: string;
  categoryTitle?: string;
}

interface FAQGroup {
  groupName: string;
  faqs: FAQItem[];
}

interface FAQSchemaProps {
  items: FAQItem[] | FAQGroup[];
  pageUrl?: string;
  pageTitle?: string;
}

export const FAQSchema = ({ items, pageUrl, pageTitle }: FAQSchemaProps) => {
  // Flatten FAQ items if they are grouped
  const flattenFAQItems = (): FAQItem[] => {
    if (!items || items.length === 0) {
      return [];
    }

    // Check if items are grouped (have groupName property)
    const isGrouped = "groupName" in items[0];

    if (isGrouped) {
      // Flatten grouped items
      const flattenedItems: FAQItem[] = [];
      (items as FAQGroup[]).forEach((group) => {
        group.faqs.forEach((faqItem) => {
          flattenedItems.push(faqItem);
        });
      });
      return flattenedItems;
    } else {
      // Items are already flat
      return items as FAQItem[];
    }
  };

  const generateFAQSchema = () => {
    const flattenedItems = flattenFAQItems();

    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: flattenedItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    // Add page information if provided
    if (pageUrl || pageTitle) {
      return {
        ...baseSchema,
        ...(pageUrl && { url: pageUrl }),
        ...(pageTitle && { name: pageTitle }),
      };
    }

    return baseSchema;
  };

  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateFAQSchema()),
      }}
    />
  );
};
