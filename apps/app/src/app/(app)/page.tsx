import { Stat } from '@/app/stat'
import { Badge } from '@/components/badge'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getRecentOptimizations } from '@/data'

export default async function Home() {
  let optimizations = await getRecentOptimizations()

  return (
    <>
      <Heading>Accessaurus Dashboard</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Pages Optimized" value="2.3M+" change="+12.5%" />
        <Stat title="WCAG Compliance" value="89%" change="+3.2%" />
        <Stat title="Users Served" value="450K" change="+18.7%" />
        <Stat title="Schema Generated" value="1.8M" change="+24.3%" />
      </div>
      <Subheading className="mt-14">Recent Optimizations</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Page URL</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Schema Type</TableHeader>
            <TableHeader>WCAG Score</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {optimizations.map((opt) => (
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
                <Badge 
                  color={
                    opt.metrics.wcagScore === '100%' ? 'lime' : 
                    opt.metrics.wcagScore >= '85%' ? 'amber' : 
                    'pink'
                  }
                >
                  {opt.metrics.wcagScore}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  color={
                    opt.status === 'optimized' ? 'lime' : 
                    opt.status === 'partial' ? 'amber' : 
                    'pink'
                  }
                >
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
