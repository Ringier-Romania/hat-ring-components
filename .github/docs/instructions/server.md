> **When to read:** You're configuring server behavior, middleware, headers, health checks, or the request processing pipeline.

## 1. BootServer Class
The core server class from `hat-server`. Handles all request-level processing before Astro renders.

### Constructor Options:
```typescript
new BootServer({
    useDefaultHeaders: true,           // X-Content-Type-Options: nosniff
    useWebsitesAPIRedirects: true,     // Handle CMS redirects
    useHatControllerParams: true,      // Build and attach controller params
    useWebsitesAPI: true,              // Query Ring CMS
    useAccRdl: true,                   // Analytics header (x-acc-rdl)
    enableDebug: false,                // Console logging
    healthCheckPathname: '/_healthcheck',
    gotClientTimeout: 10000,           // GQL timeout (ms)
    use304Functionality: false,        // ETag support
    use304FunctionalityTTL_IN_SECONDS: 86400,
    onRequest: (req, res) => {},       // Custom request hook
    additionalDataInHatControllerParams: (gqlResponse) => ({}),  // Extend params
    shouldMakeRequestToWebsiteAPIOnThisRequest: (req, defaultValue) => defaultValue,
    prepareCustomGraphQLQueryToWebsiteAPI: (url, variantId, defaultQuery) => defaultQuery,
    cacheProvider: CacheService,       // Custom cache implementation
});
```

## 2. MiddlewareHelper_processRequest
Main middleware entry point:
```typescript
await MiddlewareHelper_processRequest({
    context,                // Astro request context
    next,                   // Next middleware / render function
    MonitoringProvider?,    // Optional monitoring
    bootServerOptions,      // BootServer constructor options
    omitBootServerPaths?,   // Paths to skip (array of strings)
    earlyReturnRules?,      // Rules for early HTTP responses
});
```

### Early Return Rules:
```typescript
earlyReturnRules: [
    { type: 'extensions', value: '.php', statusCode: 404 },           // Block file types
    { type: 'queryParams', key: 'param', value: 'blocked', statusCode: 404 },
    { type: 'pathRegex', value: /pattern/, statusCode: 404 },
]
```

## 3. Request Lifecycle
```
1. Middleware receives request
2. Check early return rules → 404/403 if matched
3. Check omitBootServerPaths → skip if matched
4. Create BootServer instance
5. applyMiddlewareBefore():
   a. Health check (/_healthcheck) → 200 or 503 (if <200MB free memory)
   b. Parse URL, query params, headers
   c. Extract: x-websites-config-variant, x-domain, host
   d. Call onRequest hook
   e. Call Website API (if enabled)
   f. Apply 304 functionality (if enabled)
   g. Build RingDataLayer
   h. Build HatControllerParams
6. next() → Astro renders page
7. applyMiddlewareAfter():
   a. Permissions-Policy header (if ACC endpoint configured)
   b. Content-length header (production only)
```

## 4. Environment Variables

### Required:
```
WEBSITE_API_PUBLIC              # GraphQL public key
WEBSITE_API_SECRET              # GraphQL secret key
WEBSITE_API_NAMESPACE_ID        # CMS namespace UUID
NEXT_PUBLIC_WEBSITE_DOMAIN      # Website domain (https://...)
```

### Optional:
```
PORT                                    # Server port (default: 4321)
NODE_ENV                                # Environment mode
HAT_SERVER_WEBSITE_API_TTL             # Cache TTL seconds (default: 60)
HAT_SERVER_SHOW_URLS_IN_CONSOLE       # Debug URL logging (default: false)
RESPONSE_HEADER_CACHE_CONTROL_MAX_AGE  # Cache-Control max-age (default: 60)
GQL_CACHE_RESET_INTERVAL_SECONDS       # GQL cache reset interval (default: 300)
NEXT_PUBLIC_ACC_IMAGES_ENDPOINT        # Images CDN endpoint
ONET_SEGMENT                           # CDE app start support
```

## 5. Health Check
Default path: `/_healthcheck`
- Returns 200 "ok" if system healthy
- Returns 503 if free memory < 200MB
- Path configurable via `healthCheckPathname`

## 6. 304 Not Modified / ETag
When `use304Functionality: true`:
- ETag = `${content_revision}${floor(currentTime / TTL)}`
- If request `If-None-Match` matches ETag → return 304 (no body)
- TTL configurable: `use304FunctionalityTTL_IN_SECONDS` (default: 86400 = 24h)

## 7. RingDataLayer (Analytics)
Encodes content metadata into `x-acc-rdl` header for Ring Publishing analytics:
```typescript
rdl = {
    content: {
        object: { id, type, kind },      // type: 'story'|'list'|'person'|'topic'|...
        source: { system: 'ring_content_space', id: contentSpaceId },
        publication: { point: { id } }
    },
    context: {
        publication_structure: { root, path }  // From breadcrumbs
    }
}
// Encoded as base64 in x-acc-rdl header
```
Type mapping: Story→'story', SiteNode→'list', Author→'person', Topic→'topic', Source→'contentsource', CustomAction→'wildcard'.

## 8. Default Headers
- `X-Content-Type-Options: nosniff` (when useDefaultHeaders: true)
- `Permissions-Policy: ch-ect=(self "https://...")` (when ACC endpoint configured)
- `Accept-CH: ect` (when ACC endpoint configured)
- `Cache-Control: max-age=60` (for redirects)

## 9. Project Middleware Configuration
Projects configure middleware in `src/middleware.ts`:
```typescript
import { MiddlewareHelper_processRequest } from "hat-server";

export const onRequest = async (context, next) => {
    // Custom early returns
    if (shouldSkipBoot(context.url)) return next();

    // GQL cache reset (periodic)
    resetGqlCacheIfNeeded();

    return MiddlewareHelper_processRequest({
        context, next,
        bootServerOptions: { /* BootServer config */ },
        omitBootServerPaths: ['/api/', '/static/'],
        earlyReturnRules: [
            { type: 'extensions', value: '.php', statusCode: 404 },
        ],
    });
};
```

## 10. Default Request Filtering
BootServer automatically skips API calls for:
- Requests without URL
- Internal `_next` paths
- `favicon.ico`

Custom filtering via `shouldMakeRequestToWebsiteAPIOnThisRequest` hook.
