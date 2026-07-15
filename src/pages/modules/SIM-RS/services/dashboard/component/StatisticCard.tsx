import { Card } from '@/components/ui/card'
import type { StatisticCardType } from '@/pages/modules/SIM-RS/services/dashboard/data/types.ts'

export default function StatisticCard({
  title,
  value,
  icon: Icon,
  iconBg = 'bg-emerald-50',
}: StatisticCardType) {
  return (
    <Card className="rounded-2xl border-[#74C1B4] shadow-none hover:shadow-md transition-all">
      <div className="flex items-center gap-4 p-4">
        <div className={`flex h-16 w-16 items-center justify-center rounded-full ${iconBg}`}>
          <Icon className="h-8 w-8 text-[#278374]" strokeWidth={1.8} />
        </div>

        <div className="flex flex-col">
          <span className="text-base text-neutral-700">{title}</span>

          <h2 className="text-5xl font-semibold text-[#278374] leading-none mt-2">{value}</h2>
        </div>
      </div>
    </Card>
  )
}
