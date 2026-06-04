import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import type { IInboxList } from '@/pages/modules/E-Office/inbox/list-inbox/data/types.ts'

export const ColumnsInboxDashboard = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IInboxList>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'tanggal_surat',
      header: 'Tanggal',
      cell: ({ row }) => {
        const data = row?.original
        const date = data?.tanggal_surat
        return <p>{date ? format(date, 'dd/MM/yyyy') : '-'}</p>
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
    {
      accessorKey: 'nama_asal_surat',
      header: 'Asal Surat',
    },
    {
      accessorKey: 'penerima_surat',
      header: 'Penerima Surat',
    },
    {
      accessorKey: 'disposisi',
      header: 'Disposisi',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            {data?.list_disposisi?.map((row, index) => (
              <p key={index}>{row}</p>
            ))}
          </>
        )
      },
    },
  ]
  return columns
}
