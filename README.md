# Accessaurus

Accessaurus upgrades div‑soup into semantic, accessible HTML. Our SDK and API transform existing markup into proper landmarks and elements (header/nav/main/section/article/aside/footer, figure/figcaption, time, etc.) without changing your visual design. Metadata and JSON‑LD remain adjacent features.

It’s **server‑first**, **idempotent**, and **secure by design** (no secrets in the browser). When confidence is low, we return **`null`** or suggestions instead of guessing.

## Development (Bun)

- App (Next.js): `apps/app`
- Landing: `apps/landing`
- Install deps: `cd apps/app && bun install` and `cd apps/landing && bun install`
- Dev server: `cd apps/app && bun run dev`
- Build/Start: `bun run build` / `bun run start`
- Lint: `bun run lint`
- DB: `bun run db:generate` and `bun run db:migrate`

## Why teams use Accessaurus

* **Semantic upgrades, zero redesign:** preserve styles/components, improve structure.
* **Safer automation:** conservative heuristics + optional LLM with validation.
* **Efficient by design:** content hashing + perceptual hashing to skip trivial edits.
* **Better for everyone:** accessible for people with disabilities, accessible for AI.

## Core capabilities

### Semantic HTML Transformer (MVP)

Input: raw HTML (or server render)
Output: transformed HTML + change log with reasons
Rules: conservative, standards‑first heuristics; optional LLM suggestions (disabled by default)

Demo: run the app and open `/semantify`. API at `POST /api/semantify` with `{ html }` returns `{ html, stats }`.

### Meta Tag Writer (adjacent)

**Input:** page URL + canonical, primary H1, summary/body, brand rules, accessibility features, accessibility hazards
**Output:** `{ title, description, ogTitle, ogDescription, twitterCard, canonical }`
**Rules:** strict lengths; brand lexicon enforcement; duplicates avoided.

### Schema.org JSON‑LD Generator (adjacent)

**Input:** page type + content (Article/Product/Event/FAQ/HowTo), accessibility features, accessibility hazards
**Output:** validated JSON‑LD or `null` if required fields are missing/low confidence.
**Usage:** embed as a `<script type="application/ld+json">…</script>` server‑side.
