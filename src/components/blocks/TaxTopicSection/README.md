# TaxTopicSection Component

A specialized component for displaying tax and financial information in a structured, visually appealing format designed specifically for property tax content.

## Features

- **Financial Focus**: Designed specifically for tax and financial concepts
- **Key Figures Highlighted**: Important amounts, percentages, and limits prominently displayed
- **Tax Deductions**: Clear separation of what is and isn't tax deductible
- **Practical Advice**: Tips for tax optimization
- **Warnings**: Important pitfalls and considerations
- **Color-Coded**: Different colors for financial context
- **Responsive Design**: Works well on all screen sizes

## Usage

```typescript
import { TaxTopicSection } from '@/components/blocks/TaxTopicSection';

<TaxTopicSection
  title="Abschreibung (AfA)"
  subtitle="Absetzung für Abnutzung"
  description="Die Anschaffungs- oder Herstellungskosten des Gebäudes können über die AfA abgeschrieben werden."
  keyFigures={[
    { label: 'Gebäude nach 1924', value: '2% p.a.', highlight: true, icon: 'TrendingDown' },
    { label: 'Gebäude vor 1925', value: '2,5% p.a.', highlight: true, icon: 'TrendingDown' },
    { label: 'Abschreibungsdauer', value: '40-50 Jahre', icon: 'Calendar' }
  ]}
  whatIsTaxDeductible={[
    'Anschaffungskosten des Gebäudes (ohne Grundstück)',
    'Herstellungskosten bei Neubau',
    'Nachträgliche Herstellungskosten'
  ]}
  whatIsNotDeductible={[
    'Grundstückskosten',
    'Bereits abgeschriebene Beträge'
  ]}
  practicalAdvice={[
    'AfA mindert die Steuerlast ohne tatsächlichen Geldabfluss',
    'Gebäudewertanteil durch Gutachten ermitteln lassen',
    'Bei Denkmalschutz sind Sonderabschreibungen möglich'
  ]}
  warnings={[
    'AfA nur auf Gebäudewert, nicht auf Grundstück',
    'Korrekte Aufteilung von Kaufpreis ist entscheidend'
  ]}
  taxLawReference="§ 7 EStG"
  icon="TrendingDown"
  accentColor="emerald"
/>
```

## Props

| Prop                  | Type       | Required | Description                               |
| --------------------- | ---------- | -------- | ----------------------------------------- |
| `title`               | `string`   | Yes      | Main title of the tax topic               |
| `subtitle`            | `string`   | No       | Optional subtitle or abbreviation         |
| `description`         | `string`   | Yes      | Detailed explanation of the tax concept   |
| `keyFigures`          | `Array`    | No       | Important amounts, percentages, or limits |
| `whatIsTaxDeductible` | `string[]` | No       | List of deductible items                  |
| `whatIsNotDeductible` | `string[]` | No       | List of non-deductible items              |
| `practicalAdvice`     | `string[]` | No       | Practical tips for optimization           |
| `warnings`            | `string[]` | No       | Important warnings or pitfalls            |
| `taxLawReference`     | `string`   | No       | Legal reference (e.g., "§ 21 EStG")       |
| `icon`                | `string`   | No       | Lucide icon name (default: "Calculator")  |
| `accentColor`         | `string`   | No       | Color theme (default: "emerald")          |
| `backgroundColor`     | `string`   | No       | Section background                        |
| `sectionClassName`    | `string`   | No       | Additional CSS classes                    |

## Color Options

Available accent colors: `emerald`, `blue`, `amber`, `purple`, `rose`, `teal`, `indigo`

**Recommended colors by topic:**

- `emerald`: Tax benefits, deductions, savings
- `blue`: General tax information
- `amber`: Warnings, thresholds, important limits
- `purple`: Special cases, advanced topics
- `rose`: Taxes owed, non-deductible items
- `teal`: Calculation methods
- `indigo`: Legal references

## Key Features

### Key Figures

Display important financial data prominently:

- Set `highlight: true` to emphasize the most important figures
- Use relevant icons (Euro, Percent, Calendar, etc.)
- Automatically formatted in a responsive grid

### Tax Deductibility

Clear visual separation using:

- ✅ Green checkmarks for deductible items
- ❌ Red X marks for non-deductible items

### Practical Advice

Numbered tips in a highlighted box to help users optimize their taxes

### Warnings

Amber-colored alert box for important pitfalls and considerations

## Best Practices

1. **Keep figures simple**: Use rounded numbers when possible
2. **Be specific**: List concrete items that are/aren't deductible
3. **Provide actionable tips**: Focus on what users can actually do
4. **Warn appropriately**: Include important tax pitfalls
5. **Reference laws**: Include paragraph references when relevant

## Advantages Over TextImageSection

- **Financial focus**: Designed specifically for tax content
- **Key figures highlighted**: Important numbers stand out
- **Deduction clarity**: Clear what is/isn't deductible
- **No images needed**: Focus on financial data
- **Tax-specific structure**: Optimized for tax information flow
- **Warning system**: Built-in for tax pitfalls
- **Practical tips**: Actionable advice section
