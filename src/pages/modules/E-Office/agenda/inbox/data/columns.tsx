import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IInboxAgenda } from '@/pages/modules/E-Office/agenda/inbox/data/types.ts'
import { formatDate } from 'date-fns'

const ColumnsInboxAgenda = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IInboxAgenda>[] = [
    {
      accessorKey: 'id',
      header: '#',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <p className="text-sm">{row.index + 1 + (page - 1) * limit}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'tanggal_mulai',
      header: 'Jadwal',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <p>
              {data?.tanggal_mulai ? formatDate(data?.tanggal_mulai, 'dd/MM/yyyy | HH:mm') : ''} s.d{' '}
              {data?.tanggal_selesai ? formatDate(data?.tanggal_selesai, 'dd/MM/yyyy | HH:mm') : ''}
            </p>
          </>
        )
      },
    },
    {
      accessorKey: 'nama_kegiatan',
      header: 'Nama Kegiatan',
    },
    {
      accessorKey: 'tempat',
      header: 'Tempat',
    },
    {
      accessorKey: 'nama_asal_surat',
      header: 'Asal Surat',
    },
    {
      accessorKey: 'penerima_surat',
      header: 'Penerima Surat',
    },
    {
      accessorKey: 'nama_sifat_surat',
      header: 'Status',
    },
  ]

  return columns
}

export default ColumnsInboxAgenda
