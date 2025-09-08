import { Badge } from '@/components/badge'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getPageOptimizations } from '@/data'

export const metadata = {
  title: 'Optimizations',
}

export default async function Optimizations() {
  const items = await getPageOptimizations()

  return (
    <>
      <div className="flex items-end justify-between">
        <Heading>Optimizations</Heading>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>
      <Subheading className="mt-8">Recent activity</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Page</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Schema</TableHeader>
            <TableHeader>WCAG</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((opt) => (
            <TableRow key={opt.id} href={opt.url} title={`Optimization #${opt.id}`}>
              <TableCell>
                <div className="max-w-xs truncate">
                  <span className="font-medium">{opt.pageTitle}</span>
                  <div className="text-xs text-zinc-500 truncate">{opt.pageUrl}</div>
                </div>
              </TableCell>
              <TableCell className="text-zinc-500">{opt.date}</TableCell>
              <TableCell>
                <Badge color={opt.metrics.schemaGenerated ? 'lime' : 'zinc'}>
                  {opt.metrics.schemaGenerated || 'None'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge color={opt.metrics.wcagScore === '100%' ? 'lime' : 'amber'}>
                  {opt.metrics.wcagScore}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge color={opt.status === 'optimized' ? 'lime' : opt.status === 'partial' ? 'amber' : 'pink'}>
                  {opt.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
