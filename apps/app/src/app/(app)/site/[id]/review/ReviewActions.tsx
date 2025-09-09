'use client'

import { useRouter } from 'next/navigation'

export function ReviewActions({ transformId, pageId }: { transformId: string; pageId: string }) {
  const router = useRouter()
  async function act(path: 'approve' | 'reject') {
    await fetch(`/api/review/${transformId}/${path}`, { method: 'POST' })
    router.push(`/site/${pageId}`)
  }
  return (
    <div className="flex gap-3">
      <button onClick={() => act('approve')} className="rounded-md bg-black px-3 py-2 text-white text-sm">Approve</button>
      <button onClick={() => act('reject')} className="rounded-md bg-zinc-200 px-3 py-2 text-sm">Reject</button>
    </div>
  )
}

