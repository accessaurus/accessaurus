# @accessaurus/sdk

Lightweight client SDK for Accessaurus semantic HTML ingestion.

- Script tag (no bundler):

```html
<script async src="https://app.example.com/api/sdk/snippet" data-org="YOUR_ORG_ID"></script>
```

- React tag:

```tsx
import { Accessaurus } from '@accessaurus/sdk/react'

export default function RootLayout() {
  return (
    <>
      <Accessaurus orgId="YOUR_ORG_ID" />
    </>
  )
}
```

- Programmatic:

```ts
import { collectAndSend } from '@accessaurus/sdk'

collectAndSend({ orgId: 'YOUR_ORG_ID', endpoint: 'https://app.example.com/api/sdk/ingest' })
```

Build: `npm run build` (tsc → dist). Published on tags `sdk-v*` via GitHub Actions.

