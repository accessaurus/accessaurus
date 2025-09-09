import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Link } from '@/components/link'
import { requireDb, schema, PageRowZ, TransformZ } from '@/db'
import { and, desc, eq } from 'drizzle-orm'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import OnboardingTabs from './OnboardingTabs'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const db = requireDb()
  const website = await db
    .select({ id: schema.pages.id, url: schema.pages.url, title: schema.pages.title, createdAt: schema.pages.createdAt })
    .from(schema.pages)
    .where(eq(schema.pages.id, id))
    .limit(1)
  const item = website[0]
  if (!item) return { title: 'Site' }
  const page = PageRowZ.parse(item)
  return { title: page.title ?? page.url }
}

export default async function SitePage({ params }: { params: Promise<{ id: string }> }) {
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
  const status: (typeof genList)[number]['status'] | 'new' = (genList[0]?.status as any) ?? 'new'
  const latestTransform = genList[0]

  let metrics: any | null = null
  if (latestTransform) {
    const rows = await db
      .select({ body: schema.outputs.body })
      .from(schema.outputs)
      .where(and(eq(schema.outputs.transformId, latestTransform.id), eq(schema.outputs.kind, 'metrics')))
      .limit(1)
    metrics = rows[0]?.body ?? null
  }

  const { orgId } = await auth()
  const effectiveOrgId = orgId || 'YOUR_ORG_ID'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || ''


  const statusConfig = {
    success: { color: 'zinc' as const, icon: '✓', label: 'Success', bgClass: 'bg-zinc-100 dark:bg-zinc-800/50' },
    queued: { color: 'zinc' as const, icon: '⏳', label: 'Queued', bgClass: 'bg-zinc-100 dark:bg-zinc-800/50' },
    running: { color: 'zinc' as const, icon: '⚡', label: 'Running', bgClass: 'bg-zinc-100 dark:bg-zinc-800/50' },
    new: { color: 'zinc' as const, icon: '○', label: 'New', bgClass: 'bg-zinc-100 dark:bg-zinc-800/50' },
    failed: { color: 'zinc' as const, icon: '✕', label: 'Failed', bgClass: 'bg-zinc-100 dark:bg-zinc-800/50' },
  }

  const currentStatus = statusConfig[status as keyof typeof statusConfig] || statusConfig.new

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/sites" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Sites
        </Link>
      </div>

      <div className="mt-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-3 min-w-0 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <Heading className="truncate max-w-xl text-2xl lg:text-3xl">{page.title ?? 'Untitled Page'}</Heading>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${currentStatus.bgClass}`}>
                <span className="text-lg">{currentStatus.icon}</span>
                <span>{currentStatus.label}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm/6 text-zinc-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <a href={page.url} target="_blank" rel="noopener noreferrer" className="truncate hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
                {page.url}
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            <Button outline href={page.url} className="inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit Site
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Status</div>
              <span className="text-2xl">{currentStatus.icon}</span>
            </div>
            <div className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">{currentStatus.label}</div>
            <div className="mt-1 text-xs text-zinc-500">Last updated just now</div>
          </div>
          
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Transforms</div>
              <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">{genList.length}</div>
            <div className="mt-1 text-xs text-zinc-500">Total transforms</div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Coverage</div>
              <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {metrics?.coverage?.percentSemantic || 0}%
            </div>
            <div className="mt-1 text-xs text-zinc-500">Semantic coverage</div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Created</div>
              <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="mt-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {page.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <div className="mt-1 text-xs text-zinc-500">
              {page.createdAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>

      {status === 'new' && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Waiting for first signal</h3>
          <div className="mt-6">
            <OnboardingTabs orgId={effectiveOrgId} appUrl={appUrl} />
          </div>
        </div>
      )}


      {genList.length > 0 && (
        <div className="mt-8 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Transform History</h2>
            <p className="mt-1 text-sm text-zinc-500">Track all transformations and their review status</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Review</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {genList.map((t) => (
                  <tr key={t.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400">
                      {new Date(t.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge color={t.status === 'success' ? 'lime' : t.status === 'queued' || t.status === 'running' ? 'amber' : 'zinc'}>
                        {t.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge color={t.reviewStatus === 'approved' ? 'lime' : t.reviewStatus === 'pending' ? 'amber' : 'pink'}>
                        {t.reviewStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {t.status === 'success' && (
                        <Button outline href={`/site/${page.id}/review/${t.id}`} className="text-sm">
                          Review
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {metrics && (
        <div className="mt-8 space-y-8">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Semantic Analysis</h2>
              <p className="mt-1 text-sm text-zinc-500">Overview of HTML semantic structure and accessibility</p>
            </div>
            
            <div className="p-6 grid gap-6 lg:grid-cols-3">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Semantic Coverage</span>
                    <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{metrics.coverage.percentSemantic}%</span>
                  </div>
                  <div className="relative h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-lime-400 to-lime-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(0, Math.min(100, Number(metrics.coverage.percentSemantic || 0)))}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">Semantic elements</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{metrics.coverage.semantic}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">Generic (div/span)</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{metrics.coverage.generic}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">Total elements</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{metrics.totals.elements}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Heading Structure</span>
                    <span className="text-sm text-zinc-500">{metrics.totals.headings} headings</span>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 max-h-64 overflow-auto">
                    {metrics.headings.length === 0 ? (
                      <div className="text-sm text-zinc-500 text-center py-4">No headings detected</div>
                    ) : (
                      <ul className="space-y-2">
                        {metrics.headings.map((h: any, i: number) => (
                          <li key={i} className="flex items-start gap-2" style={{ paddingLeft: `${(Number(h.level) - 1) * 16}px` }}>
                            <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium bg-zinc-200 dark:bg-zinc-700 rounded">
                              H{h.level}
                            </span>
                            <span className="text-sm text-zinc-700 dark:text-zinc-300 truncate flex-1">
                              {h.text || 'Empty heading'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Landmark Elements</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    ['header', metrics.landmarks.header],
                    ['nav', metrics.landmarks.nav],
                    ['main', metrics.landmarks.main],
                    ['aside', metrics.landmarks.aside],
                    ['footer', metrics.landmarks.footer],
                    ['section', metrics.landmarks.section],
                    ['article', metrics.landmarks.article],
                    ['figure', metrics.landmarks.figure],
                  ] as const).map(([k, v]) => (
                    <div key={k as string} className="flex items-center justify-between p-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                      <span className="text-sm capitalize text-zinc-600 dark:text-zinc-400">{k}</span>
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}