import { Card } from '@/components/ui/card'
import { BedDouble, CalendarCheck, CheckCircle, DoorOpen } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetVisitReportList, UseGetVisitReportStats } from './hooks/index.tsx'
import { UseGetPoli } from '@/pages/modules/SIM-RS/reference/poli/hooks/index.tsx'
import { UseGetDoctor } from '@/pages/modules/SIM-RS/reference/doctor/hooks/index.tsx'
import { ColumnsVisitReport } from './data/columns.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'

const statusOptions = [
  { label: 'Selesai', value: 'SELESAI' },
  { label: 'Dalam Perawatan', value: 'DALAM_PERAWATAN' },
  { label: 'Menunggu', value: 'MENUNGGU' },
  { label: 'Dibatalkan', value: 'DIBATALKAN' },
]

export const VisitReportPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const id_poli = searchParams.get('id_poli') ?? ''
  const id_dokter = searchParams.get('id_dokter') ?? ''
  const status = searchParams.get('status') ?? ''

  const { stats, loading: loadingStats } = UseGetVisitReportStats()
  const { list, meta, loading } = UseGetVisitReportList({
    page,
    limit,
    search,
    id_poli,
    id_dokter,
    status,
  })

  const { poli } = UseGetPoli({ limit: '0', page: '0' })
  const { doctor } = UseGetDoctor({ limit: '0', page: '0' })

  const poliData = poli?.map((row) => ({ label: row.nama, value: row.id_poli })) ?? []
  const doctorData = doctor?.map((row) => ({ label: row.nama, value: row.id_dokter })) ?? []

  const columns = ColumnsVisitReport()

  const cards = [
    {
      title: 'Total Kunjungan',
      value: stats?.total_kunjungan ?? 0,
      icon: CalendarCheck,
      iconBg: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-400',
    },
    {
      title: 'Rawat Jalan',
      value: stats?.total_rawat_jalan ?? 0,
      icon: DoorOpen,
      iconBg: 'bg-cyan-50',
      textColor: 'text-cyan-600',
      borderColor: 'border-cyan-400',
    },
    {
      title: 'Rawat Inap',
      value: stats?.total_rawat_inap ?? 0,
      icon: BedDouble,
      iconBg: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-400',
    },
    {
      title: 'Selesai',
      value: stats?.total_selesai ?? 0,
      icon: CheckCircle,
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

      <ButtonTitleGroup label={'Laporan Kunjungan'} buttonGroup={[]} />
      <div className="flex flex-col sm:flex-row gap-4">
        <SelectFilter
          name="id_poli"
          label="Poli"
          options={poliData}
          selectClassName="w-full sm:min-w-[200px]"
        />
        <SelectFilter
          name="id_dokter"
          label="Dokter"
          options={doctorData}
          selectClassName="w-full sm:min-w-[200px]"
        />
        <SelectFilter
          name="status"
          label="Status"
          options={statusOptions}
          selectClassName="w-full sm:min-w-[200px]"
        />
      </div>
      <TableCustom data={list} columns={columns} loading={loading} meta={meta} />
    </div>
  )
}
