import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IRoom } from '@/pages/modules/SIM-RS/reference/room/data/types.ts'
import { ButtonDeleteRoom } from '@/pages/modules/SIM-RS/reference/room/component/buttonDelete.tsx'
import { useNavigate } from 'react-router-dom'
import { HiPencil } from 'react-icons/hi'

export const ColumnsRoom = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const navigate = useNavigate()

  const columns: ColumnDef<IRoom>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'nama',
      header: 'Nama Ruangan',
    },
    {
      accessorKey: 'nomor',
      header: 'Nomor',
    },
    {
      accessorKey: 'nama_jenis_ruangan',
      header: 'Jenis Ruangan',
    },
    {
      accessorKey: 'jumlah_kasur',
      header: 'Jumlah Kasur',
    },
    {
      accessorKey: 'lokasi',
      header: 'Lokasi',
    },
    {
      accessorKey: 'is_status',
      header: 'Status',
      cell: ({ row }) => {
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              row.original.is_status
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {row.original.is_status ? 'Aktif' : 'Tidak Aktif'}
          </span>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <>
            <div className={'flex justify-center items-center gap-2'}>
              <button
                onClick={() =>
                  navigate(`/modules/sim-rs/reference/room/edit/${row.original.id_ruangan}`)
                }
                className={'bg-yellow-500 text-white hover:bg-yellow-600 p-1.5 rounded'}
              >
                <HiPencil />
              </button>
              <ButtonDeleteRoom data={row.original} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
