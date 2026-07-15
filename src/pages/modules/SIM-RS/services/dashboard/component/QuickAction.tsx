import { Button } from '@/components/ui/button'
import type { QuickActionType } from '@/pages/modules/SIM-RS/services/dashboard/data/types.ts'

export default function QuickAction({ title, icon: Icon, onClick }: QuickActionType) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="h-11 rounded-lg border-[#278374] text-[#278374] bg-white hover:bg-[#278374] hover:text-white transition-all duration-200 flex-1"
    >
      <Icon className="mr-2 h-5 w-5" strokeWidth={2} />

      {title}
    </Button>
  )
}
