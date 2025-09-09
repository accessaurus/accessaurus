import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import { visit } from 'unist-util-visit'

export type HeadingItem = { level: number; text: string }

export type Landmarks = {
  header: number
  nav: number
  main: number
  aside: number
  footer: number
  section: number
  article: number
  figure: number
  time: number
}

export type Coverage = {
  semantic: number
  generic: number
  percentSemantic: number
}

export type MetricsResult = {
  totals: { elements: number; textNodes: number; headings: number; landmarks: number }
  coverage: Coverage
  headings: HeadingItem[]
  landmarks: Landmarks
}

function getText(node: any): string {
  let out = ''
  visit(node, (n: any) => {
    if (n.type === 'text' && typeof n.value === 'string') out += n.value
  })
  return out.replace(/\s+/g, ' ').trim()
}

const GENERIC = new Set(['div', 'span'])
const SEMANTIC_BASE = new Set([
  // landmarks + structures of interest
  'header',
  'nav',
  'main',
  'section',
  'article',
  'aside',
  'footer',
  'figure',
  'figcaption',
  'time',
  // headings
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
])

export function computeMetrics(html: string): MetricsResult {
  const tree: any = unified().use(rehypeParse, { fragment: true }).parse(html)

  let elements = 0
  let textNodes = 0
  let headingsCount = 0
  const headings: HeadingItem[] = []
  const landmarks: Landmarks = {
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

  let semantic = 0
  let generic = 0

  visit(tree, (node: any) => {
    if (node.type === 'element') {
      elements += 1
      const tag = String(node.tagName || '').toLowerCase()
      if (GENERIC.has(tag)) generic += 1
      if (SEMANTIC_BASE.has(tag)) semantic += 1

      if (tag === 'header') landmarks.header += 1
      else if (tag === 'nav') landmarks.nav += 1
      else if (tag === 'main') landmarks.main += 1
      else if (tag === 'aside') landmarks.aside += 1
      else if (tag === 'footer') landmarks.footer += 1
      else if (tag === 'section') landmarks.section += 1
      else if (tag === 'article') landmarks.article += 1
      else if (tag === 'figure') landmarks.figure += 1
      else if (tag === 'time') landmarks.time += 1

      if (/^h[1-6]$/.test(tag)) {
        const level = Number(tag.slice(1))
        const text = getText(node)
        headings.push({ level, text })
        headingsCount += 1
      }
    } else if (node.type === 'text') {
      textNodes += 1
    }
  })

  const landmarksTotal =
    landmarks.header +
    landmarks.nav +
    landmarks.main +
    landmarks.aside +
    landmarks.footer +
    landmarks.section +
    landmarks.article +
    landmarks.figure +
    landmarks.time

  const denom = semantic + generic || 1
  const percentSemantic = Math.round((semantic / denom) * 1000) / 10 // one decimal

  return {
    totals: { elements, textNodes, headings: headingsCount, landmarks: landmarksTotal },
    coverage: { semantic, generic, percentSemantic },
    headings,
    landmarks,
  }
}

export default computeMetrics

