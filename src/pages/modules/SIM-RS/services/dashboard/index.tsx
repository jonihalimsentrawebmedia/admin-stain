import StatisticSection from '@/pages/modules/SIM-RS/services/dashboard/component/StatisticSection.tsx'
import QuickActionSection from '@/pages/modules/SIM-RS/services/dashboard/component/QuickActionSection.tsx'
import DashboardCharts from '@/pages/modules/SIM-RS/services/dashboard/component/DashboardCharts.tsx'

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      <StatisticSection />
      <QuickActionSection />
      <DashboardCharts />
    </div>
  )
}
