# Ratgeber Component

A flexible blog/article listing component that displays articles loaded from markdown files with frontmatter. Features include a prominent featured article section and a responsive grid of article cards.

## Features

- **Featured Article Display**: Highlight one featured article with prominent styling
- **Article Grid**: Display articles in a responsive grid (2, 3, or 4 columns)
- **Automatic Article Loading**: Automatically loads articles from markdown files
- **Reading Time Calculation**: Shows estimated reading time for each article
- **Category Filtering**: Filter articles by category
- **Responsive Design**: Adapts to different screen sizes
- **Image Support**: Display article and author images
- **SEO Friendly**: Semantic HTML and proper heading hierarchy

## Usage

### Basic Example

```typescript
{
  type: 'Ratgeber',
  title: 'Ratgeber',
  subtitle: 'Praktische Tipps und Anleitungen',
  description: 'Entdecken Sie hilfreiche Artikel zu verschiedenen Themen',
  showFeatured: true,
  showAllArticles: true,
  articlesPerRow: 3,
}
```

### With Category Filter

```typescript
{
  type: 'Ratgeber',
  title: 'Finanz-Ratgeber',
  categoryFilter: 'finanzen',
  maxArticles: 6,
  articlesPerRow: 3,
}
```

### Custom Styling

```typescript
{
  type: 'Ratgeber',
  title: 'Ratgeber',
  className: 'bg-gray-50',
  containerClassName: 'container mx-auto px-6',
  cardClassName: 'border-2 border-gray-200',
  featuredClassName: 'bg-blue-50',
}
```

## Props

| Prop                 | Type           | Default                    | Description                        |
| -------------------- | -------------- | -------------------------- | ---------------------------------- |
| `title`              | `string`       | `'Ratgeber'`               | Main title for the section         |
| `subtitle`           | `string`       | -                          | Optional subtitle text             |
| `description`        | `string`       | -                          | Optional description text          |
| `showFeatured`       | `boolean`      | `true`                     | Show featured article section      |
| `showAllArticles`    | `boolean`      | `true`                     | Show all articles grid             |
| `articlesPerRow`     | `2 \| 3 \| 4`  | `3`                        | Number of articles per row         |
| `headingLevel`       | `HeadingLevel` | `1`                        | Heading level for title            |
| `showTitle`          | `boolean`      | `true`                     | Show the title section             |
| `categoryFilter`     | `string`       | -                          | Filter articles by category        |
| `maxArticles`        | `number`       | -                          | Maximum number of articles to show |
| `featuredLabel`      | `string`       | `'Empfohlener Artikel'`    | Label for featured section         |
| `allArticlesLabel`   | `string`       | `'Alle Artikel'`           | Label for all articles section     |
| `readMoreText`       | `string`       | `'Artikel lesen'`          | Text for read more button          |
| `className`          | `string`       | `''`                       | Additional CSS classes for wrapper |
| `containerClassName` | `string`       | `'container mx-auto px-4'` | CSS classes for container          |
| `cardClassName`      | `string`       | `''`                       | CSS classes for article cards      |
| `featuredClassName`  | `string`       | `''`                       | CSS classes for featured card      |

## Article Data Structure

Articles are loaded from markdown files with frontmatter in the following structure:

```markdown
---
title: "Article Title"
slug: "article-slug"
meta-description: "Article description for SEO"
meta-keywords: "keyword1, keyword2, keyword3"
date-published: "01.01.2025"
date-written: "01.01.2025"
isFeatured: "true"
category: "category-name"
author: "Author Name"
author-image: "author.webp"
article-image: "article.webp"
---

# Article Content

Your markdown content here...
```

### Required Frontmatter Fields

- `title`: Article title
- `slug`: URL-friendly slug for the article
- `meta-description`: SEO description
- `date-published`: Publication date (DD.MM.YYYY)
- `author`: Author name

### Optional Frontmatter Fields

- `meta-keywords`: SEO keywords
- `date-written`: Date written (DD.MM.YYYY)
- `isFeatured`: Set to "true" for featured articles
- `category`: Article category
- `author-image`: Author image filename
- `article-image`: Article image filename

## File Structure

Articles should be stored in:

```
src/data/{siteId}/json/ratgeber/
  ├── article-1.md
  ├── article-2.md
  └── article-3.md
```

Images should be stored in:

```
public/images/ratgeber/
  ├── article-image-1.webp
  ├── article-image-2.webp
  └── author-image.webp
```

## Integration with Article Detail Pages

This component is designed to work with article detail pages. Link to individual articles using:

```typescript
<Link href={`/ratgeber/${article.slug}`}>
  Read Article
</Link>
```

## Styling

The component uses Tailwind CSS and follows the existing design system:

- Uses `Card`, `Button`, and `Badge` from the UI components
- Responsive grid layout
- Smooth transitions and hover effects
- Semantic HTML structure
- Proper heading hierarchy

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation support
- ARIA labels where needed

## SEO Considerations

- Proper heading hierarchy (H1 → H2 → H3)
- Semantic HTML
- Meta descriptions from article frontmatter
- Image alt text
- Structured data support (can be added via StructuredData component)
