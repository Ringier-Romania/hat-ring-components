# AI Coding Guidelines — hat-ring-components (Framework Development)

> These instructions are for developing **the hat-ring-components framework itself**.
> If you're working on a **HAT project** (a site built with this framework), read `copilot-instructions-hat-project.md` instead.

## What is hat-ring-components?

An Astro-based component library for Ring Publishing's **Head App Template (HAT)** system.
Provides reusable widgets, helpers, providers, the Grid layout system, SEO components, and styling utilities for building publishing websites.

**Detailed documentation:** See `docs/instructions/index.md` for the full framework reference, including architecture, widgets, styling, GraphQL, and more.

---

## Repository Structure

```
hat-ring-components/
├── .github/                    # Copilot instructions, CODEOWNERS
├── src/
│   ├── index.ts                # Main barrel export (all public API)
│   ├── components/
│   │   ├── common/             # Shared components (RingImage, SafeHead, TextReplacer, etc.)
│   │   ├── Grid/               # Grid system (Grid, Container, Box, Widget)
│   │   ├── seo/                # SEO components (SchemaOrg, meta tags)
│   │   ├── Story/              # Story-level components
│   │   └── widgets/            # Widget components
│   │       ├── common/         # BasicWidget, Menu, Slider, SearchBox, etc.
│   │       ├── Story/          # StoryTitle, StoryContent, StoryAuthors, etc.
│   │       ├── Lists/          # GenericList, TopicTitle, TopicDescription
│   │       ├── Author/         # Author widget
│   │       └── analytics/      # Kropka, RingDataLayer
│   ├── helpers/                # Utility functions (Cache, Config, Date, Image, etc.)
│   ├── providers/              # Service providers (WebsiteApiProvider, CacheProvider)
│   ├── adapters/               # Cache adapters (Redis, NodeCache)
│   ├── renderlessComponents/   # Data-only components
│   ├── configs/                # Configuration schemas
│   └── types/                  # TypeScript interfaces
├── styles/                     # Shared SCSS modules
├── docs/                       # Framework documentation
│   └── instructions/           # Detailed docs (index.md → specialized topics)
├── testDist/                   # Test build output
├── package.json
└── tsconfig.json
```

---

## Development Workflow

### Local Development
```bash
npm install
npm link                        # Link for local HAT project testing
# In HAT project: npm link "hat-ring-components"
```

### Testing
```bash
npm run test                    # Jest with ts-jest
npm run test-watch              # Watch mode (may have flaky failures)
```

### Key Conventions

1. **Barrel exports** — All public API goes through `src/index.ts`. Every new widget, helper, or type must be exported there.

2. **Widget structure** — Each widget lives in its own directory:
   ```
   WidgetName/
   ├── WidgetName.astro         # Main component
   ├── WidgetNameGetData.ts     # Data fetching logic (if needed)
   ├── WidgetNameWebsitesConfig.ts  # CMS parameters
   └── types.ts                 # TypeScript interfaces
   ```

3. **Helper naming** — All exported functions use prefix pattern: `HelperName_functionName()` (e.g., `CacheHelper_set`, `DateHelper_convertDate`).

4. **ItemParts** — Each itemPart exports both `default` (component) and `getFragment` (GQL fragment). Fragments are lazy-loaded.

5. **CSS Modules** — Styles go in `styles/` directory, use `.module.scss`, scope with double-class selector.

6. **Provider pattern** — Services use static methods (e.g., `WebsiteApiProvider.call()`).

7. **Cache keys** — Always use `JSON.stringify()` for cache keys.

---

## Architecture Patterns

- **Astro Components**: `.astro` files with TypeScript frontmatter for SSR
- **Widget System**: Standard lifecycle — validate → fetch → process → render
- **Grid Layout**: Grid → Container → Box → Widget hierarchy
- **Provider Pattern**: WebsiteApiProvider, CacheProvider use static methods
- **Adapter Pattern**: Cache implementations behind CacheAdapterInterface
- **Configuration-Driven**: Widget behavior from CMS widgetConfig objects
- **Environment Toggles**: Features switch on env vars (USE_REDIS, CACHE_TTL)

---

## Adding New Components

### New Widget
1. Create directory in `src/components/widgets/{category}/YourWidget/`
2. Create `YourWidget.astro` following the standard lifecycle
3. Create `types.ts` extending `AbstractWidgetConfig`
4. Create `YourWidgetWebsitesConfig.ts` for CMS params
5. Export from `src/index.ts`
6. Add styles in `styles/widgets/{category}/YourWidget.module.scss`

### New Helper
1. Create `src/helpers/YourHelper.ts`
2. Use prefix naming: `YourHelper_functionName()`
3. Export from `src/index.ts`

### GraphQL Schema

The Websites API GraphQL schema is located at `node_modules/@ringpublishing/graphql-api-client-got/lib/schemas/websites-api.graphql`. **Always consult this schema** when creating or modifying GraphQL queries to ensure correct field names, types, and arguments. Key types include: `Query` (root), `Story`, `Topic`, `Author`, `Source`, `Section`, `SectionItem`, `StoryFilterInput`, `StorySimilarInput`.

## Working with Copilot in This Repo
### New ItemPart
1. Create in `src/components/widgets/common/BasicWidget/itemParts/`
2. Export both `default` component and `getFragment` function
3. Add to `itemParts/index.ts`

---

## Common Pitfalls

- **Cache key consistency** — Always `JSON.stringify()` keys
- **Widget visibility** — Always check `WidgetHelper_shouldHideWidget()` before rendering
- **Empty rendering** — Return `WidgetHelper_renderEmptyWidget()` for hidden widgets, never `null`
- **Fragment HTML** — Use `<Fragment set:html={} />` for conditional raw HTML
- **Environment checks** — Use `UtilsHelper_isDevelopmentMode()` for dev-only features
- **Image optimization** — Always use `RingImage` with `transform` prop, set `priority=true` for above-fold

---

## Performance Considerations

- **Create a new widget** → use `widget-developer` skill
- **Add a config param** → update `*WebsitesConfig.ts` (defaultParams + paramsDescription) and `types.ts`
- **Upgrade a dependency** → use `dependency-upgrader` skill
- **Modify caching** → check `CacheProvider`, `CacheHelper`, `CacheAdapterInterface` in `src/adapters/cache/`
- **Add a helper function** → follow `ModuleName_functionName` convention, export from `src/index.ts`
- **Add a renderless component** → create in `src/renderlessComponents/`, return data not HTML
- **Create/modify GraphQL query** → always check schema at `node_modules/@ringpublishing/graphql-api-client-got/lib/schemas/websites-api.graphql`
- Use appropriate cache TTL values
- Leverage cache tags for targeted invalidation
- Set `priority=true` for above-fold images (enables preloading)
- Use AcceleratorImagesHelper for image CDN transformations
- Minimize GraphQL query size (use only needed fragments)</content>
<parameter name="filePath">c:\Users\dpers\CSI\hat-ring-components\.github\copilot-instructions.md
