import { NextRequest } from 'next/server'
import { requireDb, schema } from '@/db'
import { and, desc, eq } from 'drizzle-orm'

function corsHeaders(origin?: string) {
  const allowOrigin = origin || '*'
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type, authorization, accept',
    'Access-Control-Max-Age': '600',
    Vary: 'Origin',
  }
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin') || '*'
  return new Response(null, { status: 204, headers: corsHeaders(origin) })
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin') || '*'
  try {
    const { searchParams } = new URL(req.url)
    const orgId = searchParams.get('orgId') || ''
    const pageUrl = searchParams.get('pageUrl') || ''
    const hash = searchParams.get('hash') || ''
    if (!orgId || !pageUrl) {
      return new Response(JSON.stringify({ error: 'Missing orgId or pageUrl' }), { status: 400, headers: corsHeaders(origin) })
    }
    const db = requireDb()
    let host: string
    try { host = new URL(pageUrl).hostname } catch { return new Response(JSON.stringify({ error: 'Invalid pageUrl' }), { status: 400, headers: corsHeaders(origin) }) }

    const pages = await db
      .select()
      .from(schema.pages)
      .where(and(eq(schema.pages.orgId, orgId), eq(schema.pages.url, pageUrl)))
      .limit(1)
    const page = pages[0]
    if (!page) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: corsHeaders(origin) })

    const baseCond = and(eq(schema.transforms.orgId, orgId), eq(schema.transforms.pageId, page.id))
    const transforms = await db
      .select()
      .from(schema.transforms)
      .where(hash ? and(baseCond, eq(schema.transforms.inputHash, hash)) : baseCond)
      .orderBy(desc(schema.transforms.createdAt))
      .limit(1)
    const t = transforms[0]
    if (!t) return new Response(JSON.stringify({ error: 'No transform' }), { status: 404, headers: corsHeaders(origin) })

    const outs = await db
      .select({ body: schema.outputs.body })
      .from(schema.outputs)
      .where(and(eq(schema.outputs.transformId, t.id), eq(schema.outputs.kind, 'semantic_html')))
      .limit(1)
    const out = outs[0]
    if (!out) return new Response(JSON.stringify({ error: 'No output' }), { status: 404, headers: corsHeaders(origin) })
    return new Response(JSON.stringify(out.body), { status: 200, headers: { ...corsHeaders(origin), 'content-type': 'application/json' } })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Unknown error' }), { status: 500, headers: corsHeaders(origin) })
  }
}
