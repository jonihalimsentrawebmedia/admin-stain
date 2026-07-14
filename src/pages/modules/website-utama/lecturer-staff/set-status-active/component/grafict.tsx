'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'
import { useWindowSize } from '@/hooks/use-window-size'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface StatusAktif {
  id_status_aktif: string
  kode_status: string
  nama_status: string
  jumlah: number
}

interface Props {
  data: StatusAktif[]
}

const chartConfig = {
  jumlah: {
    label: 'Jumlah',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

function CustomTick({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) {
  if (!payload || x == null || y == null) return null

  const label = payload.value
  const maxWidth = 140
  const words = label.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    if (testLine.length * 7 > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  }
  if (currentLine) lines.push(currentLine)

  const lineHeight = 16

  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((line, i) => (
        <text
          key={i}
          x={-10}
          y={lineHeight / 2 + i * lineHeight - ((lines.length - 1) * lineHeight) / 2}
          textAnchor="end"
          dominantBaseline="central"
          className="fill-foreground text-xs"
          fontSize={12}
        >
          {line}
        </text>
      ))}
    </g>
  )
}

export function ChartStatusActive({ data }: Props) {
  const { width: windowWidth } = useWindowSize()
  const isMobile = windowWidth < 640

  const chartData = data.map((item) => ({
    status: item.nama_status,
    jumlah: item.jumlah,
    kode: item.kode_status,
  }))

  const total = data.reduce((acc, item) => acc + item.jumlah, 0)

  const barHeight = 40
  const chartMinHeight = Math.max(220, data.length * barHeight + 50)

  const yAxisWidth = isMobile ? 150 : 180
  const leftMargin = isMobile ? 10 : 20
  const rightMargin = isMobile ? 15 : 30

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Aktif</CardTitle>
        <CardDescription>Data jumlah berdasarkan status</CardDescription>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <ChartContainer config={chartConfig} className="w-full" style={{ height: chartMinHeight, minWidth: isMobile ? 350 : undefined }}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            barCategoryGap={12}
            margin={{
              top: 10,
              right: rightMargin,
              left: leftMargin,
              bottom: 10,
            }}
          >
            <XAxis type="number" hide />

            <YAxis
              dataKey="status"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={yAxisWidth}
              tick={<CustomTick />}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent formatter={(value: any) => [`${value}`, 'Jumlah']} />}
            />

            <Bar dataKey="jumlah" fill="var(--color-jumlah)" radius={6} barSize={28}>
              <LabelList dataKey="jumlah" position="right" className="fill-foreground text-xs" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total data {total}
          <TrendingUp className="h-4 w-4" />
        </div>

        <div className="text-muted-foreground leading-none">
          Menampilkan jumlah seluruh status aktif
        </div>
      </CardFooter>
    </Card>
  )
}
