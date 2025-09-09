import React from 'react'

export function Sparkline({
  data,
  width = 160,
  height = 40,
  stroke = '#84cc16',
  strokeWidth = 2,
  fill = '#84cc16',
  fillOpacity = 0.08,
  className,
}: {
  data: number[]
  width?: number
  height?: number
  stroke?: string
  strokeWidth?: number
  fill?: string
  fillOpacity?: number
  className?: string
}) {
  const n = data.length
  const w = Math.max(1, width)
  const h = Math.max(1, height)
  const min = Math.min(...data, 0)
  const max = Math.max(...data, 0)
  const range = max - min || 1
  const stepX = n > 1 ? w / (n - 1) : w

  const points = data.map((v, i) => {
    const x = i * stepX
    const y = h - ((v - min) / range) * h
    return [x, y] as const
  })

  const path = points
    .map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
    .join(' ')

  const area = `${path} L ${w} ${h} L 0 ${h} Z`

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden>
      <path d={area} fill={fill} fillOpacity={fillOpacity} />
      <path d={path} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

export default Sparkline

