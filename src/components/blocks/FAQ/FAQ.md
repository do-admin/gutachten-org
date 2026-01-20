# FAQ Component

A flexible and accessible FAQ component that displays frequently asked questions in an accordion format. Supports both simple FAQ items and grouped FAQs with extensive customization options.

## Features

- **Accordion Interface**: Clean, collapsible FAQ items with smooth animations
- **Grouped FAQs**: Support for organizing FAQs into logical groups
- **Custom Styling**: Extensive CSS class customization for all elements
- **Accessibility**: Full ARIA support and keyboard navigation
- **Anchor Links**: Optional anchor links for direct FAQ item access
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **SEO Optimized**: Structured data support for search engines

## Usage

### Basic Usage

```typescript
import { createComponent } from "@/lib/component-schemas";

const pageContent = [
  createComponent({
    type: "FAQ",
    title: "Häufige Fragen",
    subtitle: "Hier finden Sie Antworten auf die wichtigsten Fragen",
    items: [
      {
        question: "Wie kann ich mitmachen?",
        answer:
          "Sie können sich über unsere Website anmelden und direkt loslegen.",
      },
      {
        question: "Kostet die Teilnahme etwas?",
        answer: "Die Teilnahme ist vollständig kostenlos für alle Nutzer.",
      },
    ],
  }),
];
```

### Grouped FAQs

```typescript
const pageContent = [
  createComponent({
    type: "FAQ",
    title: "Häufige Fragen",
    items: [
      {
        groupName: "Allgemeine Fragen",
        faqs: [
          {
            question: "Was ist das Ziel dieser Plattform?",
            answer:
              "Unser Ziel ist es, eine benutzerfreundliche Plattform zu schaffen.",
          },
        ],
      },
      {
        groupName: "Technische Fragen",
        faqs: [
          {
            question: "Welche Browser werden unterstützt?",
            answer: "Wir unterstützen alle modernen Browser.",
          },
        ],
      },
    ],
  }),
];
```

### Custom Styling

```typescript
const pageContent = [
  createComponent({
    type: "FAQ",
    title: "Support & Hilfe",
    sectionClassName: "bg-gray-50 py-16",
    titleClassName: "text-3xl font-bold text-blue-600",
    triggerClassName: "text-lg font-medium text-gray-800",
    answerClassName: "text-gray-700 leading-relaxed",
    accordionItemClassName: "border border-gray-200 rounded-lg mb-2",
    items: [
      {
        question: "Wie kann ich mein Passwort zurücksetzen?",
        answer:
          'Klicken Sie auf "Passwort vergessen" und folgen Sie den Anweisungen.',
      },
    ],
  }),
];
```

## Props

| Prop                     | Type      | Required | Default                   | Description                             |
| ------------------------ | --------- | -------- | ------------------------- | --------------------------------------- |
| `title`                  | `string`  | ❌       | "Häufige Fragen"          | Main title of the FAQ section           |
| `subtitle`               | `string`  | ❌       | -                         | Subtitle or description                 |
| `items`                  | `array`   | ✅       | -                         | Array of FAQ items or grouped FAQ items |
| `sectionClassName`       | `string`  | ❌       | -                         | CSS classes for the section wrapper     |
| `titleWrapperClassName`  | `string`  | ❌       | -                         | CSS classes for the title wrapper       |
| `titleClassName`         | `string`  | ❌       | -                         | CSS classes for the title               |
| `subtitleClassName`      | `string`  | ❌       | -                         | CSS classes for the subtitle            |
| `triggerClassName`       | `string`  | ❌       | -                         | CSS classes for the accordion trigger   |
| `answerClassName`        | `string`  | ❌       | -                         | CSS classes for the answer content      |
| `accordionItemClassName` | `string`  | ❌       | -                         | CSS classes for accordion items         |
| `accordionClassName`     | `string`  | ❌       | -                         | CSS classes for the accordion container |
| `groupTitleClassName`    | `string`  | ❌       | -                         | CSS classes for group titles            |
| `showTitle`              | `boolean` | ❌       | `true`                    | Whether to show the title               |
| `sectionId`              | `string`  | ❌       | "faq"                     | ID for the section element              |
| `enableAnchorLinks`      | `boolean` | ❌       | `true`                    | Whether to enable anchor links          |
| `ariaLabel`              | `string`  | ❌       | "Häufig gestellte Fragen" | ARIA label for accessibility            |
| `ariaDescribedBy`        | `string`  | ❌       | -                         | ARIA described by attribute             |
| `renderAsH1`             | `boolean` | ❌       | `false`                   | Whether to render title as H1           |
| `underline`              | `boolean` | ❌       | `true`                    | Whether to show underline on title      |

## FAQ Item Structure

### Simple FAQ Items

```typescript
{
  id?: string;           // Optional unique identifier
  question: string;      // The question text
  answer: string;        // The answer text
}
```

### Grouped FAQ Items

```typescript
{
  groupName: string; // Name of the group
  faqs: Array<{
    // Array of FAQ items in this group
    id?: string;
    question: string;
    answer: string;
  }>;
}
```

## Examples

### Minimal FAQ

```typescript
createComponent({
  type: "FAQ",
  items: [
    {
      question: "Einfache Frage?",
      answer: "Einfache Antwort.",
    },
  ],
});
```

### Full-Featured FAQ

```typescript
createComponent({
  type: "FAQ",
  title: "Support Center",
  subtitle: "Wir helfen Ihnen gerne weiter",
  sectionClassName: "bg-blue-50 py-12",
  titleClassName: "text-4xl font-bold text-blue-800",
  subtitleClassName: "text-xl text-blue-600",
  triggerClassName: "text-lg font-semibold text-gray-800 hover:text-blue-600",
  answerClassName: "text-gray-700 leading-relaxed",
  accordionItemClassName: "bg-white border border-blue-200 rounded-lg mb-3",
  accordionClassName: "space-y-3",
  enableAnchorLinks: true,
  ariaLabel: "Support FAQ",
  items: [
    {
      id: "support-1",
      question: "Wie kann ich Kontakt aufnehmen?",
      answer:
        "Sie können uns über das Kontaktformular, per E-Mail oder telefonisch erreichen.",
    },
    {
      id: "support-2",
      question: "Wie schnell antworten Sie?",
      answer:
        "Wir antworten in der Regel innerhalb von 24 Stunden auf alle Anfragen.",
    },
  ],
});
```

### Grouped FAQ with Custom Group Styling

```typescript
createComponent({
  type: "FAQ",
  title: "Hilfe & Support",
  groupTitleClassName:
    "text-2xl font-bold text-green-600 border-l-4 border-green-500 pl-4 mb-6",
  items: [
    {
      groupName: "Kontakt & Support",
      faqs: [
        {
          question: "Wie erreiche ich den Support?",
          answer:
            "Über das Kontaktformular oder per E-Mail an support@example.com.",
        },
      ],
    },
    {
      groupName: "Technische Probleme",
      faqs: [
        {
          question: "Die Website lädt nicht richtig",
          answer:
            "Versuchen Sie es mit einem anderen Browser oder leeren Sie den Cache.",
        },
      ],
    },
  ],
});
```

### FAQ without Title

```typescript
createComponent({
  type: "FAQ",
  showTitle: false,
  items: [
    {
      question: "Versteckte FAQ",
      answer: "Diese FAQ hat keinen sichtbaren Titel.",
    },
  ],
});
```

### FAQ with H1 Title

```typescript
createComponent({
  type: "FAQ",
  title: "FAQ - Hauptseite",
  renderAsH1: true,
  items: [
    {
      question: "Wichtige Frage?",
      answer: "Wichtige Antwort.",
    },
  ],
});
```

## Accessibility Features

The FAQ component includes comprehensive accessibility features:

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support for accordion interaction
- **Focus Management**: Clear focus indicators and logical tab order
- **Semantic HTML**: Proper use of headings, sections, and landmarks
- **Screen Reader Support**: Announcements for expand/collapse actions

### Accessibility Example

```typescript
createComponent({
  type: "FAQ",
  title: "Barrierefreie FAQ",
  ariaLabel: "Häufig gestellte Fragen und Antworten",
  ariaDescribedBy: "faq-description",
  sectionId: "accessible-faq",
  enableAnchorLinks: true,
  items: [
    {
      id: "accessibility-1",
      question: "Ist die Website barrierefrei?",
      answer: "Ja, unsere Website erfüllt die WCAG 2.1 AA Standards.",
    },
  ],
});
```

## SEO and Structured Data

The FAQ component can be used with structured data for better SEO:

```typescript
// In your page metadata
structuredData: {
  faq: {
    mainEntity: [
      {
        name: 'Wie kann ich mitmachen?',
        acceptedAnswer: {
          text: 'Sie können sich über unsere Website anmelden.',
        },
      },
    ],
  },
}
```

## Styling Guidelines

### Default Classes

The component uses sensible defaults but allows complete customization:

- **Section**: `py-12` (padding top/bottom)
- **Title**: Standard heading styles
- **Subtitle**: `text-xl text-primary max-w-3xl mx-auto`
- **Accordion Items**: `border-t border-gray-200`
- **Triggers**: `text-xl text-left text-primary`
- **Answers**: `text-primary leading-relaxed whitespace-pre-wrap`

### Custom Styling Tips

1. **Consistent Spacing**: Use consistent padding and margins
2. **Color Scheme**: Match your brand colors
3. **Typography**: Ensure good readability
4. **Interactive States**: Style hover and focus states
5. **Mobile Responsive**: Test on different screen sizes

### Example Custom Styling

```typescript
createComponent({
  type: "FAQ",
  sectionClassName: "bg-gradient-to-br from-blue-50 to-indigo-100 py-16",
  titleClassName:
    "text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent",
  subtitleClassName: "text-xl text-gray-600 max-w-2xl mx-auto",
  accordionItemClassName:
    "bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg mb-4",
  triggerClassName:
    "text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors",
  answerClassName: "text-gray-700 leading-relaxed bg-blue-50/50 p-4 rounded-lg",
  items: [
    // ... your FAQ items
  ],
});
```

## Best Practices

### Content Guidelines

1. **Clear Questions**: Write questions that users would actually ask
2. **Comprehensive Answers**: Provide complete, helpful answers
3. **Logical Grouping**: Group related questions together
4. **Regular Updates**: Keep FAQ content current and relevant
5. **User Testing**: Test with real users to identify missing questions

### Technical Guidelines

1. **Performance**: Keep FAQ items reasonable in number
2. **Accessibility**: Always include proper ARIA labels
3. **SEO**: Use structured data for important FAQs
4. **Mobile**: Test accordion behavior on mobile devices
5. **Loading**: Consider lazy loading for large FAQ lists

### Integration Guidelines

1. **Consistent Styling**: Match your site's design system
2. **Navigation**: Provide easy access to FAQ sections
3. **Search**: Consider adding search functionality for large FAQs
4. **Analytics**: Track which questions are most viewed
5. **Feedback**: Allow users to rate answer helpfulness

## Troubleshooting

### Common Issues

1. **Items Not Displaying**: Ensure `items` array is not empty
2. **Styling Issues**: Check CSS class conflicts
3. **Accessibility Problems**: Verify ARIA attributes
4. **Mobile Issues**: Test accordion on touch devices
5. **Performance**: Limit number of FAQ items for better performance

### Getting Help

1. **Check Examples**: Review the example files for proper usage
2. **Validate Props**: Use TypeScript to catch prop errors
3. **Test Components**: Test in isolation before integration
4. **Review Documentation**: Check component documentation
5. **Community Support**: Ask for help in project discussions

## Integration with Other Components

The FAQ component works well with:

- **Hero Components**: For FAQ landing pages
- **Contact Forms**: For FAQ + contact combinations
- **Navigation**: For FAQ section links
- **Search**: For FAQ search functionality
- **Analytics**: For FAQ usage tracking

## Conclusion

The FAQ component provides a powerful, flexible solution for displaying frequently asked questions. With its extensive customization options, accessibility features, and SEO support, it's perfect for creating comprehensive FAQ sections that enhance user experience and provide valuable information to your visitors.
