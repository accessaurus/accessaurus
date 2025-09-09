import { Badge } from '@/components/badge'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { requireDb, schema, PageRowZ, TransformStatusZ, type TransformStatus } from '@/db'
import { desc, eq, inArray } from 'drizzle-orm'

export const metadata = {
  title: 'Websites',
}

type Row = {
  id: string
  url: string
  title: string | null
  createdAt: Date
  status: 'new' | TransformStatus
}


export default async function Websites() {
  const db = requireDb()
  let rows: Row[] = []
  {
    const websitesRaw = await db
      .select({
        id: schema.pages.id,
        url: schema.pages.url,
        title: schema.pages.title,
        createdAt: schema.pages.createdAt,
      })
      .from(schema.pages)
      .orderBy(desc(schema.pages.createdAt))
      .limit(50)
    const websites = PageRowZ.array().parse(websitesRaw)

    const ids = websites.map((w) => w.id)
    let statusMap = new Map<string, TransformStatus | 'new'>()

    if (ids.length) {
      const gens = await db
        .select({
          id: schema.transforms.id,
          pageId: schema.transforms.pageId,
          status: schema.transforms.status,
          createdAt: schema.transforms.createdAt,
        })
        .from(schema.transforms)
        .where(inArray(schema.transforms.pageId, ids))
        .orderBy(desc(schema.transforms.createdAt))

      for (const g of gens) if (!statusMap.has(g.pageId)) statusMap.set(g.pageId, TransformStatusZ.parse(g.status))
    }

    rows = websites.map((w) => ({
      id: w.id,
      url: w.url,
      title: w.title,
      createdAt: w.createdAt,
      status: (statusMap.get(w.id) ?? 'new') as TransformStatus | 'new',
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
