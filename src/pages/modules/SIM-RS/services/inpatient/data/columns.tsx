import { useNavigate, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IRegistration } from '@/pages/modules/SIM-RS/services/register/data/types.ts'
import { format } from 'date-fns'
import { MdInfo, MdLogout } from 'react-icons/md'
import { ButtonRoom } from '../components/ButtonRoom.tsx'
import { HiPencil } from 'react-icons/hi'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'

export const ColumnsInpatient = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const permision = GuardCrud({ keys: 'RAWAT_INAP' })
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
        const inap = data.status_rawat_inap

        if (inap === 'MENUNGGU_RUANGAN' && permision?.kelola) {
          return <ButtonRoom data={data} />
        }

        if (inap === 'DIRAWAT' && permision?.kelola) {
          return (
            <button
              onClick={() =>
                navigate(`/modules/sim-rs/services/inpatient/back-home/${data.id_pendaftaran}`)
              }
              className="bg-teal-500 text-white hover:bg-teal-600 px-3 py-1 rounded text-xs font-medium flex items-center gap-1"
            >
              <MdLogout className="size-3.5" />
              Pasien Pulang
            </button>
          )
        }

        if (inap === 'PULANG') {
          return <>{inap}</>
        }

        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {inap ?? '-'}
          </span>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-1.5">
          <button
            onClick={() => navigate(`detail/${row.original.id_pendaftaran}`)}
            className="bg-blue-500 text-white hover:bg-blue-600 p-1.5 rounded"
          >
            <MdInfo className="size-4" />
          </button>
          {row?.original?.status_rawat_inap === 'PULANG' && permision?.kelola && (
            <button
              onClick={() => navigate(`edit/${row.original.id_pendaftaran}`)}
              className="bg-yellow-500 text-white hover:bg-yellow-600 p-1.5 rounded"
            >
              <HiPencil className="size-4" />
            </button>
          )}
          {row?.original?.status_rawat_inap === 'PULANG' && permision?.kelola && (
            <button
              onClick={() => navigate(`invoice/${row.original.id_pendaftaran}`)}
              className="bg-primary text-white hover:bg-primary/80 px-3 py-1.5 rounded text-xs font-medium"
            >
              Lihat Tagihan
            </button>
          )}
        </div>
      ),
    },
  ]

  return columns
}
