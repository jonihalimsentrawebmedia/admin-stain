import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IPatientReportList } from './types.ts'
import { format } from 'date-fns'

export const ColumnsPatientReport = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IPatientReportList>[] = [
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
      header: 'Nama / NIK',
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
      accessorKey: 'jenis_kelamin',
      header: 'Jenis Kelamin',
      cell: ({ row }) => (
        <>{row.original.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</>
      ),
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
      accessorKey: 'golongan_darah',
      header: 'Gol. Darah',
    },
    {
      accessorKey: 'tanggal_registrasi',
      header: 'Tanggal Registrasi',
      cell: ({ row }) => {
        const date = new Date(row.original.tanggal_registrasi)
        return format(date, 'dd-MM-yyyy HH:mm')
      },
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
  ]

  return columns
}
