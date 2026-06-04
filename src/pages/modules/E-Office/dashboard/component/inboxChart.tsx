'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

interface ISifatSurat {
  id_sifat_surat: string
  nama_sifat: string
  warna_sifat: string
  total: number
}

interface Props {
  data: ISifatSurat[]
  label?: string
}

export default function ChartLetterNature({ data, label }: Props) {
  const chartData = data.map((item) => ({
    name: item.nama_sifat,
    value: item.total,
    color: item.warna_sifat,
  }))

  return (
    <Card className={'gap-2 w-full'}>
      <CardHeader>
        <CardTitle className="text-base font-semibold text-[#14274E]">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="w-36 h-36">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={45}
                  outerRadius={72}
                  paddingAngle={0}
                  fill={chartData[0]?.color}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="text-sm font-semibold">
                  {item.name} ({item.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
