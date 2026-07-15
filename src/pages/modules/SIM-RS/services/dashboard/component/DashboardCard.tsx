import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
  className?: string
}

export default function DashboardCard({
  title,

  children,

  className,
}: Props) {
  return (
    <Card
      className={cn('rounded-2xl shadow-[0_4px_12px_rgba(51,51,51,.12)] border p-5', className)}
    >
      <h2 className="text-3xl font-medium text-[#278374] mb-5">{title}</h2>

      {children}
    </Card>
  )
}
