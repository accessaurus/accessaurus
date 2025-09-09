import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import { Text } from '@/components/text'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Add New Site' }

export default function AddSite() {
  return (
    <form method="post" action="/sites/new/submit" className="mx-auto max-w-3xl">
      <Heading>Add New Site</Heading>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Website URL</Subheading>
          <Text>Enter the site root; name is optional.</Text>
        </div>
        <div className="space-y-4">
          <Input type="url" name="url" aria-label="Website URL" placeholder="https://www.example.com" required />
          <Input name="name" aria-label="Website Name" placeholder="Website name (optional)" />
        </div>
      </section>

      <Divider className="my-10" soft />

      <div className="flex items-center justify-between">
        <div className="flex justify-end gap-4">
          <Button type="reset" plain>
            Reset
          </Button>
          <Button type="submit">Create Site</Button>
        </div>
      </div>
    </form>
  )
}
