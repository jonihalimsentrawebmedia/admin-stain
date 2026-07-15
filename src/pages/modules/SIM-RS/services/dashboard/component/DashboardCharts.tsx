import VisitChart from './VisitChart'
import DistributionChart from './DistributionChart'

export default function DashboardCharts() {
  return (
    <section className="grid gap-4 lg:grid-cols-[2fr_1.2fr]">
      <VisitChart />
      <DistributionChart />
    </section>
  )
}
