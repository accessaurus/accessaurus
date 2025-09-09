// Lightweight DOM-to-skeleton + simhash + send

export type InitOptions = {
  endpoint?: string
  orgId: string
  pageUrl?: string
  debug?: boolean
}

export function toSkeleton(doc: Document): string {
  const clone = doc.documentElement.cloneNode(true) as HTMLElement
  const walker = doc.createTreeWalker(clone, NodeFilter.SHOW_ELEMENT, null)
  const toRemove: Element[] = []
  while (walker.nextNode()) {
    const el = walker.currentNode as Element
    const tag = el.tagName.toLowerCase()
    if (tag === 'script' || tag === 'style' || (tag === 'link' && (el as HTMLLinkElement).rel === 'stylesheet')) {
      toRemove.push(el)
      continue
    }
    el.removeAttribute('class')
    el.removeAttribute('style')
    // drop nonce/data-* noise and aria for hashing
    ;[...el.attributes].forEach((attr) => {
      if (attr.name.startsWith('data-') || attr.name.startsWith('aria-')) el.removeAttribute(attr.name)
    })
  }
  toRemove.forEach((n) => n.remove())
  return `<!doctype html>` + clone.outerHTML
}

// Preserve classes/ids/roles for transformation (remove scripts/styles only)
export function toContentHtml(doc: Document): string {
  const clone = doc.documentElement.cloneNode(true) as HTMLElement
  const walker = doc.createTreeWalker(clone, NodeFilter.SHOW_ELEMENT, null)
  const toRemove: Element[] = []
  while (walker.nextNode()) {
    const el = walker.currentNode as Element
    const tag = el.tagName.toLowerCase()
    if (tag === 'script' || tag === 'style' || (tag === 'link' && (el as HTMLLinkElement).rel === 'stylesheet')) {
      toRemove.push(el)
      continue
    }
    // drop inline styles only; keep class/id/role/aria-*
    el.removeAttribute('style')
  }
  toRemove.forEach((n) => n.remove())
  return `<!doctype html>` + clone.outerHTML
}

export function minifyHtml(html: string): string {
  return html
    .replace(/<!--[^]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim()
}

// Simple 64-bit SimHash over tokens
export function simhash64(text: string): string {
  const tokens = text.toLowerCase().match(/[a-z0-9]+/g) || []
  const v = new Array<number>(64).fill(0)
  for (const t of tokens) {
    const h = fnv1a64(t)
    for (let i = 0; i < 64; i++) {
      const bit = (h >> BigInt(i)) & 1n
      v[i] += bit === 1n ? 1 : -1
    }
  }
  let out = 0n
  for (let i = 0; i < 64; i++) if (v[i] >= 0) out |= 1n << BigInt(i)
  return out.toString(16).padStart(16, '0')
}

function fnv1a64(str: string): bigint {
  let hash = 0xcbf29ce484222325n
  const prime = 0x100000001b3n
  for (let i = 0; i < str.length; i++) {
    hash ^= BigInt(str.charCodeAt(i) & 0xff)
    hash = (hash * prime) & 0xffffffffffffffffn
  }
  return hash
}

export async function collectAndSend(opts: InitOptions) {
  const endpoint = opts.endpoint || '/api/sdk/ingest'
  const orgId = opts.orgId
  const pageUrl = opts.pageUrl || window.location.href
  const skeleton = minifyHtml(toSkeleton(document))
  const hash = simhash64(skeleton)
  const contentHtml = minifyHtml(toContentHtml(document))
  const payload = {
    orgId,
    pageUrl,
    hash,
    skeleton,
    html: contentHtml,
    ua: navigator.userAgent,
    ts: Date.now(),
  }
  if (opts.debug) console.log('[Accessaurus] sending', payload)
  try {
    return await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
      mode: 'cors',
      credentials: 'omit',
    })
  } catch (e) {
    if (opts.debug) console.warn('[Accessaurus] send failed', e)
  }
}
