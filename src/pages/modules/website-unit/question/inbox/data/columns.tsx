import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IMessage } from '@/pages/modules/website-utama/pertayaan/kotak-masuk/data/types.tsx'
import { ButtonReplyMessageProdi } from '@/pages/modules/website-prodi/question/inbox-message/components/buttonReply.tsx'

export const ColumnsInboxUnit = () => {
  const [searchParams] = useSearchParams()

  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IMessage>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row?.index + 1}</>
      },
    },
    {
      accessorKey: 'nama',
      header: 'Pengirim',
      cell: ({ row }) => {
        return (
          <div className={'grid lg:grid-cols-2 lg:gap-4 text-sm'}>
            <p className="whitespace-nowrap text-gray-500">Nama</p>
            <p className={'whitespace-nowrap'}>{row?.original?.nama}</p>
            <p className="whitespace-nowrap text-gray-500">Email</p>
            <p className={'whitespace-nowrap'}>{row?.original?.email}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'pesan',
      header: 'Pertanyaan',
      cell: ({ row }) => {
        return <p>{row?.original?.pesan}</p>
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        return (
          <p
            className={
              row?.original?.status === 'BELUM_TERJAWAB' ? 'text-red-500' : 'text-green-500'
            }
          >
            {row?.original.status === 'BELUM_TERJAWAB' ? 'Belum Terjawab' : 'Terjawab'}
          </p>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Balas',
      cell: ({ row }) => {
        return (
          <>
            <ButtonReplyMessageProdi data={row?.original} />
          </>
        )
      },
    },
  ]

  return columns
}
