import { NextRequest } from 'next/server'
import { semantifyHtml } from '@/lib/semantify/transform'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const html = String(body?.html ?? '')
    const options = body?.options ?? {}
    if (!html) {
      return new Response(JSON.stringify({ error: 'Missing html' }), { status: 400 })
    }
    const result = await semantifyHtml(html, options)
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? 'Unknown error' }), { status: 500 })
  }
}

