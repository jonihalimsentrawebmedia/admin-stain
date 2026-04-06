import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { INewsDetail } from '@/pages/modules/website-utama/public-content/news/data'
import { MdInfo } from 'react-icons/md'

export const ColumnsFacultyNews = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<INewsDetail>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'gambar_key',
      header: 'Gambar',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <img src={data?.gambar} className="w-[100px] h-[100px] rounded object-cover" />
          </>
        )
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
    },
    {
      accessorKey: 'nama_kategori_berita',
      header: 'Kategori Berita',
    },
    {
      accessorKey: 'penulis',
      header: 'Penulis',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className={'flex gap-2 items-center justify-center'}>
              <Link
                to={`/modules/website-fakultas/public-content/news/detail/${data?.id_berita}`}
                className={'p-1.5 rounded bg-blue-500 text-white hover:bg-blue-600'}
              >
                <MdInfo className={'size-4'} />
              </Link>
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
