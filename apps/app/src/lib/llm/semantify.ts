import OpenAI from 'openai'
import { z } from 'zod'

const ChangeZ = z.object({ from: z.string(), to: z.string(), reason: z.string().optional().default('') })
const LlmOutZ = z.object({ html: z.string().min(1), changes: z.array(ChangeZ).default([]) })

export type LlmOut = z.infer<typeof LlmOutZ>

export async function llmSemantifyHtml(skeletonHtml: string): Promise<LlmOut> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY not set')
  const client = new OpenAI({ apiKey })
  const model = process.env.SEMANTIFY_LLM_MODEL || 'gpt-4o-mini'

  const system = `You transform noisy HTML (no classes/styles) into semantic, accessible HTML.
- Preserve content and order.
- Prefer header/nav/main/section/article/aside/footer; figure/figcaption; time[datetime].
- Anchor used as button -> button when href is missing/trivial.
- Output strict JSON only: {"html": string, "changes": [{"from": string, "to": string, "reason": string}] }.
- Do not include markdown fences.`

  const user = `Input HTML:
${skeletonHtml}`

  const resp = await client.chat.completions.create({
    model,
    temperature: 0,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    response_format: { type: 'json_object' },
    max_tokens: 4000,
  })
  const raw = resp.choices?.[0]?.message?.content || ''
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    throw new Error('LLM returned non-JSON')
  }
  const out = LlmOutZ.parse(parsed)
  return out
}

