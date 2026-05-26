import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { INotification } from '@/pages/modules/E-Office/settings/accept-notification/data/types.ts'
import { cn } from '@/lib/utils.ts'
import { ButtonEditNotification } from '@/pages/modules/E-Office/settings/accept-notification/component/buttonEdit.tsx'
import ButtonDeleteAcceptNotification from '@/pages/modules/E-Office/settings/accept-notification/component/buttonDelete.tsx'

export const ColumnsAcceptNotification = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<INotification>[] = [
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
    {
      accessorKey: 'nama_unit',
      header: 'Instansi',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'no_telepon',
      header: 'Telepon',
    },
    {
      accessorKey: 'id_telegram',
      header: 'ID Telegram',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <p
              className={cn(
                data?.status
                  ? 'bg-green-500 text-white p-1.5 px-3'
                  : 'bg-red-500 text-white p-1.5 px-3',
                'rounded-full w-fit'
              )}
            >
              {data?.status ? 'Aktif' : 'Tidak Aktif'}
            </p>
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
            <div className="flex items-center justify-center gap-1.5">
              <ButtonEditNotification data={data} />
              <ButtonDeleteAcceptNotification data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
