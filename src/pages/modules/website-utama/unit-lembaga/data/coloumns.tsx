import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IUnitInstitution } from '@/pages/modules/website-utama/unit-lembaga/data/types.ts'
import { FaForward } from 'react-icons/fa'

export const ColumnsUnitInstitution = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IUnitInstitution>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'kelompok',
      header: 'Kelompok',
    },
    {
      accessorKey: 'nama',
      header: 'Nama',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <div className="flex gap-2 items-center">
            <Link
              to={`detail/${data.id_satuan_organisasi}`}
              className={'bg-blue-500 p-1.5 text-white rounded hover:bg-blue-600'}
            >
              <FaForward />
            </Link>
          </div>
        )
      },
    },
  ]

  return columns
}
