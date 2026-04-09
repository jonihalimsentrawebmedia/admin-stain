import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IServices } from './types.ts'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'
import { MdInfo } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteServices } from '../component/buttonDelete.tsx'

export const ColumnsService = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IServices>[] = [
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
      header: 'Nama Layanan',
    },
    {
      accessorKey: 'deskripsi',
      header: 'Deskripsi',
      cell: ({ row }) => {
        return <RenderHTMLContent content={row?.original?.deskripsi} />
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex items-center gap-1.5">
              <Link
                to={`detail/${data?.id_layanan}`}
                className={'p-1.5 text-white bg-blue-500 rounded hover:bg-blue-600'}
              >
                <MdInfo className={'size-4'} />
              </Link>
              <Link
                to={`edit/${data?.id_layanan}`}
                className={'p-1.5 text-white bg-yellow-500 rounded hover:bg-yellow-600'}
              >
                <HiPencil className={'size-4'} />
              </Link>
              <ButtonDeleteServices data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
