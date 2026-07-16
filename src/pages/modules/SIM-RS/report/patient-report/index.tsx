import { Card } from '@/components/ui/card'
import { CalendarCheck, UserRound, Users, VenetianMask } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetPatientReportList, UseGetPatientReportStats } from './hooks/index.tsx'
import { ColumnsPatientReport } from './data/columns.tsx'

export const PatientReportPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { stats, loading: loadingStats } = UseGetPatientReportStats()
  const { list, meta, loading } = UseGetPatientReportList({ page, limit, search })

  const columns = ColumnsPatientReport()

  const cards = [
    {
      title: 'Total Pasien',
      value: stats?.total_pasien ?? 0,
      icon: Users,
      iconBg: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-400',
    },
    {
      title: 'Laki-laki',
      value: stats?.total_laki_laki ?? 0,
      icon: UserRound,
      iconBg: 'bg-cyan-50',
      textColor: 'text-cyan-600',
      borderColor: 'border-cyan-400',
    },
    {
      title: 'Perempuan',
      value: stats?.total_perempuan ?? 0,
      icon: VenetianMask,
      iconBg: 'bg-pink-50',
      textColor: 'text-pink-600',
      borderColor: 'border-pink-400',
    },
    {
      title: 'Total Kunjungan',
      value: stats?.total_kunjungan ?? 0,
      icon: CalendarCheck,
      iconBg: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-400',
    },
  ]

  return (
    <div className={'space-y-5'}>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => (
          <Card
            key={item.title}
            className={`rounded-2xl border ${item.borderColor} shadow-none hover:shadow-md transition-all`}
          >
            <div className="flex items-center gap-4 p-4">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full ${item.iconBg}`}
              >
                <item.icon className={`h-8 w-8 ${item.textColor}`} strokeWidth={1.8} />
              </div>

              <div className="flex flex-col">
                <span className="text-base text-neutral-700">{item.title}</span>

                <h2 className={`text-5xl font-semibold ${item.textColor} leading-none mt-2`}>
                  {loadingStats ? '-' : item.value}
                </h2>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <ButtonTitleGroup label={'Laporan Pasien'} buttonGroup={[]} />
      <TableCustom data={list} columns={columns} loading={loading} meta={meta} />
    </div>
  )
}
