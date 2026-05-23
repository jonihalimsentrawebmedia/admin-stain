import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IInboxList } from '@/pages/modules/E-Office/inbox/list-inbox/data/types.ts'
import { formatDate } from 'date-fns'

export const columnsListInbox = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IInboxList>[] = [
    {
      accessorKey: 'id',
      header: '#',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'tanggal_surat',
      header: 'Tanggal',
      cell: ({ row }) => {
        const date = new Date(row.original.tanggal_surat)
        return <>{formatDate(date, 'dd/MM/yyyy')}</>
      },
    },
    {
      accessorKey: 'nomor_surat',
      header: 'Nomor Surat',
    },
    {
      accessorKey: 'perihal',
      header: 'Jenis Surat & Perihal',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className="flex items-center gap-2">
              <p
                className={'p-1.5 rounded-full px-3 w-fit'}
                style={{ backgroundColor: data?.warna_sifat_surat }}
              >
                {data?.nama_sifat_surat}
              </p>
              <p>{data?.nama_jenis_surat}</p>
            </div>
            <p>{data?.perihal}</p>
          </>
        )
      },
    },
  ]

  return columns
}
