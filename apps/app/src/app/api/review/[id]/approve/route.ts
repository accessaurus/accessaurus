import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { requireDb, schema } from '@/db'
import { eq } from 'drizzle-orm'

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId, orgId } = await auth()
  if (!userId || !orgId) return new Response('Unauthorized', { status: 401 })
  const { id } = await params
  const db = requireDb()
  const t = await db
    .select({ id: schema.transforms.id, orgId: schema.transforms.orgId })
    .from(schema.transforms)
    .where(eq(schema.transforms.id, id))
    .limit(1)
  if (!t[0]) return new Response('Not found', { status: 404 })
  if (t[0].orgId !== orgId) return new Response('Forbidden', { status: 403 })
  await db
    .update(schema.transforms)
    .set({ reviewStatus: 'approved', reviewerId: userId, reviewedAt: new Date() })
    .where(eq(schema.transforms.id, id))
  return new Response(null, { status: 204 })
}
