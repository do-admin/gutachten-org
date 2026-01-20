# Impressum (Legal Notice)

A comprehensive legal notice component that renders typical German Impressum content with company information and legal sections.

## Features

- **Complete Company Information**: Display all required company details
- **Legal Compliance**: Covers all TMG (Telemediengesetz) requirements
- **Customizable Sections**: Add, modify, or replace default legal sections
- **Responsive Design**: Mobile-friendly layout with proper spacing
- **Accessibility**: Semantic HTML structure with proper heading hierarchy
- **Visual Elements**: Icons and visual indicators for better readability

## Usage

### Basic Usage

```typescript
import { createComponent } from "@/lib/component-schemas";

const pageContent = [
  createComponent({
    type: "Impressum",
    title: "Impressum",
    subtitle: "Angaben gemäß § 5 TMG",
    companyInfo: {
      name: "Ihr Unternehmen GmbH",
      legalForm: "GmbH",
      address: "Musterstraße 123",
      city: "Musterstadt",
      postalCode: "12345",
      country: "Deutschland",
      phone: "+49 123 456789",
      email: "info@ihr-unternehmen.de",
      website: "https://ihr-unternehmen.de",
      taxId: "123/456/78901",
      vatId: "DE123456789",
      commercialRegister: "HRB 12345",
      court: "Amtsgericht Musterstadt",
      ceo: "Max Mustermann",
    },
  }),
];
```

### Advanced Usage with Custom Sections

```typescript
const pageContent = [
  createComponent({
    type: "Impressum",
    title: "Impressum",
    subtitle: "Angaben gemäß § 5 TMG",
    companyInfo: {
      name: "Ihr Unternehmen GmbH",
      legalForm: "GmbH",
      address: "Musterstraße 123",
      city: "Musterstadt",
      postalCode: "12345",
      phone: "+49 123 456789",
      email: "info@ihr-unternehmen.de",
      website: "https://ihr-unternehmen.de",
      taxId: "123/456/78901",
      vatId: "DE123456789",
      commercialRegister: "HRB 12345",
      court: "Amtsgericht Musterstadt",
      ceo: "Max Mustermann",
      authorizedRepresentatives: ["Max Mustermann", "Anna Musterfrau"],
    },
    sections: [
      {
        id: "verantwortlich",
        title: "Verantwortlich für den Inhalt",
        content:
          "Verantwortlich für den Inhalt dieser Website ist Ihr Unternehmen GmbH.",
        subsections: [
          {
            title: "Geschäftsführung",
            content: "Max Mustermann",
          },
        ],
      },
      {
        id: "custom-section",
        title: "Ihre Custom Section",
        content: "Hier können Sie eigene rechtliche Inhalte definieren.",
      },
    ],
  }),
];
```

## Props

| Prop          | Type     | Required | Description                                        |
| ------------- | -------- | -------- | -------------------------------------------------- |
| `title`       | `string` | ❌       | Main title (default: "Impressum")                  |
| `subtitle`    | `string` | ❌       | Subtitle (default: "Angaben gemäß § 5 TMG")        |
| `companyInfo` | `object` | ❌       | Company information object                         |
| `sections`    | `array`  | ❌       | Custom sections array (default: standard sections) |
| `className`   | `string` | ❌       | Additional CSS classes                             |

### Company Info Object

| Prop                        | Type     | Required | Description                         |
| --------------------------- | -------- | -------- | ----------------------------------- |
| `name`                      | `string` | ❌       | Company name                        |
| `legalForm`                 | `string` | ❌       | Legal form (GmbH, AG, etc.)         |
| `address`                   | `string` | ❌       | Street address                      |
| `city`                      | `string` | ❌       | City                                |
| `postalCode`                | `string` | ❌       | Postal code                         |
| `country`                   | `string` | ❌       | Country (default: "Deutschland")    |
| `phone`                     | `string` | ❌       | Phone number                        |
| `email`                     | `string` | ❌       | Email address                       |
| `website`                   | `string` | ❌       | Website URL                         |
| `taxId`                     | `string` | ❌       | Tax identification number           |
| `vatId`                     | `string` | ❌       | VAT identification number           |
| `commercialRegister`        | `string` | ❌       | Commercial register number          |
| `court`                     | `string` | ❌       | Register court                      |
| `ceo`                       | `string` | ❌       | CEO or managing director            |
| `authorizedRepresentatives` | `array`  | ❌       | Array of authorized representatives |

### Section Object

| Prop          | Type     | Required | Description                       |
| ------------- | -------- | -------- | --------------------------------- |
| `id`          | `string` | ✅       | Unique identifier for the section |
| `title`       | `string` | ✅       | Section title                     |
| `content`     | `string` | ✅       | Main content of the section       |
| `subsections` | `array`  | ❌       | Array of subsection objects       |

### Subsection Object

| Prop      | Type     | Required | Description        |
| --------- | -------- | -------- | ------------------ |
| `title`   | `string` | ✅       | Subsection title   |
| `content` | `string` | ✅       | Subsection content |

## Default Sections

The component includes these default sections if none are provided:

1. **Verantwortlich für den Inhalt** - Information about content responsibility
2. **Kontakt** - Contact information
3. **Handelsregister** - Commercial register information
4. **Umsatzsteuer-ID** - VAT identification
5. **Haftung für Inhalte** - Content liability
6. **Urheberrecht** - Copyright information
7. **Online-Streitbeilegung** - Online dispute resolution

## Examples

### Minimal Configuration

```typescript
createComponent({
  type: "Impressum",
  companyInfo: {
    name: "Mein Unternehmen",
    email: "info@mein-unternehmen.de",
  },
});
```

### Full Configuration

```typescript
createComponent({
  type: "Impressum",
  title: "Impressum",
  subtitle: "Angaben gemäß § 5 TMG",
  companyInfo: {
    name: "Mein Unternehmen GmbH",
    legalForm: "GmbH",
    address: "Beispielstraße 123",
    city: "Berlin",
    postalCode: "10115",
    country: "Deutschland",
    phone: "+49 30 12345678",
    email: "info@mein-unternehmen.de",
    website: "https://mein-unternehmen.de",
    taxId: "30/123/45678",
    vatId: "DE123456789",
    commercialRegister: "HRB 12345 B",
    court: "Amtsgericht Charlottenburg",
    ceo: "Max Mustermann",
    authorizedRepresentatives: ["Max Mustermann", "Anna Musterfrau"],
  },
  sections: [
    {
      id: "verantwortlich",
      title: "Verantwortlich für den Inhalt",
      content:
        "Verantwortlich für den Inhalt dieser Website ist Mein Unternehmen GmbH.",
      subsections: [
        {
          title: "Geschäftsführung",
          content: "Max Mustermann",
        },
        {
          title: "Bevollmächtigte Vertreter",
          content: "Anna Musterfrau",
        },
      ],
    },
    {
      id: "haftung",
      title: "Haftung für Inhalte",
      content:
        "Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.",
      subsections: [
        {
          title: "Haftungsausschluss",
          content:
            "Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.",
        },
        {
          title: "Verlinkung",
          content:
            "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.",
        },
      ],
    },
  ],
});
```

## Legal Requirements

This component helps fulfill German legal requirements including:

### TMG (Telemediengesetz) Requirements

- **§ 5 TMG**: Provider identification
- **§ 6 TMG**: Commercial register information
- **§ 7 TMG**: Content liability
- **§ 8 TMG**: Copyright information

### Additional Legal Elements

- **VAT Information**: Required for commercial websites
- **Commercial Register**: For registered companies
- **Contact Information**: Mandatory contact details
- **Liability Information**: Standard liability disclaimers
- **Copyright Notice**: Intellectual property protection

## Styling

The component uses Tailwind CSS classes and includes:

- **Responsive Design**: Mobile-first approach with responsive grid layouts
- **Color Scheme**: Blue accent colors with gray text for readability
- **Typography**: Proper heading hierarchy with consistent spacing
- **Visual Elements**: Icons from Lucide React for better visual appeal
- **Interactive Elements**: Hover effects on links and buttons
- **Card Layout**: Company information displayed in an attractive card format

## Accessibility

- **Semantic HTML**: Proper use of headings, sections, and landmarks
- **ARIA Labels**: Appropriate labeling for screen readers
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Color Contrast**: Sufficient contrast ratios for text readability
- **Focus Management**: Clear focus indicators for interactive elements

## Best Practices

1. **Complete Information**: Include all required company details
2. **Regular Updates**: Keep company information current
3. **Legal Compliance**: Ensure all TMG requirements are met
4. **Clear Contact**: Provide easily accessible contact information
5. **Professional Presentation**: Use clear, professional language
6. **Accessibility**: Ensure the content is accessible to all users

## Integration with Other Components

The Impressum component works well with:

- **Datenschutz Component**: For complete legal page coverage
- **Contact Forms**: For user inquiries
- **Footer Components**: For site-wide legal links
- **Navigation Components**: For easy access to legal pages
