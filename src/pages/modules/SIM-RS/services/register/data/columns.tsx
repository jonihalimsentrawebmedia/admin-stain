import { useNavigate, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IRegistration } from './types.ts'
import { format } from 'date-fns'
import { HiPencil } from 'react-icons/hi'
import { MdInfo } from 'react-icons/md'
import { ButtonCall } from '../components/ButtonCall.tsx'
import { ButtonCancel } from '../components/ButtonCancel.tsx'

export const ColumnsRegistration = () => {
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
      accessorKey: 'keputusan_perawatan',
      header: 'Keputusan Perawatan',
      cell: ({ row }) => {
        const data = row.original
        const status = data.status

        if (status === 'SELESAI') {
          return (
            <span className="text-sm font-medium text-gray-700">
              {data.keputusan_perawatan === 'RAWAT_INAP' ? 'Rawat Inap' : 'Rawat Jalan'}
            </span>
          )
        }

        return (
          <div className="flex items-center gap-2">
            {status === 'MENUNGGU' && <ButtonCall data={data} />}
            {status === 'DIPANGGIL' && (
              <button
                type="button"
                onClick={() =>
                  navigate(`/modules/sim-rs/services/registration/diagnosis/${data.id_pendaftaran}`)
                }
                className="bg-green-500 text-white px-3 py-1 rounded text-xs font-medium hover:bg-green-600"
              >
                Mulai Pemeriksaan
              </button>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() =>
              navigate(
                `/modules/sim-rs/services/registration/detail/${row.original.id_pendaftaran}`
              )
            }
            className="bg-blue-500 text-white hover:bg-blue-600 p-1.5 rounded"
          >
            <MdInfo className="size-4" />
          </button>
          <button
            onClick={() =>
              navigate(`/modules/sim-rs/services/registration/edit/${row.original.id_pendaftaran}`)
            }
            className="bg-yellow-500 text-white hover:bg-yellow-600 p-1.5 rounded"
          >
            <HiPencil className="size-4" />
          </button>
          {(row.original.status === 'MENUNGGU' || row.original.status === 'DIPANGGIL') && (
            <ButtonCancel data={row.original} />
          )}
          {/*<ButtonDelete data={row.original} />*/}
        </div>
      ),
    },
  ]

  return columns
}
