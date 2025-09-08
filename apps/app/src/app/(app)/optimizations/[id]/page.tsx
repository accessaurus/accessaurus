import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Heading, Subheading } from '@/components/heading'
import { Link } from '@/components/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getPageOptimization } from '@/data'
import { ChevronLeftIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const opt = await getPageOptimization(id)
  if (!opt) return { title: 'Optimization' }
  return { title: opt.pageTitle }
}

export default async function Optimization({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const opt = await getPageOptimization(id)

  if (!opt) notFound()

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/optimizations" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Optimizations
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <Heading className="truncate max-w-xl">{opt.pageTitle}</Heading>
            <Badge color={opt.status === 'optimized' ? 'lime' : opt.status === 'partial' ? 'amber' : 'pink'}>
              {opt.status}
            </Badge>
          </div>
          <div className="text-sm/6 text-zinc-500 truncate">{opt.pageUrl}</div>
        </div>
        <div className="flex gap-4">
          <Button outline href={opt.pageUrl}>
            View page
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="text-sm/6 text-zinc-500">Schema type</div>
          <div className="mt-2 text-xl font-semibold">{opt.metrics.schemaGenerated || 'None'}</div>
        </div>
        <div>
          <div className="text-sm/6 text-zinc-500">WCAG compliance</div>
          <div className="mt-2 text-xl font-semibold">{opt.metrics.wcagScore}</div>
        </div>
        <div>
          <div className="text-sm/6 text-zinc-500">Meta tags updated</div>
          <div className="mt-2 text-xl font-semibold">{opt.metrics.metaTagsUpdated}</div>
        </div>
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
            <TableCell>Accessibility features</TableCell>
            <TableCell>{opt.metrics.accessibilityFeatures}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>{opt.customer.company}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>{opt.date}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}

