import DashboardCard from './DashboardCard'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { UseGetPendaftaranPerPoli } from '@/pages/modules/SIM-RS/services/dashboard/hooks/index.tsx'

const colors = ['#2769CD', '#CDA327', '#CD2738', '#27CD7F', '#8B5CF6', '#F59E0B']

export default function DistributionChart() {
  const { pendaftaranPerPoli } = UseGetPendaftaranPerPoli()

  const items = pendaftaranPerPoli?.items ?? []

  return (
    <DashboardCard title="Distribusi Poli Hari Ini" className="h-full">
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.id_poli}>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="h-5 w-5 rounded-full"
                style={{ background: colors[index % colors.length] }}
              />

              <span className="text-base">{item.nama_poli}</span>
            </div>

            <div className="flex items-center gap-3">
              <Progress value={item.persentase} className="h-6" />

              <span className="whitespace-nowrap">
                {item.persentase}% ({item.jumlah})
              </span>
            </div>
          </div>
        ))}

        <Separator />

        <h2 className="text-5xl font-semibold">Total {pendaftaranPerPoli?.total ?? 0}</h2>
      </div>
    </DashboardCard>
  )
}
