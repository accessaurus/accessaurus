import { z } from 'zod'

export const TransformStatusZ = z.enum([
  'queued',
  'running',
  'success',
  'failed',
  'skipped',
])

export const OutputKindZ = z.enum(['semantic_html', 'metrics'])

export const PageRowZ = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  title: z.string().nullable(),
  createdAt: z.coerce.date(),
})

export const TransformZ = z.object({
  id: z.string().uuid(),
  pageId: z.string().uuid(),
  status: TransformStatusZ,
  createdAt: z.coerce.date(),
})

export type TransformStatus = z.infer<typeof TransformStatusZ>
export type PageRow = z.infer<typeof PageRowZ>
