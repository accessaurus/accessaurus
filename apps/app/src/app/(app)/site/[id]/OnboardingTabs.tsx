"use client"

import { Textarea } from '@/components/textarea'
import { Subheading } from '@/components/heading'
import { Label, Field } from '@/components/fieldset'

export default function OnboardingTabs({ orgId, appUrl }: { orgId: string; appUrl: string }) {
  const effectiveOrgId = orgId || 'YOUR_ORG_ID'
  const endpoint = appUrl ? `${appUrl}/api/sdk/snippet` : '/api/sdk/snippet'
  const scriptSnippet = `<script async src="${endpoint}" data-org="${effectiveOrgId}"></script>`

  return (
    <div className="mt-6 space-y-6">
      <Subheading>Installation</Subheading>
      
      <Field>
        <Label>Add this script tag before your closing &lt;/head&gt; or &lt;/body&gt; tag</Label>
        <Textarea readOnly aria-label="Script Tag" value={scriptSnippet} className="font-mono text-xs" rows={1} />
      </Field>
    </div>
  )
}