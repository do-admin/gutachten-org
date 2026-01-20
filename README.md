# Website Template

A Next.js-based multi-site template with a block-based architecture for building SEO-optimized websites through configuration files.

## Features

- 🚀 **Next.js 16** with App Router and Server-Side Rendering
- 🏗️ **Multi-Site Support** - Generate multiple sites from a single codebase
- 🧩 **Block-Based Architecture** - Modular, reusable components
- ⚙️ **Configuration-Driven** - Build sites through JSON/TypeScript config files
- 🔍 **SEO Optimized** - Built-in metadata, structured data, and semantic HTML
- 📱 **Responsive Design** - Tailwind CSS with mobile-first approach
- 🎨 **Dynamic Fonts & Colors** - Configure via `multi-page-config.json`
- 🍪 **GDPR Compliant** - Cookie banner with consent management

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Build and deploy multiple sites
pnpm build:deploy:multi-sites
```

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
│   ├── blocks/      # Block components (Hero, CTA, FAQ, etc.)
│   └── ui/          # Reusable UI components
├── data/            # Site configurations and content
│   └── [site-id]/   # Per-site data (images, layouts, subpages)
├── lib/             # Utilities and helpers
└── scripts/         # Build and deployment scripts
```

## Configuration

Sites are configured via `src/data/multi-page-config.json` and per-site data in `src/data/[site-id]/`:

- **Layout**: Header, footer, navigation, analytics
- **Subpages**: Page content and structure
- **Images**: Site-specific assets
- **Content**: FAQ, articles, legal pages

## Key Scripts

- `pnpm dev` - Development server with image sync
- `pnpm build` - Production build
- `pnpm build:deploy` - Build and deploy single site
- `pnpm build:deploy:multi-sites` - Build and deploy all sites
- `pnpm sync:images` - Sync images from data folder

## Documentation

See the following guides for detailed information:

- `TEMPLATE_README.md` - Template overview and customization
- `CENTRALIZED_CONFIG_GUIDE.md` - Configuration system
- `PROGRAMMATIC_SEO_GUIDE.md` - SEO implementation
- `COMPONENT_TYPES_ARCHITECTURE.md` - Component architecture

## License

MIT
