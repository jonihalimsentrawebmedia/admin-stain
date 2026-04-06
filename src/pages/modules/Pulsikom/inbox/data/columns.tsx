import type { IInboxMessage } from '@/pages/modules/Pulsikom/inbox/data/types.ts'
import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { clsx } from 'clsx'
import { ButtonReplyInboxMessage } from '@/pages/modules/Pulsikom/inbox/component/buttonReply.tsx'

export const ColumnsInbox = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IInboxMessage>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama',
      header: 'Pengirim',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <ul className={'grid grid-cols-[12rem_1fr] gap-2'}>
              <li>Nama</li>
              <li>{data?.nama}</li>
              <li>Email</li>
              <li>{data?.email}</li>
            </ul>
          </>
        )
      },
    },
    {
      accessorKey: 'pesan',
      header: 'Pertayaan',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const data = row?.original
        const status = data?.status !== 'BELUM_TERJAWAB'

        return (
          <>
            <p className={clsx(status ? 'text-green-600' : 'text-red-500', 'capitalize')}>
              {data?.status.split('_').join(' ').toLowerCase()}
            </p>
          </>
        )
      },
    },
    {
      accessorKey: 'acttion',
      header: '',
      cell: ({ row }) => {
        return <ButtonReplyInboxMessage data={row?.original} />
      },
    },
  ]

  return columns
}
