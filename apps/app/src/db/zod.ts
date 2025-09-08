import { z } from 'zod'

export const GenerationStatusZ = z.enum([
  'queued',
  'running',
  'success',
  'failed',
  'skipped',
])

export const OutputKindZ = z.enum(['meta', 'jsonld', 'synonyms'])

export const ContentItemRowZ = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  title: z.string().nullable(),
  createdAt: z.coerce.date(),
})

export const GenerationZ = z.object({
  id: z.string().uuid(),
  contentItemId: z.string().uuid(),
  status: GenerationStatusZ,
  createdAt: z.coerce.date(),
})

export type GenerationStatus = z.infer<typeof GenerationStatusZ>
export type ContentItemRow = z.infer<typeof ContentItemRowZ>

