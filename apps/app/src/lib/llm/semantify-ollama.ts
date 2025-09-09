import { Ollama } from 'ollama'
import { z } from 'zod'

const ChangeZ = z.object({ from: z.string(), to: z.string(), reason: z.string().optional().default('') })
const LlmOutZ = z.object({ html: z.string().min(1), changes: z.array(ChangeZ).default([]) })
export type LlmOut = z.infer<typeof LlmOutZ>

export async function ollamaSemantifyHtml(skeletonHtml: string): Promise<LlmOut> {
  const host = process.env.OLLAMA_HOST || 'https://ollama.com'
  const apiKey = process.env.OLLAMA_API_KEY
  if (!apiKey) throw new Error('OLLAMA_API_KEY not set')
  const model = process.env.OLLAMA_MODEL || process.env.SEMANTIFY_LLM_MODEL || 'gpt-oss:120b'
  const ollama = new Ollama({ host, headers: { Authorization: `Bearer ${apiKey}` } })

  const system = `You transform noisy HTML (no classes/styles) into semantic, accessible HTML.
- Preserve content and order.
- Prefer header/nav/main/section/article/aside/footer; figure/figcaption; time[datetime].
- Anchor used as button -> button when href is missing/trivial.
- Output strict JSON only: {"html": string, "changes": [{"from": string, "to": string, "reason": string}] }.
- Do not include markdown fences.`

  const user = `Input HTML:\n${skeletonHtml}`

  const response = await ollama.chat({
    model,
    stream: false,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
  } as any)

  const content = (response as any)?.message?.content || ''
  let parsed: unknown
  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('Ollama returned non-JSON')
  }
  return LlmOutZ.parse(parsed)
}

