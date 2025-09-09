import { NextRequest } from 'next/server'
import { requireDb, schema } from '@/db'
import { auth } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const { orgId } = await auth()
  if (!orgId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const id = params.id
  const db = requireDb()

  const deleted = await db
    .delete(schema.pages)
    .where(and(eq(schema.pages.id, id), eq(schema.pages.orgId, orgId)))
    .returning({ id: schema.pages.id })

  if (!deleted[0]) {
    return new Response('Not Found', { status: 404 })
  }

  return new Response(null, {
    status: 303,
    headers: { Location: '/sites' },
  })
}

export async function DELETE(req: NextRequest, ctx: { params: { id: string } }) {
  // Support DELETE method alongside POST for API completeness
  return POST(req, ctx)
}

