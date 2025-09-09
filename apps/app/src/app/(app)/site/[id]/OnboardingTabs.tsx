"use client"

import { Textarea } from '@/components/textarea'
import { Subheading } from '@/components/heading'
import { Text } from '@/components/text'
import { Label, Field } from '@/components/fieldset'

export default function OnboardingTabs({ orgId, appUrl }: { orgId: string; appUrl: string }) {
  const effectiveOrgId = orgId || 'YOUR_ORG_ID'
  const endpoint = appUrl ? `${appUrl}/api/sdk/snippet` : '/api/sdk/snippet'
  const scriptSnippet = `<script async src="${endpoint}" data-org="${effectiveOrgId}"></script>`
  const reactSnippet = `import { Accessaurus } from '@accessaurus/sdk/react'
export default function App() {
  return (
    <>
      <Accessaurus orgId="${effectiveOrgId}" />
      {/* your app */}
    </>
  )
}`

  return (
    <div className="mt-6 space-y-6">
      <Subheading>Installation</Subheading>
      
      <div className="space-y-4">
        <Field>
          <Label>Script tag</Label>
          <Textarea readOnly aria-label="Script Tag" value={scriptSnippet} className="font-mono text-xs" rows={10} />
        </Field>
        <Field>
          <Label>React component</Label>
          <Textarea readOnly aria-label="React Tag" value={reactSnippet} className="font-mono text-xs" rows={10} />
        </Field>
      </div>
    </div>
  )
}