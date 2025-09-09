import { requireDb, schema } from '@/db'
import { and, eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { ReviewActions } from '../ReviewActions'
import { Heading, Subheading } from '@/components/heading'

export default async function ReviewPage({ params }: { params: Promise<{ id: string; tid: string }> }) {
  const { id, tid } = await params
  const db = requireDb()
  const t = await db
    .select()
    .from(schema.transforms)
    .where(and(eq(schema.transforms.id, tid), eq(schema.transforms.pageId, id)))
    .limit(1)
  const transform = t[0]
  if (!transform) notFound()
  const outs = await db
    .select({ body: schema.outputs.body })
    .from(schema.outputs)
    .where(and(eq(schema.outputs.transformId, transform.id), eq(schema.outputs.kind, 'semantic_html')))
    .limit(1)
  const out = outs[0]
  const changes = await db
    .select({ fromTag: schema.changes.fromTag, toTag: schema.changes.toTag, reason: schema.changes.reason })
    .from(schema.changes)
    .where(eq(schema.changes.transformId, transform.id))

  const patch = (out?.body as any)?.patch as string | undefined

  return (
    <div className="space-y-6">
      <Heading>Review Transform</Heading>
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-500">Transform ID: {transform.id}</div>
        <ReviewActions transformId={transform.id} pageId={id} />
      </div>
      <div>
        <Subheading>Changes</Subheading>
        {changes.length ? (
          <ul className="mt-3 list-disc pl-6 text-sm space-y-1">
            {changes.map((c, i) => (
              <li key={i}><code>{c.fromTag}</code> → <code>{c.toTag}</code>{c.reason ? ` — ${c.reason}` : ''}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-zinc-500">No individual changes recorded.</p>
        )}
      </div>
      <div>
        <Subheading>Patch</Subheading>
        <pre className="mt-3 whitespace-pre-wrap rounded-md border border-zinc-200 bg-zinc-50 p-3 text-xs overflow-auto">
{patch || 'No patch available.'}
        </pre>
      </div>
    </div>
  )
}

