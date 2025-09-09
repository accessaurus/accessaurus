"use client"
import { useMemo, useState } from 'react'

const sample = `
<div id="header" class="site-header">
  <div class="logo">Brand</div>
  <div class="nav menu"><a href="#">Home</a> <a href="#">Docs</a></div>
  <a class="btn" role="button">Get Started</a>
  <span class="date">2024-08-15</span>
  <div class="image figure"><img src="/hero.png" alt="Hero"/><p class="caption">Our product in action</p></div>
  <div id="main" class="content">
    <div class="section">
      <h2>Welcome</h2>
      <p>Hello world</p>
    </div>
    <div class="sidebar">Tips and links</div>
  </div>
  <div class="footer">© Company</div>
 </div>`

export default function SemantifyPage() {
  const [input, setInput] = useState<string>(sample.trim())
  const [output, setOutput] = useState<string>('')
  const [changes, setChanges] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onTransform = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/semantify', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ html: input }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Transform failed')
      setOutput(json.html)
      setChanges(json.stats?.changes || [])
    } catch (e: any) {
      setError(e?.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const preview = useMemo(() => ({ __html: output || '<em>No output yet</em>' }), [output])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Semantify — HTML Transformer</h1>
      <p className="text-sm text-zinc-500 mt-1">Paste HTML on the left and transform into semantic HTML.</p>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Input HTML</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[360px] w-full rounded-md border border-zinc-300 bg-white p-3 font-mono text-sm"
            spellCheck={false}
          />
          <div className="flex items-center gap-2">
            <button
              onClick={onTransform}
              disabled={loading}
              className="inline-flex items-center rounded-md bg-black px-3 py-2 text-white text-sm disabled:opacity-50"
            >
              {loading ? 'Transforming…' : 'Transform'}
            </button>
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>
          {!!changes.length && (
            <div className="mt-2 rounded-md border border-zinc-200 bg-zinc-50 p-2">
              <div className="text-sm font-medium mb-1">Changes</div>
              <ul className="text-sm list-disc pl-5 space-y-0.5">
                {changes.map((c, i) => (
                  <li key={i}><code>{c.from}</code> → <code>{c.to}</code> — {c.reason}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Transformed HTML</label>
          <textarea
            value={output}
            readOnly
            className="min-h-[180px] w-full rounded-md border border-zinc-300 bg-white p-3 font-mono text-sm"
            spellCheck={false}
          />
          <label className="text-sm font-medium mt-2">Preview</label>
          <div className="min-h-[180px] rounded-md border border-zinc-300 bg-white p-3">
            <div dangerouslySetInnerHTML={preview} />
          </div>
        </div>
      </div>
    </div>
  )
}

