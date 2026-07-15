import { useState } from 'react'
import DashboardCard from './DashboardCard'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UseGetGrafikKunjungan } from '@/pages/modules/SIM-RS/services/dashboard/hooks/index.tsx'

export default function VisitChart() {
  const [periode, setPeriode] = useState('minggu')
  const { grafik } = UseGetGrafikKunjungan(periode)

  const chartData = grafik?.items.map((item) => {
    let label = item.label
    if (periode === 'tahun') {
      const date = new Date(item.label)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
      label = months[date.getMonth()]
    }
    return { date: label, total: item.jumlah }
  }) ?? []

  return (
    <DashboardCard title="Grafik Kunjungan Pasien" className="h-full">
      <div className="flex justify-end mb-6">
        <Select defaultValue="minggu" onValueChange={setPeriode}>
          <SelectTrigger className="w-28 rounded-full">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="minggu">Mingguan</SelectItem>
            <SelectItem value="6bulan">6 Bulan</SelectItem>
            <SelectItem value="tahun">Tahunan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={chartData}>
          <XAxis dataKey="date" />

          <Tooltip />

          <Bar radius={[6, 6, 0, 0]} dataKey="total" fill="#278374" />
        </BarChart>
      </ResponsiveContainer>
    </DashboardCard>
  )
}
