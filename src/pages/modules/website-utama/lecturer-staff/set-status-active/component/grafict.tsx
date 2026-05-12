'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'

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

// comentar kjontol gk bulap

const chartConfig = {
  jumlah: {
    label: 'Jumlah',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

export function ChartStatusActive({ data }: Props) {
  const chartData = data.map((item) => ({
    status: item.nama_status,
    jumlah: item.jumlah,
    kode: item.kode_status,
  }))

  const total = data.reduce((acc, item) => acc + item.jumlah, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Aktif</CardTitle>
        <CardDescription>Data jumlah berdasarkan status</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[220px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            barCategoryGap={12}
            margin={{
              top: 10,
              right: 30,
              left: 10,
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
              width={130}
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
