import { NextRequest } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(_req: NextRequest) {
  const path = join(process.cwd(), '../../packages/sdk/snippet.js')
  try {
    const code = await readFile(path, 'utf8')
    return new Response(code, {
      status: 200,
      headers: {
        'content-type': 'application/javascript; charset=utf-8',
        'cache-control': 'no-store, must-revalidate',
      },
    })
  } catch (e: any) {
    return new Response("console.error('snippet not found')", {
      status: 404,
      headers: { 'content-type': 'application/javascript; charset=utf-8' },
    })
  }
}
