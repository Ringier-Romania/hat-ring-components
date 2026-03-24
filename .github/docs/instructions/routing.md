> **When to read:** You're adding pages, routes, API endpoints, or working with the content routing system.

## 1. Astro SSR Routing
HAT uses Astro in SSR mode (output: "server") with Node.js adapter. All pages are server-rendered.

## 2. Catch-All Route: [...path].astro
The main content route. Catches all URLs not handled by specific pages.

Flow:
1. Reads hatControllerParams from middleware (context.locals or Astro.request)
2. Extracts content type from gqlResponse.__typename
3. Maps to SiteContentType enum
4. Selects route component:
   - Story → routes/Story.astro
   - SiteNode → routes/SiteNode.astro
   - Author → routes/Author.astro
   - Topic → routes/Topic.astro
   - CustomAction → routes handler
   - Unknown → routes/NotHandled.astro (404)
5. Renders with Layout + Grid

## 3. Route Components (src/pages/routes/)
Each route component configures Grid for its content type:
```astro
---
// routes/Story.astro
const gridConfig = {
    containers: ['header', 'story_content', 'story_sidebar', 'footer'],
    boxes: ['box_top', 'box_left', 'box_middle', 'box_right', 'box_bottom']
};
---
<Layout context={context}>
    <Grid context={context} config={gridConfig} />
</Layout>
```

## 4. Homepage: index.astro
Separate from catch-all. Uses Homepage-specific grid configuration.

## 5. Special Pages
Pages outside the CMS content routing:
- **Search page** — Search results with custom query handling
- **Login/Auth pages** — Custom layout, no Grid (standalone forms)
- **Checkout/Payment** — Subscription flow pages
- **Admin pages** — hat-admin dashboard, grid editor, cache management
- **Cache management** — Clear cache by tag or partial key scan

## 6. API Endpoints (src/pages/api/)
Astro API routes for server-side functionality:
```typescript
// src/pages/api/example.ts
export async function POST({ request }) {
    const body = await request.json();
    // Process request...
    return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
```
Common patterns: authentication endpoints, payment processing, webhook handlers.

## 7. Feed Generation
`[...path].feed.ts` — Generates RSS/Atom feeds for content sections.

## 8. Layout.astro
The main layout wrapper. Responsibilities:
- Import global fonts
- Import globals.scss
- Render SEO metadata (title, description, OG, Schema.org, canonical)
- Version metadata injection
- Grid rendering
- Ad slot management
- Consent Management Platform (CMP)
- Service Worker registration

## 9. Static Assets
`public/` directory for static files (fonts, images, favicons). Served directly by Astro.

## 10. Adding Custom Pages
```astro
---
// src/pages/my-custom-page.astro
import Layout from "../layouts/Layout.astro";
// ... fetch data, build context
---
<Layout context={context}>
    <div>Custom page content</div>
</Layout>
```

For pages that don't need CMS Grid, skip the Grid component and render directly.

## 11. Middleware Path Filtering
Projects can skip BootServer processing for certain paths:
```typescript
omitBootServerPaths: ['/api/', '/my-custom-endpoint'],
earlyReturnRules: [
    { type: 'pathRegex', value: /^\/static\//, statusCode: 404 },
],
```
