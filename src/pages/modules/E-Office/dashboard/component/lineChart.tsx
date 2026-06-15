'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

interface Props {
  data: {
    month: string
    suratMasuk: number
    suratKeluar: number
  }[]
}

export default function StatisticsChart({ data }: Props) {
  const itemSelect = ['minggu_ini', 'bulan_ini', 'enam_bulan', 'satu_tahun']
  const [searchParams, setSearchParams] = useSearchParams()
  const periode = searchParams.get('periode')

  useEffect(() => {
    if (!periode) {
      const params = new URLSearchParams()
      params.append('periode', 'enam_bulan')
      setSearchParams(params.toString())
    }
  }, [periode])

  return (
    <Card className="mt-5 border border-[#E5E7EB] shadow-none rounded-md">
      <CardContent className="">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[22px] font-medium text-[#14274E]">Statistik Surat</h2>

          <Select
            value={periode ?? ''}
            onValueChange={(e) => {
              const params = new URLSearchParams()
              params.append('periode', e)
              setSearchParams(params.toString())
            }}
          >
            <SelectTrigger className="w-[190px] h-10 rounded-full shadow-md border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {itemSelect?.map((item, index) => (
                <SelectItem className={'capitalize!'} key={index} value={item}>
                  {item.toLowerCase().split('_').join(' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* LEGEND */}
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl border bg-white">
            <div className="size-6 rounded-full bg-[#741905]" />

            <span className="text-base">Surat Masuk</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl border bg-white">
            <div className="size-6 rounded-full bg-[#FCA92B]" />

            <span className="text-base">Surat Keluar</span>
          </div>
        </div>

        {/* CHART */}
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                }}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                }}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="suratMasuk"
                stroke="#741905"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 5,
                }}
              />

              <Line
                type="monotone"
                dataKey="suratKeluar"
                stroke="#FCA92B"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
