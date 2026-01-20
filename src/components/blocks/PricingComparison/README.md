# PricingComparison Component

A fully responsive pricing comparison component that displays three pricing tiers side by side. Perfect for showcasing service packages, subscription plans, or product offerings with different feature sets.

## Features

- **Three-Column Layout**: Displays exactly three pricing tiers in a horizontal grid
- **Highlighted Tier**: Support for highlighting a recommended or featured tier
- **Custom Badges**: Optional badges (e.g., "EMPFOHLEN", "POPULAR", "BEST VALUE")
- **Feature Lists**: Each tier can display a list of features with checkmark icons
- **CTA Buttons**: Customizable call-to-action buttons for each tier
- **Top CTA**: Optional main CTA button displayed above the pricing cards
- **Fully Responsive**: Stacks vertically on mobile, displays horizontally on desktop
- **Flexible Styling**: Extensive className props for customization

## Design Origin

This component was converted from a Figma design for "Nutzungsdauergutachten" pricing tiers, maintaining pixel-perfect accuracy while adding full responsiveness.

## Usage

### Basic Example

\`\`\`tsx
import { PricingComparison } from "@/components/blocks/PricingComparison";

export default function PricingPage() {
return (
<PricingComparison
heading="Was kostet ein Nutzungsdauergutachten?"
topCtaLabel="Kostenlose Ersteinschätzung"
topCtaHref="/kontakt"
tiers={[
{
title: "Basic Plan",
price: "950,00€",
priceNote: "(inkl. MwSt)",
features: [
{ text: "Feature 1" },
{ text: "Feature 2" },
{ text: "Feature 3" },
],
ctaLabel: "Get Started",
ctaHref: "/signup",
ctaVariant: "default",
},
{
title: "Pro Plan",
price: "179,00 €",
pricePrefix: "+",
priceNote: "(inkl. MwSt)",
priceClassName: "text-[#EB6613]",
features: [
{ text: "All Basic features" },
{ text: "Feature 4" },
{ text: "Feature 5" },
],
ctaLabel: "Get Started",
ctaHref: "/signup",
ctaVariant: "accent",
badge: "EMPFOHLEN",
highlighted: true,
},
{
title: "Enterprise Plan",
price: "359,00 €",
pricePrefix: "+",
priceNote: "(inkl. MwSt)",
features: [
{ text: "All Pro features" },
{ text: "Feature 6" },
{ text: "Feature 7" },
{ text: "Feature 8" },
],
ctaLabel: "Contact Sales",
ctaHref: "/contact",
ctaVariant: "default",
},
]}
/>
);
}
\`\`\`

### Advanced Example with Custom Icons

\`\`\`tsx
<PricingComparison
heading="Choose Your Plan"
headingClassName="text-4xl"
topCtaLabel="Contact Us"
topCtaHref="/contact"
topCtaIcon="MessageCircle"
backgroundClassName="bg-white"
tiers={[
{
title: "Starter",
price: "$29",
priceNote: "per month",
features: [
{
text: "10 Projects",
icon: "Check",
iconClassName: "text-green-500",
},
{
text: "5GB Storage",
icon: "Check",
iconClassName: "text-green-500",
},
],
ctaLabel: "Start Free Trial",
ctaHref: "/trial",
},
// ... other tiers
]}
/>
\`\`\`

## Props

### PricingComparisonProps

| Prop                  | Type                                      | Default                                  | Description                              |
| --------------------- | ----------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| `sectionId`           | `string`                                  | `"pricing-comparison"`                   | ID for the pricing section               |
| `heading`             | `string`                                  | required                                 | Main heading for the pricing section     |
| `headingClassName`    | `string`                                  | -                                        | Additional CSS classes for the heading   |
| `topCtaLabel`         | `string`                                  | -                                        | Label for the top CTA button             |
| `topCtaHref`          | `string`                                  | -                                        | Link URL for the top CTA button          |
| `topCtaIcon`          | `LucideIconName`                          | `"ArrowUpRight"`                         | Icon for the top CTA button              |
| `topCtaClassName`     | `string`                                  | -                                        | Additional CSS classes for the top CTA   |
| `tiers`               | `[PricingTier, PricingTier, PricingTier]` | required                                 | Array of exactly 3 pricing tiers         |
| `backgroundClassName` | `string`                                  | `"bg-gradient-to-b from-[...] to-white"` | Background CSS class                     |
| `containerClassName`  | `string`                                  | -                                        | Additional CSS classes for the container |
| `className`           | `string`                                  | -                                        | Additional CSS classes for the section   |

### PricingTier

| Prop             | Type                                   | Default     | Description                               |
| ---------------- | -------------------------------------- | ----------- | ----------------------------------------- |
| `title`          | `string`                               | required    | Title of the pricing tier                 |
| `price`          | `string`                               | required    | Price display (e.g., "950,00€", "$29/mo") |
| `pricePrefix`    | `string`                               | -           | Prefix for price (e.g., "+", "from")      |
| `priceNote`      | `string`                               | -           | Note below price (e.g., "(inkl. MwSt)")   |
| `priceClassName` | `string`                               | -           | Custom CSS class for price color          |
| `features`       | `PricingFeature[]`                     | required    | Array of feature items                    |
| `ctaLabel`       | `string`                               | required    | Label for the CTA button                  |
| `ctaHref`        | `string`                               | required    | Link URL for the CTA button               |
| `ctaVariant`     | `"default" \| "accent" \| "secondary"` | `"default"` | Button variant                            |
| `badge`          | `string`                               | -           | Optional badge text (e.g., "EMPFOHLEN")   |
| `highlighted`    | `boolean`                              | `false`     | Whether to highlight this tier            |

### PricingFeature

| Prop            | Type             | Default  | Description                   |
| --------------- | ---------------- | -------- | ----------------------------- |
| `text`          | `string`         | required | Feature description text      |
| `icon`          | `LucideIconName` | -        | Optional icon name            |
| `iconClassName` | `string`         | -        | Custom CSS class for the icon |

## Design Tokens

The component uses these color values from the Figma design:

- **Dark Neutral**: `#273238` - Primary dark text and buttons
- **Light Neutral**: `#F8FAFB` - Light text on dark backgrounds
- **Dark Gray**: `#515A5F` - Secondary text
- **Accent Color**: `#FF985C` - Orange accent for highlighted tier
- **Check Icon**: `#00A36F` - Green checkmark color

## Responsive Behavior

- **Mobile (<768px)**: Cards stack vertically with full width
- **Tablet & Desktop (≥768px)**: Three columns in a horizontal grid
- Borders adapt to layout: vertical borders collapse on mobile

## Accessibility

- Semantic HTML structure
- ARIA labels for icons
- Keyboard navigable buttons
- High contrast color scheme
- Focus states on interactive elements

## Customization

The component provides extensive customization through className props:

\`\`\`tsx
<PricingComparison
headingClassName="custom-heading"
containerClassName="custom-container"
backgroundClassName="bg-custom-gradient"
// ... other props
/>
\`\`\`

## Integration with Site Config

For complete examples of integration with your site configuration, see:

- \`PricingComparison.example.tsx\` - Full working example
- Component registry entry in \`src/lib/component-registry.ts\`

## Notes

- The component requires exactly 3 tiers (enforced by TypeScript)
- Default checkmark SVG is included if no icon is specified
- The middle tier is typically highlighted as the recommended option
- CTA buttons can use different variants to match your design system
