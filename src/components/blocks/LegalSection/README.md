# LegalSection Component

A specialized component for displaying legal and regulatory information in a structured, visually appealing format.

## Features

- **Structured Layout**: Organized sections for different aspects of legal content
- **Key Facts Highlight**: Display important facts, dates, and statistics prominently
- **Color-Coded Categories**: Different accent colors for visual distinction
- **Icon Support**: Customizable icons for visual identification
- **Responsive Design**: Works well on all screen sizes
- **Accessibility**: Semantic HTML and proper heading hierarchy

## Usage

```typescript
import { LegalSection } from '@/components/blocks/LegalSection';

<LegalSection
  abbreviation="BGB"
  fullName="Bürgerliches Gesetzbuch"
  category="Gesetz"
  description="Das BGB ist das Fundament des deutschen Zivilrechts..."
  keyFacts={[
    { label: 'In Kraft seit', value: '1900', icon: 'Calendar' },
    { label: 'Paragraphen', value: '2385', icon: 'FileText' }
  ]}
  whatItRegulates={[
    'Mietverhältnisse (§§ 535 ff. BGB)',
    'Wohnungseigentumsrecht',
    'Vertragsrecht'
  ]}
  impactOnPropertyManagement="Hausverwaltungen müssen..."
  keyRequirements={[
    'Rechtssichere Mietverträge gestalten',
    'Fristen überwachen',
    'Ordnungsgemäß abrechnen'
  ]}
  icon="Scale"
  accentColor="blue"
/>
```

## Props

| Prop                         | Type       | Required | Description                           |
| ---------------------------- | ---------- | -------- | ------------------------------------- |
| `abbreviation`               | `string`   | Yes      | Short form/abbreviation (e.g., "BGB") |
| `fullName`                   | `string`   | Yes      | Complete official name                |
| `category`                   | `string`   | Yes      | Type (Gesetz, Verordnung, etc.)       |
| `description`                | `string`   | Yes      | Brief overview                        |
| `keyFacts`                   | `Array`    | No       | Important facts to highlight          |
| `whatItRegulates`            | `string[]` | Yes      | List of regulated areas               |
| `impactOnPropertyManagement` | `string`   | Yes      | How it affects property managers      |
| `keyRequirements`            | `string[]` | Yes      | Main compliance requirements          |
| `icon`                       | `string`   | No       | Lucide icon name (default: "Scale")   |
| `accentColor`                | `string`   | No       | Color theme (default: "blue")         |
| `backgroundColor`            | `string`   | No       | Section background                    |
| `sectionClassName`           | `string`   | No       | Additional CSS classes                |

## Color Options

Available accent colors: `blue`, `green`, `purple`, `orange`, `red`, `indigo`, `teal`

## Best Practices

1. **Use appropriate icons**: Choose icons that represent the legal domain
2. **Keep descriptions concise**: 2-3 sentences for the main description
3. **Break down requirements**: List specific, actionable requirements
4. **Color coding**: Use consistent colors for similar types of regulations
5. **Key facts**: Highlight the most important numbers and dates

## Example: Full Implementation

```typescript
createComponent<LegalSectionComponent>({
  type: "LegalSection",
  abbreviation: "WEG",
  fullName: "Wohnungseigentumsgesetz",
  category: "Gesetz",
  description:
    "Regelt das Zusammenleben in einer Wohnungseigentümergemeinschaft.",
  keyFacts: [
    { label: "Reform", value: "2020", icon: "Calendar" },
    { label: "Mehrheit", value: "Einfach", icon: "Users" },
  ],
  whatItRegulates: [
    "Rechte und Pflichten der Eigentümer",
    "Aufgaben der Verwaltung",
    "Eigentümerversammlungen",
    "Beschlussfassungen",
  ],
  impactOnPropertyManagement:
    "Verwalter müssen rechtssicher einladen, protokollieren und Beschlüsse umsetzen.",
  keyRequirements: [
    "Ordnungsgemäße Verwaltung sicherstellen",
    "Instandhaltungsrücklage bilden",
    "Beschlusssammlung führen",
    "Eigentümerversammlungen organisieren",
  ],
  icon: "Building",
  accentColor: "green",
});
```

## Advantages Over TextImageSection

- **Better information hierarchy**: Structured sections for different content types
- **No need for images**: Focus on content rather than finding relevant images
- **Scannable format**: Easy to find specific information quickly
- **Consistent styling**: Uniform appearance across all legal content
- **More space-efficient**: Displays more information in less vertical space
- **Better for compliance content**: Designed specifically for legal/regulatory information
