import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IRoomType } from '@/pages/modules/SIM-RS/reference/room-type/data/types.ts'
import { ButtonEditRoomType } from '@/pages/modules/SIM-RS/reference/room-type/component/buttonEdit.tsx'
import { ButtonDeleteRoomType } from '@/pages/modules/SIM-RS/reference/room-type/component/buttonDelete.tsx'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'

export const ColumnsRoomType = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const permission = GuardCrud({ keys: 'JENIS_RUANGAN' })

  const columns: ColumnDef<IRoomType>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'nama',
      header: 'Nama Jenis Ruangan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <>
            <div className={'flex justify-center items-center gap-2'}>
              {permission?.kelola && (
                <>
                  <ButtonEditRoomType data={row.original} />
                  <ButtonDeleteRoomType data={row.original} />
                </>
              )}
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
