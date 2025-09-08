# Accessaurus

**Accessaurus** is a drop‑in SDK for **Next.js & Web** that generates:

* **SEO meta** (title, description, social cards),
* **Schema.org JSON‑LD** (Article/Product/Event/FAQ/HowTo),
* **WCAG compliant** (accessibility features, accessibility hazards).

It’s **multi‑tenant**, **idempotent**, and **secure by design** (no secrets in the browser). When inputs are incomplete or confidence is low, it returns **`null`** instead of guessing.

## Why teams use Accessaurus

* **Fewer manual edits:** consistent titles/descriptions and validated JSON‑LD.
* **Safer automation:** schema‑validated outputs; no hallucinated facts.
* **Efficient by design:** deduped by content hash + perceptual hashing; skips trivial recomputation.
* **Better for everyone:** accessible for people with disabilities, accessible for AI.

## Core capabilities

### Meta Tag Writer

**Input:** page URL + canonical, primary H1, summary/body, brand rules, accessibility features, accessibility hazards
**Output:** `{ title, description, ogTitle, ogDescription, twitterCard, canonical }`
**Rules:** strict lengths; brand lexicon enforcement; duplicates avoided.

### Schema.org JSON‑LD Generator

**Input:** page type + content (Article/Product/Event/FAQ/HowTo), accessibility features, accessibility hazards
**Output:** validated JSON‑LD or `null` if required fields are missing/low confidence.
**Usage:** embed as a `<script type="application/ld+json">…</script>` server‑side.
