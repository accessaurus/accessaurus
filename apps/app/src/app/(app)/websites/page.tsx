import { Badge } from '@/components/badge'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { requireDb, schema, ContentItemRowZ, GenerationStatusZ, type GenerationStatus } from '@/db'
import { desc, eq, inArray } from 'drizzle-orm'

export const metadata = {
  title: 'Websites',
}

type Row = {
  id: string
  url: string
  title: string | null
  createdAt: Date
  schemaType: string | null
  status: 'new' | GenerationStatus
}


export default async function Websites() {
  const db = requireDb()
  let rows: Row[] = []
  {
    const websitesRaw = await db
      .select({
        id: schema.contentItems.id,
        url: schema.contentItems.url,
        title: schema.contentItems.title,
        createdAt: schema.contentItems.createdAt,
      })
      .from(schema.contentItems)
      .orderBy(desc(schema.contentItems.createdAt))
      .limit(50)
    const websites = ContentItemRowZ.array().parse(websitesRaw)

    const ids = websites.map((w) => w.id)
    let schemaMap = new Map<string, string | null>()
    let statusMap = new Map<string, GenerationStatus | 'new'>()

    if (ids.length) {
      const gens = await db
        .select({
          id: schema.generations.id,
          contentItemId: schema.generations.contentItemId,
          status: schema.generations.status,
          createdAt: schema.generations.createdAt,
        })
        .from(schema.generations)
        .where(inArray(schema.generations.contentItemId, ids))
        .orderBy(desc(schema.generations.createdAt))

      for (const g of gens) if (!statusMap.has(g.contentItemId)) statusMap.set(g.contentItemId, GenerationStatusZ.parse(g.status))

      const outs = await db
        .select({
          contentItemId: schema.generations.contentItemId,
          body: schema.outputs.body,
        })
        .from(schema.outputs)
        .innerJoin(schema.generations, eq(schema.outputs.generationId, schema.generations.id))
        .where(inArray(schema.generations.contentItemId, ids))

      for (const o of outs) if (!schemaMap.has(o.contentItemId)) {
        const b: any = o.body as any
        const t = (b && (b['@type'] || b.type)) as string | undefined
        schemaMap.set(o.contentItemId, t ?? null)
      }
    }

    rows = websites.map((w) => ({
      id: w.id,
      url: w.url,
      title: w.title,
      createdAt: w.createdAt,
      schemaType: schemaMap.get(w.id) ?? null,
      status: (statusMap.get(w.id) ?? 'new') as GenerationStatus | 'new',
    }))
  }

  return (
    <>
      <div className="flex items-end justify-between">
        <Heading>Websites</Heading>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>
      <Subheading className="mt-8">Recent activity</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Page</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Schema</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} href={`/websites/${row.id}`} title={row.title ?? row.url}>
              <TableCell>
                <div className="max-w-xs truncate">
                  <span className="font-medium">{row.title ?? row.url}</span>
                  <div className="text-xs text-zinc-500 truncate">{row.url}</div>
                </div>
              </TableCell>
              <TableCell className="text-zinc-500">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge color={row.schemaType ? 'lime' : 'zinc'}>
                  {row.schemaType || 'None'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge color={row.status === 'success' ? 'lime' : row.status === 'queued' || row.status === 'running' ? 'amber' : 'zinc'}>
                  {row.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
