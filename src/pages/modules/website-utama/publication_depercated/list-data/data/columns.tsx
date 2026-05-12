import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IPublication } from '@/pages/modules/website-utama/publication_depercated/list-data/data/types.ts'
import { formatDate } from 'date-fns'
import { ButtonEditPublication } from '@/pages/modules/website-utama/publication_depercated/list-data/component/buttonEdit.tsx'
import ButtonDeleteListPublication from '@/pages/modules/website-utama/publication_depercated/list-data/component/buttonDelete.tsx'
import { IoLanguage } from 'react-icons/io5'

export const ColumnsPublicationList = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IPublication>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_publikasi',
      header: 'Judul',
    },
    {
      accessorKey: 'penulis',
      header: 'Penulis',
    },
    {
      accessorKey: 'link',
      header: 'Link',
      cell: ({ row }) => {
        const data = row.original
        return (
          <Link to={data.link} target="_blank" className="text-primary">
            {data.link}
          </Link>
        )
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Tanggal Ditambah',
      cell: ({ row }) => {
        const data = row.original
        return <p>{data?.created_at ? formatDate(data?.created_at, 'dd-MM-yyyy') : '-'}</p>
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <div className={'flex gap-2 items-center'}>
            <Link
              to={`language/${row?.original?.id_publikasi}`}
              className={'bg-primary text-white p-1.5 rounded'}
            >
              <IoLanguage />
            </Link>
            <ButtonEditPublication data={data} />
            <ButtonDeleteListPublication data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}
