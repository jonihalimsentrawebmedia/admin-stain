import { useSearchParams, useNavigate } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IRole } from './types.ts'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteRole } from '../component/buttonDelete.tsx'

export const ColumnsRole = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const navigate = useNavigate()

  const columns: ColumnDef<IRole>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => <>{(page - 1) * limit + row.index + 1}</>,
    },
    {
      accessorKey: 'kode_role',
      header: 'Kode Role',
    },
    {
      accessorKey: 'nama_role',
      header: 'Nama Role',
    },
    {
      accessorKey: 'hak_akses',
      header: 'Hak Akses',
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {(row.original.hak_akses ?? []).map((item) => (
            <span
              key={item}
              className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
            >
              {item}
            </span>
          ))}
        </div>
      ),
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex justify-center items-center gap-2'}>
            <button
              onClick={() =>
                navigate(`/modules/sim-rs/user-management/role/edit/${row.original.id_role}`)
              }
              className={'bg-yellow-500 text-white hover:bg-yellow-600 p-1.5 rounded'}
            >
              <HiPencil />
            </button>
            <ButtonDeleteRole data={row.original} />
          </div>
        )
      },
    },
  ]

  return columns
}
