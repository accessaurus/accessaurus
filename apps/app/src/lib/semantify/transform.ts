import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'

type SemantifyOptions = {
  enableTimeDetection?: boolean
  enableFigureDetection?: boolean
}

type Change = {
  from: string
  to: string
  reason: string
}

export type SemantifyResult = {
  html: string
  stats: {
    totalNodes: number
    changes: Change[]
    counts: Record<string, number>
  }
}

function ensureArray(v: unknown): string[] {
  if (!v) return []
  if (Array.isArray(v)) return v.map(String)
  if (typeof v === 'string') return v.split(/\s+/).filter(Boolean)
  return []
}

function isTrivialHref(href?: unknown) {
  if (typeof href !== 'string') return true
  const val = href.trim().toLowerCase()
  return !val || val === '#' || val.startsWith('javascript:')
}

function parseDateToISO(text: string): string | null {
  const trimmed = text.trim()
  // Very conservative: only accept obvious ISO or RFC‑like dates
  const d = new Date(trimmed)
  if (!isNaN(d.getTime())) return d.toISOString()
  return null
}

export async function semantifyHtml(html: string, options: SemantifyOptions = {}): Promise<SemantifyResult> {
  const enableTimeDetection = options.enableTimeDetection !== false
  const enableFigureDetection = options.enableFigureDetection !== false

  const changes: Change[] = []
  const counts: Record<string, number> = {}
  let totalNodes = 0

  const tree: any = unified().use(rehypeParse, { fragment: true }).parse(html)

  // First pass: rename containers by role/id/class heuristics
  visit(tree, 'element', (node: any) => {
    totalNodes += 1
    const tag = node.tagName
    const props = node.properties || {}
    const role = typeof props.role === 'string' ? props.role.toLowerCase() : ''
    const id = typeof props.id === 'string' ? props.id.toLowerCase() : ''
    const classes = ensureArray(props.className).map((c) => c.toLowerCase())

    const rename = (to: string, reason: string) => {
      if (node.tagName === to) return
      changes.push({ from: node.tagName, to, reason })
      counts[to] = (counts[to] ?? 0) + 1
      node.tagName = to
    }

    // Role‑based mappings (strong signal)
    switch (role) {
      case 'banner':
        if (tag === 'div' || tag === 'section') rename('header', 'role=banner')
        break
      case 'navigation':
        if (tag === 'div' || tag === 'section') rename('nav', 'role=navigation')
        break
      case 'main':
        if (tag !== 'main') rename('main', 'role=main')
        break
      case 'contentinfo':
        if (tag === 'div' || tag === 'section') rename('footer', 'role=contentinfo')
        break
      case 'complementary':
        if (tag === 'div' || tag === 'section') rename('aside', 'role=complementary')
        break
      case 'region':
        if (tag === 'div') rename('section', 'role=region')
        break
      case 'article':
        if (tag !== 'article') rename('article', 'role=article')
        break
    }

    // ID‑based mappings
    if (tag === 'div' || tag === 'section') {
      if (id === 'header' || classes.includes('header') || classes.includes('site-header') || classes.includes('topbar')) {
        rename('header', 'id/class indicates header')
      } else if (id === 'nav' || classes.some((c) => /\b(nav|navbar|menu|sidenav|breadcrumbs?)\b/.test(c))) {
        rename('nav', 'id/class indicates nav')
      } else if (id === 'main' || classes.includes('main') || classes.includes('content') || classes.includes('page')) {
        rename('main', 'id/class indicates main')
      } else if (id === 'footer' || classes.includes('footer')) {
        rename('footer', 'id/class indicates footer')
      } else if (id === 'sidebar' || classes.includes('sidebar') || classes.includes('aside')) {
        rename('aside', 'id/class indicates aside')
      } else if (
        classes.some((c) => /\b(article|post|blog-post)\b/.test(c))
      ) {
        rename('article', 'class indicates article')
      } else if (
        classes.some((c) => /\b(section|block|panel|card|hero|feature(s)?)\b/.test(c))
      ) {
        rename('section', 'class indicates section')
      }
    }

    // Anchor masquerading as button
    if (node.tagName === 'a') {
      const hasRoleButton = role === 'button'
      const hasButtonClass = classes.some((c) => /\b(btn|button|cta)\b/.test(c))
      if ((hasRoleButton || hasButtonClass) && isTrivialHref(props.href)) {
        rename('button', 'anchor used as button')
        // Clean up invalid anchor props
        if (props.href) delete props.href
        node.properties = props
      }
    }

    // time element detection
    if (enableTimeDetection && (tag === 'div' || tag === 'span' || tag === 'p')) {
      const hasDateClass = classes.includes('date') || classes.includes('time')
      if (hasDateClass && Array.isArray(node.children)) {
        const textNode = node.children.find((c: any) => c.type === 'text' && typeof c.value === 'string')
        if (textNode) {
          const iso = parseDateToISO(String(textNode.value))
          if (iso) {
            rename('time', 'class indicates date/time')
            node.properties = { ...(node.properties || {}), datetime: iso }
          }
        }
      }
    }
  })

  // Second pass: figure/figcaption detection
  if (enableFigureDetection) {
    visit(tree, 'element', (node: any, _index: number, parent: any) => {
      if (!parent || node.tagName !== 'div') return
      const props = node.properties || {}
      const classes = ensureArray(props.className).map((c) => c.toLowerCase())
      const isFigureLike = classes.includes('figure') || classes.includes('image') || classes.includes('media')
      if (!isFigureLike) return
      const hasImg = Array.isArray(node.children) && node.children.some((c: any) => c.type === 'element' && c.tagName === 'img')
      if (!hasImg) return
      const caption = Array.isArray(node.children) && node.children.find(
        (c: any) => c.type === 'element' && (c.tagName === 'div' || c.tagName === 'span' || c.tagName === 'p') && ensureArray(c.properties?.className).map(String).some((cn) => /\b(caption|figcaption)\b/i.test(cn))
      )
      if (caption) {
        // convert wrapper to figure
        changes.push({ from: node.tagName, to: 'figure', reason: 'image with caption container' })
        counts['figure'] = (counts['figure'] ?? 0) + 1
        node.tagName = 'figure'
        // convert caption to figcaption
        caption.tagName = 'figcaption'
      }
    })
  }

  const out = await unified().use(rehypeStringify, { allowDangerousHtml: true }).stringify(tree)

  return {
    html: String(out),
    stats: {
      totalNodes,
      changes,
      counts,
    },
  }
}

export default semantifyHtml

