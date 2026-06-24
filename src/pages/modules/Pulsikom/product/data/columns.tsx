import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IProduct } from '../data/types.ts'
import { MdInfo } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'
import { ButtonDeleteProduct } from '@/pages/modules/Pulsikom/product/component/buttonDelete.tsx'

export const ColumnsProduct = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'Gambar',
      header: 'Gambar',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <img
              src={data?.url_gambar}
              alt={'gambar'}
              className={'w-[150px] h-[100px] objective-cover'}
            />
          </>
        )
      },
    },
    {
      accessorKey: 'nama_produk',
      header: 'Nama Produk',
    },
    {
      accessorKey: 'urutan',
      header: 'urutan',
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
                to={`detail/${data?.id_produk}`}
                className={'p-1.5 text-white bg-blue-500 rounded hover:bg-blue-600'}
              >
                <MdInfo className={'size-4'} />
              </Link>
              <Link
                to={`edit/${data?.id_produk}`}
                className={'p-1.5 text-white bg-yellow-500 rounded hover:bg-yellow-600'}
              >
                <HiPencil className={'size-4'} />
              </Link>
              <ButtonDeleteProduct data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
