import { Stat } from '@/app/stat'
import { Badge } from '@/components/badge'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { requireDb, schema, PageRowZ, TransformZ } from '@/db'
import { and, desc, eq, gt, inArray } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import { Sparkline } from '@/components/sparkline'
import Link from 'next/link'

type SearchParams = Record<string, string | string[] | undefined>

export default async function Home({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { orgId } = await auth()
  const sp = await searchParams
  const periodKey = (typeof sp?.period === 'string' ? sp?.period : 'last_two') as
    | 'last_week'
    | 'last_two'
    | 'last_month'
    | 'last_quarter'
  const periodDaysMap = { last_week: 7, last_two: 14, last_month: 30, last_quarter: 90 } as const
  const periodDays = periodDaysMap[periodKey] ?? 14
  const sinceDate = new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000)

  if (!orgId) {
    return (
      <>
        <Heading>Accessaurus Dashboard</Heading>
        <p className="mt-4 text-sm text-zinc-500">Select an organization to see metrics.</p>
      </>
    )
  }

  const db = requireDb()
  const pagesRaw = await db
    .select({ id: schema.pages.id, url: schema.pages.url, title: schema.pages.title, createdAt: schema.pages.createdAt })
    .from(schema.pages)
    .where(eq(schema.pages.orgId, orgId))
    .orderBy(desc(schema.pages.createdAt))
    .limit(20)
  const pages = PageRowZ.array().parse(pagesRaw)

  const pageIds = pages.map((p) => p.id)
  const latestByPage = new Map<string, { id: string; pageId: string; createdAt: Date; status: string }>()
  let allTransforms: { id: string; pageId: string; createdAt: Date; status: string }[] = []
  if (pageIds.length) {
    const transforms = await db
      .select({ id: schema.transforms.id, pageId: schema.transforms.pageId, createdAt: schema.transforms.createdAt, status: schema.transforms.status })
      .from(schema.transforms)
      .where(and(inArray(schema.transforms.pageId, pageIds), gt(schema.transforms.createdAt, sinceDate)))
      .orderBy(desc(schema.transforms.createdAt))
    const list = TransformZ.array().parse(transforms)
    allTransforms = list
    for (const t of list) if (!latestByPage.has(t.pageId)) latestByPage.set(t.pageId, t)
  }

  const transformIds = Array.from(latestByPage.values()).map((t) => t.id)
  // All metrics within period, keyed by transform
  const metricsByTransform = new Map<string, any>()
  if (allTransforms.length) {
    const allTransformIds = allTransforms.map((t) => t.id)
    const metricsRows = await db
      .select({ transformId: schema.outputs.transformId, body: schema.outputs.body })
      .from(schema.outputs)
      .where(and(inArray(schema.outputs.transformId, allTransformIds), eq(schema.outputs.kind, 'metrics')))
    for (const r of metricsRows) metricsByTransform.set(r.transformId, r.body)
  }

  const rows = pages.map((p) => {
    const t = latestByPage.get(p.id)
    const m = t ? metricsByTransform.get(t.id) : null
    return { page: p, transform: t, metrics: m }
  })

  // Aggregates
  let percentSum = 0
  let percentCount = 0
  let headingsSum = 0
  let headingsCount = 0
  const landmarkKeys = ['header', 'nav', 'main', 'aside', 'footer', 'section', 'article', 'figure', 'time'] as const
  const presenceCounts: Record<(typeof landmarkKeys)[number], number> = {
    header: 0,
    nav: 0,
    main: 0,
    aside: 0,
    footer: 0,
    section: 0,
    article: 0,
    figure: 0,
    time: 0,
  }
  for (const r of rows) {
    const m = r.metrics
    if (!m) continue
    if (typeof m.coverage?.percentSemantic === 'number') {
      percentSum += Number(m.coverage.percentSemantic)
      percentCount += 1
    }
    if (typeof m.totals?.headings === 'number') {
      headingsSum += Number(m.totals.headings)
      headingsCount += 1
    }
    if (m.landmarks) {
      for (const k of landmarkKeys) if (Number(m.landmarks[k] || 0) > 0) presenceCounts[k] += 1
    }
  }
  const avgPercent = percentCount ? (Math.round((percentSum / percentCount) * 10) / 10).toFixed(1) : '0.0'
  const avgHeadings = headingsCount ? Math.round(headingsSum / headingsCount) : 0
  const pagesWithMetrics = percentCount
  const primaryKeys = ['header', 'nav', 'main', 'footer'] as const
  const primaryPresenceAvg = pagesWithMetrics
    ? Math.round(
        (primaryKeys.reduce((acc, k) => acc + (presenceCounts[k] / pagesWithMetrics) * 100, 0) / primaryKeys.length) * 10,
      ) / 10
    : 0

  // Build coverage trend by day (avg across transforms per day)
  const dayKeys: string[] = []
  for (let i = periodDays - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    dayKeys.push(d.toISOString().slice(0, 10))
  }
  const dayAgg = new Map<string, { sum: number; n: number }>()
  for (const t of allTransforms) {
    const m = metricsByTransform.get(t.id)
    const pct = Number(m?.coverage?.percentSemantic || 0)
    const key = new Date(t.createdAt).toISOString().slice(0, 10)
    if (!dayAgg.has(key)) dayAgg.set(key, { sum: 0, n: 0 })
    const rec = dayAgg.get(key)!
    rec.sum += pct
    rec.n += 1
  }
  const coverageTrend = dayKeys.map((k) => {
    const r = dayAgg.get(k)
    return r && r.n ? Math.round((r.sum / r.n) * 10) / 10 : 0
  })

  // Per-page small sparkline (last up to 12 points)
  const perPageSeries = new Map<string, number[]>()
  for (const p of pages) perPageSeries.set(p.id, [])
  for (let i = allTransforms.length - 1; i >= 0; i--) {
    const t = allTransforms[i]
    const m = metricsByTransform.get(t.id)
    if (!m) continue
    const arr = perPageSeries.get(t.pageId)
    if (!arr) continue
    arr.push(Number(m.coverage?.percentSemantic || 0))
    if (arr.length > 12) arr.shift()
  }

  return (
    <>
      <Heading>Accessaurus Dashboard</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <div>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/?period=last_week" className={periodKey === 'last_week' ? 'font-medium' : 'text-zinc-500'}>
              Last week
            </Link>
            <span className="text-zinc-300">·</span>
            <Link href="/?period=last_two" className={periodKey === 'last_two' ? 'font-medium' : 'text-zinc-500'}>
              Last two weeks
            </Link>
            <span className="text-zinc-300">·</span>
            <Link href="/?period=last_month" className={periodKey === 'last_month' ? 'font-medium' : 'text-zinc-500'}>
              Last month
            </Link>
            <span className="text-zinc-300">·</span>
            <Link href="/?period=last_quarter" className={periodKey === 'last_quarter' ? 'font-medium' : 'text-zinc-500'}>
              Last quarter
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Pages With Metrics" value={String(pagesWithMetrics)} change="+0.0%" />
        <Stat title="Avg Semantic Coverage" value={`${avgPercent}%`} change="+0.0%" />
        <Stat title="Avg Headings/Page" value={`${avgHeadings}`} change="+0.0%" />
        <Stat title="Landmarks Presence (core)" value={`${primaryPresenceAvg}%`} change="+0.0%" />
      </div>

      <Subheading className="mt-14">Trends</Subheading>
      <div className="mt-4 grid gap-8 sm:grid-cols-2">
        <div>
          <div className="text-sm/6 text-zinc-500">Avg Semantic Coverage (daily)</div>
          <Sparkline data={coverageTrend} width={320} height={64} />
        </div>
      </div>

      <Subheading className="mt-14">Landmarks Overview</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Landmark</TableHeader>
            <TableHeader>Presence</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {landmarkKeys.map((k) => {
            const pct = pagesWithMetrics ? Math.round((presenceCounts[k] / pagesWithMetrics) * 1000) / 10 : 0
            const color = pct >= 50 ? 'lime' : pct > 0 ? 'amber' : 'zinc'
            return (
              <TableRow key={k}>
                <TableCell className="capitalize">{k}</TableCell>
                <TableCell>
                  <Badge color={color as any}>{pct}%</Badge>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Subheading className="mt-14">Recent Pages</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Page</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Semantic Coverage</TableHeader>
            <TableHeader>Trend</TableHeader>
            <TableHeader>Headings</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.page.id} href={`/site/${r.page.id}`} title={r.page.title ?? r.page.url}>
              <TableCell>
                <div className="max-w-xs truncate">
                  <span className="font-medium">{r.page.title ?? r.page.url}</span>
                  <div className="text-xs text-zinc-500 truncate">{r.page.url}</div>
                </div>
              </TableCell>
              <TableCell className="text-zinc-500">{new Date(r.transform?.createdAt ?? r.page.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                {r.metrics ? (
                  <Badge color={Number(r.metrics.coverage?.percentSemantic || 0) >= 50 ? 'lime' : Number(r.metrics.coverage?.percentSemantic || 0) >= 25 ? 'amber' : 'pink'}>
                    {typeof r.metrics.coverage?.percentSemantic === 'number' ? `${r.metrics.coverage.percentSemantic}%` : '—'}
                  </Badge>
                ) : (
                  <Badge color="zinc">—</Badge>
                )}
              </TableCell>
              <TableCell>
                <Sparkline data={perPageSeries.get(r.page.id) || []} width={120} height={32} />
              </TableCell>
              <TableCell>
                <Badge color={Number(r.metrics?.totals?.headings || 0) > 0 ? 'lime' : 'zinc'}>
                  {r.metrics?.totals?.headings ?? 0}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge color={r.transform?.status === 'success' ? 'lime' : r.transform?.status === 'queued' || r.transform?.status === 'running' ? 'amber' : 'zinc'}>
                  {r.transform?.status ?? 'new'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
