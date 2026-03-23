import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { format } from 'date-fns'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteMobility } from '../component/buttonDelete.tsx'
import type { IStoryMobility } from './types.ts'

export const ColumnsStory = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IStoryMobility>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'Nama',
      header: 'Nama',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className="flex flex-col gap-1.5">
              <img
                src={data?.url_gambar}
                alt="asd"
                className={'size-12 w-12 h-12 rounded-full object-cover'}
              />
              <p className={'whitespace-nowrap'}>{data.nama_lengkap}</p>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'nama_prodi',
      header: 'Prodi - Tahun',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div>
              <p>{data.nama_prodi}</p>
              <p>Alumni Tahun {data.tahun_lulus}</p>
            </div>
          </>
        )
      },
    },
    {
      accessorKey: 'cerita',
      header: 'Cerita',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <RenderHTMLContent content={data?.cerita ?? ''} />
          </>
        )
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Tanggal Dibuat',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <p>{data.created_at ? format(data?.created_at, 'dd-MM-yyyy, HH:mm') : '-'}</p>
          </>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className="flex items-center gap-2">
              <Link
                to={`edit/${data?.id_cerita_international_mobility}`}
                className="bg-yellow-500 p-1.5 rounded text-white hover:bg-yellow-600"
              >
                <HiPencil />
              </Link>
              <ButtonDeleteMobility data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
