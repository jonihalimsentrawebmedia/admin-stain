import StatisticCard from './StatisticCard'
import { UseGetDashboard } from '@/pages/modules/SIM-RS/services/dashboard/hooks/index.tsx'
import { Bed, Stethoscope, UserRound, Users } from 'lucide-react'
import type { StatisticCardType } from '@/pages/modules/SIM-RS/services/dashboard/data/types.ts'

export default function StatisticSection() {
  const { dashboard } = UseGetDashboard()

  const cards: StatisticCardType[] = [
    { title: 'Total Pasien', value: dashboard?.total_pasien ?? 0, icon: Users },
    { title: 'Rawat Jalan', value: dashboard?.total_rawat_jalan ?? 0, icon: Stethoscope },
    { title: 'Rawat Inap', value: dashboard?.total_rawat_inap ?? 0, icon: Bed },
    { title: 'Dokter Bertugas', value: dashboard?.total_dokter ?? 0, icon: UserRound },
  ]

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => (
        <StatisticCard key={item.title} {...item} />
      ))}
    </section>
  )
}
