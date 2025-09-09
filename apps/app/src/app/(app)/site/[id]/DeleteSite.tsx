'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'

export default function DeleteSite({ action, siteTitle }: { action: string; siteTitle?: string | null }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button outline type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7m3 0V5a2 2 0 012-2h4a2 2 0 012 2v2M4 7h16" />
        </svg>
        Delete Site
      </Button>

      <Dialog open={open} onClose={setOpen}>
        <DialogTitle>Delete site</DialogTitle>
        <DialogDescription>
          This will permanently delete {siteTitle ? `“${siteTitle}”` : 'this site'} and its transform history. This action
          cannot be undone.
        </DialogDescription>
        <DialogBody>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            You’ll be redirected back to Sites after deletion.
          </p>
        </DialogBody>
        <DialogActions>
          <Button plain type="button" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <form method="post" action={action} onSubmit={() => setOpen(false)}>
            <Button color="rose" type="submit" className="inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7m3 0V5a2 2 0 012-2h4a2 2 0 012 2v2M4 7h16" />
              </svg>
              Delete
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </>
  )
}

