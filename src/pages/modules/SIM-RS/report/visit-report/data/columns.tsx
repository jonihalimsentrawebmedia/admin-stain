import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IVisitReportList } from './types.ts'
import { format } from 'date-fns'

export const ColumnsVisitReport = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IVisitReportList>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => <>{(page - 1) * limit + row.index + 1}</>,
    },
    {
      accessorKey: 'no_pendaftaran',
      header: 'No. Registrasi',
    },
    {
      accessorKey: 'tanggal_pendaftaran',
      header: 'Tanggal',
      cell: ({ row }) => {
        const date = new Date(row.original.tanggal_pendaftaran)
        return format(date, 'dd-MM-yyyy')
      },
    },
    {
      accessorKey: 'pasien',
      header: 'Pasien',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <p>{data?.nama_pasien}</p>
            <p className="text-primary text-sm font-semibold">{data?.nik_pasien}</p>
          </>
        )
      },
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
    },
    {
      accessorKey: 'status_rawat_jalan',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status_rawat_jalan
        const color =
          status === 'SELESAI'
            ? 'bg-green-100 text-green-700'
            : status === 'DALAM_PERAWATAN'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-blue-100 text-blue-700'
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
            {status}
          </span>
        )
      },
    },
  ]

  return columns
}
