import { NextRequest } from 'next/server'
import { requireDb, schema } from '@/db'
import { simhash64 } from '@/lib/hash/simhash'
import { semantifyHtml } from '@/lib/semantify/transform'
import { llmSemantifyHtml } from '@/lib/llm/semantify'
import { ollamaSemantifyHtml } from '@/lib/llm/semantify-ollama'
import { createTwoFilesPatch } from 'diff'
import { and, desc, eq } from 'drizzle-orm'
import { computeMetrics } from '@/lib/semantify/metrics'

function corsHeaders(origin?: string) {
  const allowOrigin = origin || '*'
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type, authorization, accept',
    'Access-Control-Max-Age': '600',
    Vary: 'Origin',
  }
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin') || '*'
  return new Response(null, { status: 204, headers: corsHeaders(origin) })
}

export async function POST(req: NextRequest) {
  try {
    const { orgId, pageUrl, html, skeleton, hash } = await req.json()
    if (!orgId || !pageUrl || !html) {
      return new Response(JSON.stringify({ error: 'Missing orgId, pageUrl or html' }), { status: 400, headers: corsHeaders(req.headers.get('origin') || '*') })
    }
    const skel = typeof skeleton === 'string' && skeleton ? String(skeleton) : undefined
    const inputHash = (typeof hash === 'string' && hash) || simhash64(skel || String(html))

    const db = requireDb()

    // Basic domain verification for org
    let host: string
    try {
      host = new URL(pageUrl).hostname
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid pageUrl' }), { status: 400, headers: corsHeaders(req.headers.get('origin') || '*') })
    }
    const allowDev = host === 'localhost' || host === '127.0.0.1'
    if (!allowDev) {
      const verified = await db
        .select({ id: schema.domains.id })
        .from(schema.domains)
        .where(and(eq(schema.domains.orgId, orgId), eq(schema.domains.domain, host), eq(schema.domains.verified, true)))
        .limit(1)
      if (!verified[0]) {
        return new Response(JSON.stringify({ error: 'Domain not verified', domain: host }), { status: 403, headers: corsHeaders(req.headers.get('origin') || '*') })
      }
    }

    // Upsert page by orgId + url (simplified)
    const existingPages = await db
      .select()
      .from(schema.pages)
      .where(and(eq(schema.pages.orgId, orgId), eq(schema.pages.url, pageUrl)))
      .limit(1)

    let page = existingPages[0]
    if (!page) {
      const inserted = await db
        .insert(schema.pages)
        .values({ orgId, url: pageUrl, title: null, type: null, contentHash: inputHash })
        .returning()
      page = inserted[0]
    }

    // Check if we already transformed this exact input
    const existingTransforms = await db
      .select()
      .from(schema.transforms)
      .where(and(eq(schema.transforms.orgId, orgId), eq(schema.transforms.pageId, page.id), eq(schema.transforms.inputHash, inputHash)))
      .orderBy(desc(schema.transforms.createdAt))
      .limit(1)

    if (existingTransforms[0]) {
      return new Response(JSON.stringify({ status: 'cached', transformId: existingTransforms[0].id }), { status: 200, headers: corsHeaders(req.headers.get('origin') || '*') })
    }

    // Create transform row (queued)
    const [transform] = await db
      .insert(schema.transforms)
      .values({ orgId, pageId: page.id, inputHash, engine: process.env.SEMANTIFY_ENABLE_LLM ? 'llm' : 'heuristics', status: 'running' })
      .returning()

    try {
      // Choose engine
      const useLlm = String(process.env.SEMANTIFY_ENABLE_LLM || '').toLowerCase() === 'true'
      const provider = String(process.env.SEMANTIFY_LLM_PROVIDER || 'openai').toLowerCase()
      let upgraded = ''
      let changes: { from: string; to: string; reason: string }[] = []
      if (useLlm) {
        const out = provider === 'ollama' ? await ollamaSemantifyHtml(skeleton) : await llmSemantifyHtml(skeleton)
        upgraded = out.html
        changes = out.changes || []
      } else {
      const result = await semantifyHtml(String(html))
        upgraded = result.html
        changes = result.stats?.changes || []
      }
      const patch = createTwoFilesPatch('original.html', 'semantic.html', String(html), upgraded)
      const metrics = computeMetrics(upgraded)

      // Store outputs
      await db.insert(schema.outputs).values({ transformId: transform.id, kind: 'semantic_html', body: { html: upgraded, patch }, confidence: null })
      await db.insert(schema.outputs).values({ transformId: transform.id, kind: 'metrics', body: metrics, confidence: null })
      if (changes.length) {
        await db.insert(schema.changes).values(
          changes.map((c) => ({ transformId: transform.id, fromTag: c.from, toTag: c.to, reason: c.reason || '', confidence: null }))
        )
      }

      await db.update(schema.transforms).set({ status: 'success' }).where(eq(schema.transforms.id, transform.id))
      return new Response(JSON.stringify({ status: 'ok', transformId: transform.id }), { status: 200, headers: corsHeaders(req.headers.get('origin') || '*') })
    } catch (e: any) {
      await db.update(schema.transforms).set({ status: 'failed', error: e?.message || 'transform failed' }).where(eq(schema.transforms.id, transform.id))
      return new Response(JSON.stringify({ error: e?.message || 'transform failed' }), { status: 500, headers: corsHeaders(req.headers.get('origin') || '*') })
    }
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? 'Unknown error' }), { status: 500, headers: corsHeaders(req.headers.get('origin') || '*') })
  }
}
