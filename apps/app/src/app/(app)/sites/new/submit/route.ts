import { NextRequest } from 'next/server'
import { requireDb, schema } from '@/db'
import { auth } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  const { orgId } = await auth()
  if (!orgId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const form = await req.formData()
  const url = String(form.get('url') || '')
  const name = String(form.get('name') || '')
  if (!url) {
    return new Response('Missing url', { status: 400 })
  }
  try {
    new URL(url)
  } catch {
    return new Response('Invalid url', { status: 400 })
  }

  const db = requireDb()
  const existing = await db
    .select({ id: schema.pages.id })
    .from(schema.pages)
    .where(and(eq(schema.pages.orgId, orgId), eq(schema.pages.url, url)))
    .limit(1)

  let pageId: string
  if (existing[0]) {
    pageId = existing[0].id
  } else {
    const inserted = await db
      .insert(schema.pages)
      .values({ orgId, url, title: name || null, type: 'site', contentHash: 'init' })
      .returning({ id: schema.pages.id })
    pageId = inserted[0].id
  }

  return new Response(null, {
    status: 303,
    headers: { Location: `/site/${pageId}` },
  })
}

