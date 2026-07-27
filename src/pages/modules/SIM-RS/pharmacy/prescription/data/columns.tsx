import { useSearchParams, useNavigate } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IResepItem } from './types.ts'
import { format } from 'date-fns'
import { MdInfo } from 'react-icons/md'

export const ColumnsPrescription = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const navigate = useNavigate()

  const columns: ColumnDef<IResepItem>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => <>{(page - 1) * limit + row.index + 1}</>,
    },
    {
      accessorKey: 'tanggal_resep',
      header: 'Tanggal',
      cell: ({ row }) => {
        const date = new Date(row.original.tanggal_resep)
        return format(date, 'dd-MM-yyyy HH:mm')
      },
    },
    {
      accessorKey: 'nama_pasien',
      header: 'Nama Pasien',
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.nama_pasien}</p>
          <p className="text-xs text-gray-500">{row.original.no_rekam_medis_pasien}</p>
        </div>
      ),
    },
    {
      accessorKey: 'nama_dokter',
      header: 'Dokter',
    },
    {
      accessorKey: 'nama_poli',
      header: 'Poli',
    },
    {
      accessorKey: 'status_resep',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status_resep
        const badgeColor =
          status === 'MENUNGGU'
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-green-100 text-green-700'
        const statusLabel = status === 'MENUNGGU' ? 'Menunggu' : 'Selesai'
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
            {statusLabel}
          </span>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() =>
                navigate(`/modules/sim-rs/pharmacy/prescription/detail/${row.original.id_resep}`)
              }
              className="bg-blue-500 text-white hover:bg-blue-600 p-1.5 rounded"
            >
              <MdInfo className="size-4" />
            </button>
          </div>
        )
      },
    },
  ]

  return columns
}
