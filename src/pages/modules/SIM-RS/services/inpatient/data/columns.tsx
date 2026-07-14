import { useNavigate, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IRegistration } from '@/pages/modules/SIM-RS/services/register/data/types.ts'
import { format } from 'date-fns'
import { MdInfo } from 'react-icons/md'
import { ButtonRoom } from '../components/ButtonRoom.tsx'

export const ColumnsInpatient = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const navigate = useNavigate()

  const columns: ColumnDef<IRegistration>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => <>{(page - 1) * limit + row.index + 1}</>,
    },
    {
      accessorKey: 'no_pendaftaran',
      header: 'No. Pendaftaran',
    },
    {
      accessorKey: 'tanggal_pendaftaran',
      header: 'Tanggal',
      cell: ({ row }) => {
        const date = new Date(row.original.tanggal_pendaftaran)
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
      accessorKey: 'nama_poli',
      header: 'Poli',
    },
    {
      accessorKey: 'nama_dokter',
      header: 'Dokter',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const data = row.original

        if (data.status_rawat_inap === 'MENUNGGU_RUANGAN') {
          return <ButtonRoom data={data} />
        }

        const status = data.status
        const badgeColor =
          status === 'MENUNGGU'
            ? 'bg-yellow-100 text-yellow-700'
            : status === 'DIPANGGIL'
              ? 'bg-blue-100 text-blue-700'
              : status === 'SELESAI'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
        const label =
          status === 'MENUNGGU'
            ? 'Menunggu'
            : status === 'DIPANGGIL'
              ? 'Dipanggil'
              : status === 'SELESAI'
                ? 'Selesai'
                : 'Dibatalkan'
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
            {label}
          </span>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <button
            onClick={() =>
              navigate(`/modules/sim-rs/services/inpatient/detail/${row.original.id_pendaftaran}`)
            }
            className="bg-blue-500 text-white hover:bg-blue-600 p-1.5 rounded"
          >
            <MdInfo className="size-4" />
          </button>
        </div>
      ),
    },
  ]

  return columns
}
