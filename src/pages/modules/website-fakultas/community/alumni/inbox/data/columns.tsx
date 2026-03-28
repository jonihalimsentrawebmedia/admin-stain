import type { IInboxStory } from '../data/types'
import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { getRelativeTime } from '@/utils/helper.tsx'
import { MdMessage } from 'react-icons/md'
import { ButtonDeleteInboxStory } from '@/pages/modules/website-fakultas/community/alumni/inbox/component/buttonDelete.tsx'

export const ColumnsInboxStory = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IInboxStory>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_lengkap',
      header: 'Nama',
    },
    {
      accessorKey: 'id_prodi',
      header: 'Prodi - Tahun Masuk',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <p>
              {data?.kode_jenjang}-{data?.nama_prodi}
            </p>
            <p>{data?.tahun_masuk}</p>
          </>
        )
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'no_handphone',
      header: 'No handphone',
    },
    {
      accessorKey: 'created_at',
      header: 'Tanggal Masuk',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <p>{data?.created_at ? format(data?.created_at, 'dd-MM-yyyy, HH:mm:ss') : ''}</p>
            <p>{getRelativeTime(data?.created_at)}</p>
          </>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div className={'flex items-center gap-1.5'}>
            <Link
              to={`message/${data?.id_cerita_alumni_kontak_masuk}`}
              className={'bg-blue-600 text-white hover:bg-blue-700 p-1.5 rounded'}
            >
              <MdMessage />
            </Link>
            <ButtonDeleteInboxStory data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}
