import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IInpatientReportList } from './types.ts'
import { format } from 'date-fns'

export const ColumnsInpatientReport = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IInpatientReportList>[] = [
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
      accessorKey: 'pasien',
      header: 'Pasien',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <p>{data?.nama_pasien}</p>
            <p className="text-primary text-sm font-semibold">{data?.no_rm}</p>
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
      accessorKey: 'nama_ruangan',
      header: 'Ruangan',
      cell: ({ row }) => {
        const data = row.original
        if (!data.nama_ruangan) return '-'
        const ruang = [data.nomor_ruangan, data.nama_ruangan].filter(Boolean).join(' - ')
        return <>{ruang}</>
      },
    },
    {
      accessorKey: 'tanggal_masuk',
      header: 'Tgl. Masuk',
      cell: ({ row }) => {
        if (!row.original.tanggal_masuk) return '-'
        return format(new Date(row.original.tanggal_masuk), 'dd-MM-yyyy')
      },
    },
    {
      accessorKey: 'tanggal_keluar',
      header: 'Tgl. Keluar',
      cell: ({ row }) => {
        if (!row.original.tanggal_keluar) return '-'
        return format(new Date(row.original.tanggal_keluar), 'dd-MM-yyyy')
      },
    },
    {
      accessorKey: 'status_rawat_inap',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status_rawat_inap
        const color =
          status === 'PULANG'
            ? 'bg-green-100 text-green-700'
            : status === 'SEDANG_DIRAWAT'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-blue-100 text-blue-700'
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
            {status === 'MENUNGGU_RUANGAN' ? 'Menunggu Ruangan' : status === 'SEDANG_DIRAWAT' ? 'Dirawat' : 'Pulang'}
          </span>
        )
      },
    },
  ]

  return columns
}
