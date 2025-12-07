# Dokploy Documentation (New)

This is a fresh Fumadocs project with the complete Dokploy documentation migrated from the old docs project.

## Features

- ✨ **Modern Fumadocs Setup** - Built with the latest Fumadocs version
- 🎨 **Ocean Theme** - Beautiful ocean-themed UI
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔍 **Advanced Search** - Built-in search functionality
- 🌙 **Dark Mode** - Full dark mode support
- 📚 **Complete Documentation** - All docs migrated including:
  - Core documentation
  - API references
  - CLI documentation
  - Remote Servers section
  - Examples and tutorials

## Getting Started

### Development

Run the development server:

```bash
# From workspace root
pnpm docs-new:dev

# Or from this directory
pnpm dev
```

The site will be available at `http://localhost:3000`

### Build

Build the documentation for production:

```bash
# From workspace root
pnpm docs-new:build

# Or from this directory
pnpm build
```

### Type Checking

Run type checking:

```bash
# From workspace root
pnpm docs-new:typecheck

# Or from this directory
pnpm run types:check
```

## Structure

```
apps/docs-new/
├── app/                    # Next.js app directory
│   ├── (home)/            # Home page
│   ├── docs/              # Documentation pages
│   │   ├── [[...slug]]/   # Dynamic doc pages
│   │   └── layout.tsx     # Docs layout
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── content/               # MDX documentation content
│   └── docs/              # All documentation files
├── lib/                   # Utilities
│   ├── source.ts          # Content source configuration
│   └── layout.shared.tsx  # Shared layout options
├── public/                # Static assets
└── source.config.ts       # Fumadocs configuration
```

## Customization

### Theme

The project uses the **Ocean theme**. To change it, edit `app/global.css`:

```css
@import 'fumadocs-ui/css/ocean.css'; /* Change this to another theme */
```

Available themes: `neutral`, `black`, `vitepress`, `dusk`, `catppuccin`, `ocean`, `purple`

### Layout Configuration

Edit `lib/layout.shared.tsx` to customize:
- Navigation title
- Links
- GitHub URL
- Other layout options

### Content

Add or edit documentation in the `content/docs/` directory. The structure follows Fumadocs conventions with `meta.json` files for navigation.

## Key Differences from Old Docs

1. **Modern API** - Uses `fumadocs-mdx:collections/server` instead of legacy approach
2. **Better Type Safety** - Full TypeScript support with proper types
3. **Simpler Configuration** - Less boilerplate, more conventions
4. **Built-in Features** - Search, OG images, and more work out of the box
5. **No Build Errors** - Clean slate without legacy issues

## Documentation

- [Fumadocs Documentation](https://fumadocs.dev)
- [Fumadocs Themes](https://fumadocs.dev/docs/ui/theme)
- [Fumadocs Layouts](https://fumadocs.dev/docs/ui/blocks/layout)

## Notes

- The `.source` directory is auto-generated - don't edit it manually
- Run `pnpm run postinstall` after making changes to content structure
- Restart dev server after adding new MDX files
