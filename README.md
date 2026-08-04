# ResortMarket

A guest-facing shopping experience for a resort: browse rooms, dining, spa, and excursion packages, filter and search them, add selections to a cart, and check out.

The backend is fully mocked on the client — there is no real server or database. All data is hardcoded and served through an HTTP interceptor shaped to mirror a typical NestJS API response, so the app can be developed and deployed entirely standalone.

## Features

- **Browse & filter** — category pills, debounced search, and pagination over a catalog of activities
- **Activity detail pages** — routed by ID, with graceful loading, not-found, and error states
- **Cart** — add/remove items, adjust quantities, persisted to `localStorage`, with a mock checkout flow
- **Server-side rendering** — hybrid rendering: static pages are prerendered at build time, the parameterized activity detail route renders on demand
- **Accessible by default** — keyboard-operable navigation, ARIA labeling on icon-only controls and toggles, visible focus states, and a sane heading hierarchy
- **Responsive layout** — Tailwind CSS breakpoints across the grid, header, and detail views

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Angular 22 (standalone components, Signals) |
| Async/state orchestration | RxJS, bridged to Signals via `toSignal`/`toObservable` |
| Styling | Tailwind CSS v4 |
| Rendering | Angular SSR (`@angular/ssr`), hybrid prerender/server-render per route |
| Testing | Vitest (Angular's native unit-test builder) |
| CI | GitHub Actions |
| Hosting | Vercel |

## Architecture

```
src/
  app/
    components/     # Reusable presentational components (ActivityCard, ActivityCategories)
    models/          # App-level (client-only) types, e.g. CartItem
    services/        # ActivityService, CartService
    views/           # Routed pages: Home, Activity (detail), Cart
  backend-mock/
    data/            # Hardcoded activity data
    interceptors/    # HttpInterceptor simulating a REST API
    models/          # NestJS-shaped response envelopes (NestResponse, PaginatedData)
```

State management follows one consistent pattern throughout: component-local state lives in Signals, anything requiring debouncing, cancellation, or combining multiple sources (search, filters, pagination, retries) is handled by RxJS operators, and the result is bridged back into a Signal for the template to read. Shared state that spans routes (the cart) lives in a Signal-based service instead of a component.

### The mock backend

Rather than standing up a real API, an `HttpInterceptor` intercepts requests to `/api/*` and returns hardcoded data wrapped in the same envelope shape a NestJS backend typically returns:

```ts
{
  statusCode: 200,
  message: "Success",
  data: {
    items: [...],
    meta: { totalItems, itemsPerPage, currentPage, totalPages }
  }
}
```

This keeps the HTTP client code, typed response models, and error handling identical to what they'd look like against a real backend — only the interceptor would need to be swapped out for real `HttpClient` calls.

## Getting started

### Prerequisites

- Node.js ≥ 22.22.3 (or ≥ 24.15.0 / ≥ 26.0.0)
- npm

### Install and run

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Available scripts

| Command | Description |
|---|---|
| `npm start` | Runs the dev server |
| `npm run build` | Production build (browser + SSR server bundle) |
| `npm test` | Runs the unit test suite |
| `npm run watch` | Development build in watch mode |

## Testing

Unit tests cover services (`ActivityService`, `CartService`), components (including router/HTTP-dependent ones via `provideRouter`/`provideHttpClientTesting`), and the cart's add/remove/update/checkout flows. Run them with:

```bash
npm test
```

## Deployment

Deployed on Vercel, which auto-detects the Angular SSR build and wraps the server bundle as a serverless function. Every push to `main` triggers a production deployment; every pull request gets its own preview URL. A GitHub Actions workflow (`.github/workflows/ci.yml`) runs the test suite and build on every push and PR.
