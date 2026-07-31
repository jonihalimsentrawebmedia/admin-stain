import StatisticSection from '@/pages/modules/SIM-RS/services/dashboard/component/StatisticSection.tsx'
import QuickActionSection from '@/pages/modules/SIM-RS/services/dashboard/component/QuickActionSection.tsx'
import DashboardCharts from '@/pages/modules/SIM-RS/services/dashboard/component/DashboardCharts.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-end">
        <ButtonGoToGuide titleGuide={'Dashboard'} valueGuide="SIM_RS_DASHBOARD" />
      </div>
      <StatisticSection />
      <QuickActionSection />
      <DashboardCharts />
    </div>
  )
}
