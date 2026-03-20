import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ICategoryDownload } from '@/pages/modules/website-utama/public-content/download/types'
import { ButtonEditCategoryDownloadFaculty } from './buttonEdit.tsx'
import { ButtonDeleteCategoryDownloadFaculty } from './buttonDelete.tsx'

export const CategoryDownloadUnitColumns = () => {
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
            <ButtonEditCategoryDownloadFaculty {...row.original} />
            <ButtonDeleteCategoryDownloadFaculty {...row.original} />
          </div>
        )
      },
    },
  ]

  return columns
}
