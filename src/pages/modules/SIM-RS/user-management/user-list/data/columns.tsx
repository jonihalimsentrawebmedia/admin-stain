import { useSearchParams, useNavigate } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IUserList } from './types.ts'
import { HiPencil } from 'react-icons/hi'
import { format } from 'date-fns'
import { ButtonDeleteUser } from '../component/buttonDelete.tsx'

export const ColumnsUserList = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const navigate = useNavigate()

  const columns: ColumnDef<IUserList>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => <>{(page - 1) * limit + row.index + 1}</>,
    },
    {
      accessorKey: 'nama',
      header: 'Nama',
      cell: ({ row }) => (
        <button
          onClick={() => navigate(`/modules/sim-rs/user-management/user-list/detail/${row.original.id_user}`)}
          className="text-primary hover:underline text-left"
        >
          {row.original.nama}
        </button>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'nomor_telepon',
      header: 'No. Telepon',
    },
    {
      accessorKey: 'nama_role',
      header: 'Role',
    },
    {
      accessorKey: 'is_status',
      header: 'Status',
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.is_status
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {row.original.is_status ? 'Aktif' : 'Tidak Aktif'}
        </span>
      ),
    },
    {
      accessorKey: 'tanggal_registrasi',
      header: 'Tgl. Registrasi',
      cell: ({ row }) => {
        const date = new Date(row.original.tanggal_registrasi)
        return format(date, 'dd-MM-yyyy HH:mm')
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => (
        <div className={'flex justify-center items-center gap-2'}>
          <button
            onClick={() =>
              navigate(`/modules/sim-rs/user-management/user-list/edit/${row.original.id_user}`)
            }
            className={'bg-yellow-500 text-white hover:bg-yellow-600 p-1.5 rounded'}
          >
            <HiPencil />
          </button>
          <ButtonDeleteUser data={row.original} />
        </div>
      ),
    },
  ]

  return columns
}
