import { useNavigate, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IRoom } from '@/pages/modules/SIM-RS/reference/room/data/types.ts'
import { ButtonDeleteRoom } from '@/pages/modules/SIM-RS/reference/room/component/buttonDelete.tsx'
import { HiPencil } from 'react-icons/hi'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'
import { MdInfo } from 'react-icons/md'

export const ColumnsRoom = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const navigate = useNavigate()
  const permission = GuardCrud({ keys: 'RUANGAN' })

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
      accessorKey: 'harga',
      header: 'Harga / Hari',
      cell: ({ row }) => {
        return (
          <>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumFractionDigits: 0,
            }).format(row.original.harga)}
          </>
        )
      },
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
              row.original.is_status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
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
              {permission?.melihat && (
                <button
                  onClick={() =>
                    navigate(`/modules/sim-rs/reference/room/detail/${row.original.id_ruangan}`)
                  }
                  className={'bg-blue-500 text-white hover:bg-blue-600 p-1.5 rounded'}
                >
                  <MdInfo />
                </button>
              )}
              {permission?.kelola && (
                <>
                  <button
                    onClick={() =>
                      navigate(`/modules/sim-rs/reference/room/edit/${row.original.id_ruangan}`)
                    }
                    className={'bg-yellow-500 text-white hover:bg-yellow-600 p-1.5 rounded'}
                  >
                    <HiPencil />
                  </button>
                  <ButtonDeleteRoom data={row.original} />
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
