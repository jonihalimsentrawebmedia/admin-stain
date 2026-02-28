import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IActivityProgram } from '@/pages/modules/LPPM/research/schema/internal/activity/data/types.tsx'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteActivity } from '@/pages/modules/LPPM/research/schema/internal/activity/component/buttonDelete.tsx'
import { MdInfo } from 'react-icons/md'

export const ColumnsActivityProgram = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const Columns: ColumnDef<IActivityProgram>[] = [
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
              to={`detail/${row?.original?.id_daftar_program_kegiatan}`}
              className={'p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600'}
            >
              <MdInfo />
            </Link>
            <Link
              to={`edit/${row?.original?.id_daftar_program_kegiatan}`}
              className={'p-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600'}
            >
              <HiPencil />
            </Link>
            <ButtonDeleteActivity data={row.original} />
          </div>
        )
      },
    },
  ]

  return Columns
}
