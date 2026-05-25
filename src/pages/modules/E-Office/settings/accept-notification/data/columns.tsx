import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'

export const ColumnsAcceptNotification = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'id',
      header: '#',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <p className="text-sm">{row.index + 1 + (page - 1) * limit}</p>
          </div>
        )
      },
    },
  ]

  return columns
}
