import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IReminderAgenda } from '../data/types.ts'
import ButtonEditReminderAgenda from '../component/buttonEdit.tsx'
import ButtonDeleteReminderAgenda from '../component/buttonDelete.tsx'

export const ColumnsReminderAgenda = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IReminderAgenda>[] = [
    {
      accessorKey: 'id',
      header: '#',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'waktu',
      header: 'Waktu',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <p>{data?.waktu} Menit</p>
          </>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className={'flex justify-end w-full gap-2'}>
              <ButtonEditReminderAgenda data={data} />
              <ButtonDeleteReminderAgenda data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
