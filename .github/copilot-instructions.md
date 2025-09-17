# AI Coding Guidelines for hat-ring-components

## Project Overview
This is an Astro-based component library for Ring Publishing's Head App Template (HAT) system. It provides reusable UI components, widgets, and utilities for building publishing websites with features like stories, grids, SEO optimization, and caching.

## Architecture Patterns

### Component Structure
- **Astro Components**: Use `.astro` files with TypeScript frontmatter for server-side rendering
- **Widget System**: Extend `BasicWidget.astro` for data-driven components with platform-specific rendering
- **Grid Layout**: Use `Grid.astro` with containers and boxes for responsive layouts
- **Helper Functions**: Pure utility functions in `/helpers/` for shared logic

### Key Architectural Decisions
- **Provider Pattern**: Services like `CacheProvider`, `WebsiteApiProvider` use static methods
- **Adapter Pattern**: Cache implementations abstracted through `CacheAdapterInterface`
- **Configuration-Driven**: Widget behavior controlled by `widgetConfig` objects
- **Environment Toggles**: Features switch based on env vars (`USE_REDIS`, `CACHE_TTL`)

## Development Workflow

### Build Commands
```bash
npm run build    # TypeScript compilation with React JSX
npm run run      # Watch mode compilation
```

### Environment Variables
- `CACHE_TTL`: Cache expiration time (default: 60 seconds)
- `USE_REDIS`: Enable Redis cache (set to '1')
- `CONFIGURATION_TEMPLATE_NAME`: Template identifier for admin interface

## Coding Patterns & Conventions

### Widget Components
```typescript
// Basic widget structure
const {context, widgetConfig} = Astro.props;
if (WidgetHelper_shouldHideWidget(widgetConfig, context)) {
    return WidgetHelper_renderEmptyWidget(widgetConfig);
}
// Data fetching and rendering logic
```

### Cache Usage
```typescript
// Always JSON.stringify keys
const key = JSON.stringify({type: 'story', id: storyId});
await CacheProvider.set(key, data, TTL, ['story', 'content']);
const cached = await CacheProvider.get(key);
```

### CSS Classes
```typescript
// Dynamic class generation
const cssClasses = WidgetHelper_getWidgetCssClasses(
    'StoryTitle', widgetConfig, context, ['custom-class']
);
```

### GraphQL Queries
```typescript
const query = gql`
    query($nodeID: ID!, $variant: ID!){
        node(id: $nodeID){
            config(variantId: $variant){
                sectionName:config(codeName: "sectionName"){ data }
            }
        }
    }
`;
```

## Component Categories

### Widgets (`/components/widgets/`)
- **Story Components**: `StoryTitle`, `StoryContent`, `StoryAuthors`
- **List Components**: `GenericList`, `TopicTitle`
- **Common Widgets**: `BasicWidget`, `Slider`, `SearchBox`

### Common Components (`/components/common/`)
- **RingImage**: Image component with transform support
- **TextReplacer**: Content manipulation
- **SafeHead**: Head tag management

### SEO Components (`/components/seo/`)
- **SchemaOrg**: Structured data
- **Meta Tags**: All SEO meta tag components

## Data Flow Patterns

### Context Propagation
```typescript
interface AppContext {
    siteContentType: SiteContentType,
    id: string,
    url: string,
    customData: any,
    hatControllerParams: any
}
```

### Widget Configuration
```typescript
interface AbstractWidgetConfig {
    platformDesktop?: boolean,
    platformMobile?: boolean,
    customClass?: string,
    customWidth?: number
}
```

## Testing & Validation

### Widget Visibility Logic
- Check `platformDesktop`/`platformMobile` flags against context
- Use `gridLocation` query param for debugging
- Hide widgets with `HideWhenNoSectionItems` option when no data

### Cache Validation
- TTL defaults to 60 seconds unless overridden
- Cache disabled when `CACHE_TTL=0`
- Keys are JSON.stringified for consistency

## File Organization

### Key Directories
- `/src/components/widgets/`: Feature-specific components
- `/src/helpers/`: Utility functions
- `/src/providers/`: Service providers
- `/src/adapters/cache/`: Cache implementation adapters
- `/src/configs/`: Configuration schemas
- `/src/types/`: TypeScript interfaces

### Export Pattern
```typescript
// src/index.ts - Main exports
export { default as StoryTitle } from "./components/widgets/Story/StoryTitle/StoryTitle.astro";
export * from "./helpers/WidgetHelper";
```

## Common Pitfalls

### Cache Key Consistency
- Always use `JSON.stringify()` for cache keys
- Include relevant identifiers (type, id, variant)

### Widget Rendering
- Check `WidgetHelper_shouldHideWidget()` before rendering
- Return `WidgetHelper_renderEmptyWidget()` for hidden widgets
- Use `Fragment set:html={}` for conditional HTML rendering

### Environment Checks
- Use `UtilsHelper_isDevelopmentMode()` for dev-only features
- Check `process.env` variables before using features

## Performance Considerations

### Image Optimization
- Use `RingImage` component with `transform` prop for resizing
- Set `priority=true` for above-the-fold images
- Automatic WebP/AVIF generation via AcceleratorImagesHelper

### Cache Strategy
- Use appropriate TTL values based on content freshness needs
- Leverage cache tags for bulk invalidation
- Consider cache size limits for large datasets</content>
<parameter name="filePath">c:\Users\dpers\CSI\hat-ring-components\.github\copilot-instructions.md