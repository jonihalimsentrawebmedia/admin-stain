import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ICategoryDownload } from '@/pages/modules/website-utama/public-content/download/types'
import { ButtonEditCategoryDownload } from './buttonEdit.tsx'
import { ButtonDeleteCategoryDownload } from './buttonDelete.tsx'
import { Link } from 'react-router-dom'
import { IoLanguage } from 'react-icons/io5'

export const CategoryDownloadColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<ICategoryDownload>[] = [
    {
      accessorKey: 'index',
      header: '#',
      cell: ({ row }) => {
        return (page - 1) * limit + row.index + 1
      },
    },
    {
      accessorKey: 'nama_kategori',
      header: 'Nama Kategori',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-end gap-1.5">
            <Link
              to={`language/${row.original?.id_kategori_berkas}`}
              className={'border border-primary p-1.5 rounded text-primary'}
            >
              <IoLanguage className={'size-4'} />
            </Link>
            <ButtonEditCategoryDownload {...row.original} />
            <ButtonDeleteCategoryDownload {...row.original} />
          </div>
        )
      },
    },
  ]

  return columns
}
