# Accessaurus — Developer Onboarding

Welcome! This guide orients new contributors to the pivoted Accessaurus platform focused on AI‑assisted semantic HTML transformation.

## TL;DR

- Goal: Upgrade div‑soup into semantic, accessible HTML (header/nav/main/section/article/aside/footer, figure/figcaption, time, etc.) without changing visual design.
- Flow: Browser SDK strips page → skeleton/minify → SimHash → POST ingest → server transforms HTML (heuristics or LLM) → stores upgraded HTML and a unified diff patch → subsequent loads with same hash are cached.
- Tenancy: Clerk Organization ID (`org_id`), no local tenants table.
- Tech: Next.js (apps/app), SDK package (packages/sdk), Postgres + Drizzle ORM, Bun as the package runner, optional LLM provider (OpenAI or Ollama).

## Key Docs

- ADR‑0001: docs/adr/0001.md — Canonical architecture for semantic transformer (read this first).
- This file: docs/ONBOARDING.md — Practical setup and code pointers.

## Repo Structure

- apps/
  - app/ — Main dashboard + API (Next.js App Router)
    - src/app/api/sdk/ingest/route.ts — ingest endpoint (CORS + domain gating + transform)
    - src/app/api/sdk/snippet/route.ts — serves the browser snippet
    - src/lib/semantify/transform.ts — heuristics‑only semantic transformer (MVP)
    - src/lib/llm/semantify.ts — OpenAI LLM implementation (JSON‑bounded)
    - src/lib/llm/semantify-ollama.ts — Ollama LLM implementation (JSON‑bounded)
    - src/lib/hash/simhash.ts — 64‑bit SimHash helper
    - src/db/schema.ts — Drizzle schema (org‑scoped), migrations in apps/app/drizzle
    - src/app/(app)/sites/* — “My Sites” UI (list, detail, add)
  - landing/ — Marketing site (Next.js)
  - demo/ — Demo site to test cross‑origin ingest (Next.js @ 3200)
- packages/
  - sdk/ — Browser snippet + React tag
    - snippet.js — standalone script tag payload
    - src/index.ts — `toSkeleton`, `minifyHtml`, `simhash64`, `collectAndSend`
    - src/react.tsx — `<Accessaurus orgId="..." />`
- docs/adr — Architecture Decision Records

## Setup

Prereqs
- Bun 1.2.x, Node 20.x available (Moon config pins Node 20)
- Docker (optional) for local Postgres

Install
- App: `cd apps/app && bun install`
- Landing: `cd apps/landing && bun install`
- Demo: `cd apps/demo && bun install`

Environment (.env in apps/app)
- Clerk:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- Database:
  - `DATABASE_URL=postgres://postgres:postgres@localhost:5432/accessaurus`
- LLM (optional):
  - `SEMANTIFY_ENABLE_LLM=true|false`
  - `SEMANTIFY_LLM_PROVIDER=openai|ollama`
  - OpenAI: `OPENAI_API_KEY`, `SEMANTIFY_LLM_MODEL=gpt-4o-mini`
  - Ollama: `OLLAMA_HOST=https://ollama.com`, `OLLAMA_API_KEY`, `OLLAMA_MODEL=gpt-oss:120b`

Database
- Start Postgres (Docker): `cd apps/app && bun run db:up`
- Generate migrations: `bun run db:generate`
- Apply migrations: `bun run db:migrate`

Run
- API/Dashboard app (port 3000): `cd apps/app && bun run dev`
- Demo site (port 3200): `cd apps/demo && bun run dev`

## Product Flow

1) Add Site (Dashboard)
- Go to `/sites/new` and paste your site root URL, optional name.
- Copy either integration snippet:
  - Script tag: `<script async src="${APP_URL}/api/sdk/snippet" data-org="<your-org-id>">`
  - React tag: `<Accessaurus orgId="<your-org-id>" />`

2) Browser SDK (on customer site)
- Removes classes/styles/scripts; keeps structure and text → “skeleton”
- Minifies; computes 64‑bit SimHash
- Sends `{ orgId, pageUrl, html, hash }` to `/api/sdk/ingest`

3) Server Transform (Ingest)
- Validates domain (must be verified for org, except localhost in dev)
- Caches by `(orgId, pageId, inputHash)` to skip duplicate work
- Engine selection:
  - Heuristics (default): deterministic tag upgrades
  - LLM (flagged): OpenAI or Ollama; JSON‑schema bounded; low‑temp
- Stores:
  - outputs(kind='semantic_html'): `{ html, patch }` where `patch` is a unified diff
  - changes: list of `{ from, to, reason }`

4) Subsequent Loads
- Same SimHash → short‑circuit (`status: 'cached'`)

## Data Model (org‑scoped)

- pages(id, org_id, url, title, type, content_hash, created_at, updated_at)
- transforms(id, org_id, page_id, input_hash, idempotency_key, engine, status, error, created_at, completed_at)
- outputs(id, transform_id, kind['semantic_html','metrics'], body jsonb, confidence, created_at)
- changes(id, transform_id, from_tag, to_tag, reason, confidence, created_at)
- domains(id, org_id, domain, verified, verification_token, created_at)
- api_keys(id, org_id, name, key_hash, last_used_at, revoked_at, created_at)
- usage_logs(id, org_id, page_id?, transform_id?, event, meta, created_at)

## APIs

- GET `/api/sdk/snippet` — serves packages/sdk/snippet.js
- OPTIONS/POST `/api/sdk/ingest`
  - Input JSON: `{ orgId, pageUrl, html, hash? }`
  - Status codes:
    - 200 ok/cached, 403 domain not verified, 400 invalid input
  - CORS: allowed; `Access-Control-Allow-Origin` echoes Origin; `Allow-Credentials:true`

## SDK Usage

- Script tag (no bundler):
```html
<script async src="https://app.example.com/api/sdk/snippet" data-org="YOUR_ORG_ID"></script>
```
- React tag (bundled):
```tsx
import { Accessaurus } from '@accessaurus/sdk/react'

export default function RootLayout() {
  return (
    <>
      <Accessaurus orgId="YOUR_ORG_ID" />
      {/* your app */}
    </>
  )
}
```

## LLM Provider

- Enable: `SEMANTIFY_ENABLE_LLM=true`
- Provider choice: `SEMANTIFY_LLM_PROVIDER=openai|ollama`
- OpenAI model: `SEMANTIFY_LLM_MODEL` (default `gpt-4o-mini`)
- Ollama model: `OLLAMA_MODEL` (default `gpt-oss:120b`) and `OLLAMA_HOST`
- Output is validated via Zod to ensure a strict JSON shape `{ html, changes[] }`

## Developer Pointers

- Heuristics transformer: apps/app/src/lib/semantify/transform.ts
- LLM wrappers: apps/app/src/lib/llm/semantify(.ts), semantify-ollama.ts
- Ingest handler: apps/app/src/app/api/sdk/ingest/route.ts
- Browser snippet: packages/sdk/snippet.js
- React SDK: packages/sdk/src/react.tsx
- SimHash: apps/app/src/lib/hash/simhash.ts
- Sites UI: apps/app/src/app/(app)/sites/* and /site/[id]

## Domain Verification (basic)

- Non‑localhost ingests require a verified domain row in `domains` with `verified=true` for the org.
- Dev bypass: localhost and 127.0.0.1 are allowed.
- UI for verification is TBD (token flow); currently add rows directly if needed.

## Troubleshooting

- CORS from demo (3200 → 3000): ensure API is running; OPTIONS returns `Access-Control-Allow-Origin` echoing demo origin and `Allow-Credentials:true`.
- “Domain not verified”: add a row in `domains` for `{ orgId, domain, verified:true }` or test via localhost.
- DB errors: ensure `DATABASE_URL` is set; run `bun run db:migrate`.
- LLM failures: verify provider env, disable with `SEMANTIFY_ENABLE_LLM=false` to fall back on heuristics.

## Roadmap (near‑term)

- Domain Verification UI (token creation + verify)
- Review UI (view patch, per‑change log, approve/reject)
- Metrics dashboard (semantic coverage, heading outline, landmarks)
- Package build/publish for `@accessaurus/sdk`

---
Questions? Start a discussion in the repo or ping in the team channel.

