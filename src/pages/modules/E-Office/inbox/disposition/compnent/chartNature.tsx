'use client'

import { Card, CardContent } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import { Pie, PieChart, Sector } from 'recharts'

export interface IChartNature {
  id_sifat_surat: string
  nama_sifat: string
  total: number
  created_at?: string
  updated_at?: string
}

interface Props {
  data: IChartNature[]
}

const COLORS = [
  '#ff4d6d',
  '#f59e0b',
  '#7c5cff',
  '#10b981',
  '#3b82f6',
  '#ec4899',
]

export default function ChartNature({ data }: Props) {
  const chartData = data.map((item, index) => ({
    name: item.nama_sifat,
    value: item.total,
    color: COLORS[index % COLORS.length],
  }))

  return (
    <Card className=" bg-white rounded">
      <CardContent className="flex items-center gap-8 p-2">
        {/* Chart */}
        <ChartContainer
          config={{
            total: {
              label: 'Total',
            },
          }}
          className="h-[120px] w-[120px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={35}
              outerRadius={57}
              paddingAngle={1}
              strokeWidth={0}
              shape={(props: any) => (
                <Sector
                  {...props}
                  fill={props.payload.color}
                />
              )}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="space-y-4">
          {chartData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              <div
                className="size-3 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <div className="text-sm font-medium text-foreground">
                {item.name} ({item.value})
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}