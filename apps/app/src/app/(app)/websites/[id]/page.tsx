import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Heading, Subheading } from '@/components/heading'
import { Link } from '@/components/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { requireDb, schema, PageRowZ, TransformZ } from '@/db'
import { desc, eq } from 'drizzle-orm'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const db = requireDb()
  const website = await db
    .select({ id: schema.pages.id, url: schema.pages.url, title: schema.pages.title, createdAt: schema.pages.createdAt })
    .from(schema.pages)
    .where(eq(schema.pages.id, id))
    .limit(1)
  const item = website[0]
  if (!item) return { title: 'Website' }
  const page = PageRowZ.parse(item)
  return { title: page.title ?? page.url }
}


export default async function WebsitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const db = requireDb()
  const website = await db
    .select({ id: schema.pages.id, url: schema.pages.url, title: schema.pages.title, createdAt: schema.pages.createdAt })
    .from(schema.pages)
    .where(eq(schema.pages.id, id))
    .limit(1)
  const item = website[0]
  if (!item) notFound()
  const page = PageRowZ.parse(item)
  const gens = await db
    .select()
    .from(schema.transforms)
    .where(eq(schema.transforms.pageId, page.id))
    .orderBy(desc(schema.transforms.createdAt))
  const genList = TransformZ.array().parse(gens)
  const status = genList[0]?.status ?? 'new'

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/websites" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Websites
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <Heading className="truncate max-w-xl">{page.title ?? page.url}</Heading>
            <Badge color={status === 'success' ? 'lime' : status === 'queued' || status === 'running' ? 'amber' : 'zinc'}>
              {status}
            </Badge>
          </div>
          <div className="text-sm/6 text-zinc-500 truncate">{page.url}</div>
        </div>
        <div className="flex gap-4">
          <Button outline href={page.url}>
            View page
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="text-sm/6 text-zinc-500">Last transform</div>
          <div className="mt-2 text-xl font-semibold">{status}</div>
        </div>
        <div />
        <div />
      </div>

      <Subheading className="mt-12">Details</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Metric</TableHeader>
            <TableHeader>Value</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>{page.createdAt.toLocaleString()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
