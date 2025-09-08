import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Field, Label } from '@/components/fieldset'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import { Text } from '@/components/text'
import { Textarea } from '@/components/textarea'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Add New Website',
}

export default function AddWebsite() {
  return (
    <form method="post" className="mx-auto max-w-3xl">
      <Heading>Add New Website</Heading>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Website URL</Subheading>
          <Text>Enter the site root or a specific section.</Text>
        </div>
        <div className="space-y-4">
          <Input type="url" name="url" aria-label="Website URL" placeholder="https://www.example.com" required />
          <Input name="name" aria-label="Website Name" placeholder="Website name (optional)" />
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Scope</Subheading>
          <Text>Define where to begin and what to ignore.</Text>
        </div>
        <div className="space-y-4">
          <Input name="startPath" aria-label="Start Path" placeholder="/" defaultValue="/" />
          <Field>
            <Label htmlFor="exclude">Exclude patterns</Label>
            <Textarea id="exclude" name="exclude" aria-label="Exclude patterns" placeholder="/admin\n/preview\n?draft=1" />
          </Field>
        </div>
      </section>

      <Divider className="my-10" soft />

      <div className="flex justify-end gap-4">
        <Button type="reset" plain>
          Reset
        </Button>
        <Button type="submit">Add Website</Button>
      </div>
    </form>
  )
}
