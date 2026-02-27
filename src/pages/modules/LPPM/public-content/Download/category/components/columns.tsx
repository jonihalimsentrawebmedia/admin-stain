import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ICategoryDownload } from '@/pages/modules/website-utama/public-content/download/types'
import { ButtonEditCategoryDownloadLppm } from './buttonEdit'
import { ButtonDeleteCategoryDownloadLppm } from './buttonDelete'

export const CategoryDownloadLppmColumns = () => {
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
            <ButtonEditCategoryDownloadLppm {...row.original} />
            <ButtonDeleteCategoryDownloadLppm {...row.original} />
          </div>
        )
      },
    },
  ]

  return columns
}
