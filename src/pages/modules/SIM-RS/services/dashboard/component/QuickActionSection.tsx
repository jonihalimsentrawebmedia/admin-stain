import { Card } from '@/components/ui/card'
import QuickAction from './QuickAction'
import { quickActions } from '@/pages/modules/SIM-RS/services/dashboard/data/types.ts'
import { useNavigate } from 'react-router-dom'

export default function QuickActionSection() {
  const navigate = useNavigate()
  return (
    <Card className="rounded-2xl border shadow-md p-5 space-y-4">
      <h2 className="text-3xl font-medium text-[#278374]">Akses Cepat</h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((item) => (
          <QuickAction
            key={item.title}
            {...item}
            onClick={() => {
              navigate(item.link, { replace: true })
            }}
          />
        ))}
      </div>
    </Card>
  )
}
