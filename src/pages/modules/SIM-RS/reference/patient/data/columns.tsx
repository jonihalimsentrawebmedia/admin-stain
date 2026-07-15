import { useNavigate, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IPatient } from './types.ts'
import { ButtonEditPatient } from '../components/buttonEdit.tsx'
import { ButtonDeletePatient } from '../components/buttonDelete.tsx'
import { format } from 'date-fns'

export const ColumnsPatient = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const navigate = useNavigate()

  const columns: ColumnDef<IPatient>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => <>{(page - 1) * limit + row.index + 1}</>,
    },
    {
      accessorKey: 'no_rekam_medis',
      header: 'No. Rekam Medis',
    },
    {
      accessorKey: 'nik',
      header: 'NIK',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <p>{data?.nama_lengkap}</p>
            <p className={'text-primary text-sm font-semibold'}>{data?.nik}</p>
          </>
        )
      },
    },
    {
      accessorKey: 'tempat_lahir',
      header: 'Tempat Lahir',
    },
    {
      accessorKey: 'tanggal_lahir',
      header: 'Tanggal Lahir',
      cell: ({ row }) => {
        const date = new Date(row.original.tanggal_lahir)
        return format(date, 'dd-MM-yyyy')
      },
    },
    {
      accessorKey: 'jenis_kelamin',
      header: 'JK',
      cell: ({ row }) => <>{row.original.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</>,
    },
    {
      accessorKey: 'no_telepon',
      header: 'No Telepon',
    },
    {
      accessorKey: 'is_status',
      header: 'Status',
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.is_status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {row.original.is_status ? 'Aktif' : 'Tidak Aktif'}
        </span>
      ),
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => (
        <div className={'flex justify-center items-center gap-2'}>
          <button
            onClick={() =>
              navigate(`/modules/sim-rs/reference/patient/detail/${row.original.id_pasien}`)
            }
            className={'bg-blue-500 text-white hover:bg-blue-600 p-1.5 rounded'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
          <ButtonEditPatient data={row.original} />
          <ButtonDeletePatient data={row.original} />
        </div>
      ),
    },
  ]

  return columns
}
