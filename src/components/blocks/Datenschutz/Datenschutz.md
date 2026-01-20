# Datenschutz (Privacy Policy)

A comprehensive privacy policy component that renders typical German privacy policy content with customizable sections and contact information.

## Features

- **Comprehensive Content**: Pre-built sections covering all typical privacy policy requirements
- **Customizable Sections**: Add, modify, or replace default sections
- **Contact Information**: Display company contact details prominently
- **Responsive Design**: Mobile-friendly layout with proper spacing
- **Accessibility**: Semantic HTML structure with proper heading hierarchy
- **Visual Elements**: Icons and visual indicators for better readability

## Usage

### Basic Usage

```typescript
import { createComponent } from "@/lib/component-schemas";

const pageContent = [
  createComponent({
    type: "Datenschutz",
    title: "Datenschutzerklärung",
    subtitle:
      "Informationen zum Datenschutz und zur Verarbeitung Ihrer personenbezogenen Daten",
    companyName: "Ihr Unternehmen",
    contactInfo: {
      email: "datenschutz@ihr-unternehmen.de",
      phone: "+49 123 456789",
      address: "Musterstraße 123, 12345 Musterstadt",
    },
  }),
];
```

### Advanced Usage with Custom Sections

```typescript
const pageContent = [
  createComponent({
    type: "Datenschutz",
    title: "Datenschutzerklärung",
    subtitle: "Informationen zum Datenschutz",
    companyName: "Ihr Unternehmen",
    lastUpdated: "01.01.2024",
    contactInfo: {
      email: "datenschutz@ihr-unternehmen.de",
      phone: "+49 123 456789",
      address: "Musterstraße 123, 12345 Musterstadt",
    },
    sections: [
      {
        id: "verantwortlicher",
        title: "Verantwortlicher",
        content:
          "Verantwortlicher für die Datenverarbeitung ist Ihr Unternehmen.",
        subsections: [
          {
            title: "Kontaktdaten",
            content: "Sie erreichen uns unter den angegebenen Kontaktdaten.",
          },
        ],
      },
      {
        id: "custom-section",
        title: "Ihre Custom Section",
        content: "Hier können Sie eigene Inhalte definieren.",
      },
    ],
  }),
];
```

## Props

| Prop          | Type     | Required | Description                                                        |
| ------------- | -------- | -------- | ------------------------------------------------------------------ |
| `title`       | `string` | ❌       | Main title of the privacy policy (default: "Datenschutzerklärung") |
| `subtitle`    | `string` | ❌       | Subtitle or description (default: standard description)            |
| `lastUpdated` | `string` | ❌       | Last update date (default: current date)                           |
| `companyName` | `string` | ❌       | Name of the company (default: "Unternehmen")                       |
| `sections`    | `array`  | ❌       | Custom sections array (default: standard sections)                 |
| `contactInfo` | `object` | ❌       | Contact information object                                         |
| `className`   | `string` | ❌       | Additional CSS classes                                             |

### Contact Info Object

| Prop      | Type     | Required | Description           |
| --------- | -------- | -------- | --------------------- |
| `email`   | `string` | ❌       | Contact email address |
| `phone`   | `string` | ❌       | Contact phone number  |
| `address` | `string` | ❌       | Company address       |
| `website` | `string` | ❌       | Company website URL   |

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

1. **Verantwortlicher** - Information about the data controller
2. **Datenerhebung und -verwendung** - Data collection and usage
3. **Cookies und Tracking** - Cookie and tracking information
4. **Ihre Rechte** - User rights regarding personal data
5. **Datensicherheit** - Data security measures
6. **Änderungen der Datenschutzerklärung** - Changes to privacy policy

## Examples

### Minimal Configuration

```typescript
createComponent({
  type: "Datenschutz",
  companyName: "Mein Unternehmen",
  contactInfo: {
    email: "info@mein-unternehmen.de",
  },
});
```

### Full Configuration

```typescript
createComponent({
  type: "Datenschutz",
  title: "Datenschutzerklärung",
  subtitle: "Schutz Ihrer persönlichen Daten ist uns wichtig",
  lastUpdated: "15.03.2024",
  companyName: "Mein Unternehmen GmbH",
  contactInfo: {
    email: "datenschutz@mein-unternehmen.de",
    phone: "+49 30 12345678",
    address: "Beispielstraße 123, 10115 Berlin",
    website: "https://mein-unternehmen.de",
  },
  sections: [
    {
      id: "verantwortlicher",
      title: "Verantwortlicher",
      content:
        "Verantwortlicher für die Datenverarbeitung ist Mein Unternehmen GmbH.",
      subsections: [
        {
          title: "Kontaktdaten",
          content:
            "Bei Fragen zum Datenschutz erreichen Sie uns unter den oben genannten Kontaktdaten.",
        },
      ],
    },
    {
      id: "datenerhebung",
      title: "Datenerhebung und -verwendung",
      content:
        "Wir erheben und verarbeiten personenbezogene Daten nur im Rahmen der gesetzlichen Bestimmungen der DSGVO.",
      subsections: [
        {
          title: "Automatische Datenerhebung",
          content:
            "Beim Besuch unserer Website werden automatisch Informationen über den Zugriff gespeichert. Diese dienen der Sicherheit und der Verbesserung unseres Angebots.",
        },
        {
          title: "Kontaktformulare",
          content:
            "Daten, die Sie uns über Kontaktformulare mitteilen, werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.",
        },
      ],
    },
  ],
});
```

## Styling

The component uses Tailwind CSS classes and includes:

- **Responsive Design**: Mobile-first approach with responsive grid layouts
- **Color Scheme**: Blue accent colors with gray text for readability
- **Typography**: Proper heading hierarchy with consistent spacing
- **Visual Elements**: Icons from Lucide React for better visual appeal
- **Interactive Elements**: Hover effects on links and buttons

## Accessibility

- **Semantic HTML**: Proper use of headings, sections, and landmarks
- **ARIA Labels**: Appropriate labeling for screen readers
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Color Contrast**: Sufficient contrast ratios for text readability
- **Focus Management**: Clear focus indicators for interactive elements

## Legal Compliance

This component is designed to help with GDPR compliance by including:

- **Required Information**: All mandatory privacy policy elements
- **User Rights**: Clear explanation of data subject rights
- **Contact Information**: Easy access to data protection contact
- **Transparency**: Clear and understandable language
- **Update Information**: Last updated date for version control

## Best Practices

1. **Regular Updates**: Keep the privacy policy current with legal changes
2. **Clear Language**: Use simple, understandable language
3. **Complete Information**: Include all required legal elements
4. **Easy Access**: Make the privacy policy easily accessible
5. **Contact Information**: Provide clear contact details for data protection inquiries
