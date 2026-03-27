import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { INewsFaculty } from '@/pages/modules/website-fakultas/academic/program-studi/detail/news/hooks'
import { MdInfo } from 'react-icons/md'

export const ColumnsNewsFaculty = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<INewsFaculty>[] = [
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
        const data = row?.original
        return (
          <img src={data?.gambar} className={'w-[250px] h-[100px] object-cover'} alt="gambae" />
        )
      },
    },
    {
      accessorKey: 'judul',
      header: 'Judul',
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
        const data = row?.original
        return (
          <>
            <Link
              to={`/modules/website-fakultas/public-content/news/detail/${data?.id_berita}`}
              className={'bg-blue-500 p-1.5 rounded flex items-center text-white'}
            >
              <MdInfo />
            </Link>
          </>
        )
      },
    },
  ]

  return columns
}
