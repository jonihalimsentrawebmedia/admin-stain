import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'
import { MdInfo } from 'react-icons/md'

export const ProdiNewsColumns = () => {
  const [searchParams] = useSearchParams()
  const Page = Number(searchParams.get('page') ?? 1)
  const Limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<INewsDetail>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(Page - 1) * Limit + i + 1}</>
      },
    },
    {
      accessorKey: 'gambar',
      header: 'Gambar',
      cell: ({ row }) => {
        return (
          <div className={'w-[250px]'}>
            <img src={row.original.gambar} className="w-[250px] h-[180px] rounded object-cover" />
          </div>
        )
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul Berita',
    },
    {
      accessorKey: 'nama_kategori_berita',
      header: 'Kategori',
    },
    {
      accessorKey: 'penulis',
      header: 'Penulis',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <Link
            to={'detail/' + row?.original?.id_berita}
            key={row.original.id_berita}
            className="text-primary"
          >
            <button className={'bg-blue-500 text-white p-1.5 rounded'}>
              <MdInfo />
            </button>
          </Link>
        )
      },
    },
  ]

  return columns
}
