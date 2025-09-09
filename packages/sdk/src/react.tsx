import { useEffect } from 'react'
import { collectAndSend, type InitOptions, toSkeleton, minifyHtml, simhash64 } from './index'

export type AccessaurusProps = Omit<InitOptions, 'pageUrl'> & { pageUrl?: string; applyImmediately?: boolean }

export function Accessaurus(props: AccessaurusProps) {
  useEffect(() => {
    const pageUrl = props.pageUrl || window.location.href
    const endpoint = props.endpoint || '/api/sdk/ingest'
    // ingest then optionally apply
    collectAndSend({ ...props, pageUrl })
      ?.then(() => {
        if (!props.applyImmediately) return
        const sk = minifyHtml(toSkeleton(document))
        const hash = simhash64(sk)
        const origin = new URL(endpoint, location.href)
        const latest = `${origin.origin}/api/sdk/latest?orgId=${encodeURIComponent(props.orgId)}&pageUrl=${encodeURIComponent(pageUrl)}&hash=${encodeURIComponent(hash)}`
        return fetch(latest, { method: 'GET', credentials: 'omit', mode: 'cors' })
          .then((r) => (r.ok ? r.json() : Promise.reject(new Error('no result'))))
          .then((body) => {
            const html = (body && body.html) || ''
            if (!html) return
            const doc = new DOMParser().parseFromString(html, 'text/html')
            if (doc && doc.body) {
              document.body.innerHTML = doc.body.innerHTML
            }
          })
          .catch(() => {})
      })
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}

export default Accessaurus
