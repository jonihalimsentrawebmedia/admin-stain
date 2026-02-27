import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { MdInfo } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'
import type { IListActivityProgram } from '../data/types'
import { ButtonDeleteActivityProgram } from '@/pages/modules/LPPM/devotion/schema/internal/activity-program/component/buttonDelete.tsx'

export const ColumnsStudyCenter = () => {
  const [searchParam] = useSearchParams()
  const page = Number(searchParam.get('page') ?? 1)
  const limit = Number(searchParam.get('limit') ?? 10)

  const columns: ColumnDef<IListActivityProgram>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return (page - 1) * limit + row.index + 1
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-x-2">
            <Link
              to={`detail/${row?.original.id_daftar_skema}`}
              className={'p-1.5 rounded bg-blue-500 text-white hover:bg-blue-600'}
            >
              <MdInfo className={'size-4'} />
            </Link>
            <Link
              to={`edit/${row?.original.id_daftar_skema}`}
              className={'p-1.5 rounded bg-yellow-500 text-white hover:bg-yellow-600'}
            >
              <HiPencil className={'size-4'} />
            </Link>
            <ButtonDeleteActivityProgram {...row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}
