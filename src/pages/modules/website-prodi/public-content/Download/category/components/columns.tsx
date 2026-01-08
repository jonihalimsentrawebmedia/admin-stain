import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ICategoryDownload } from '@/pages/modules/website-utama/public-content/download/types'
import { ButtonEditCategoryDownloadProdi } from './buttonEdit.tsx'
import { ButtonDeleteCategoryDownloadProdi } from '@/pages/modules/website-prodi/public-content/Download/category/components/buttonDelete.tsx'

export const CategoryDownloadProdiColumns = () => {
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
            <ButtonEditCategoryDownloadProdi {...row.original} />
            <ButtonDeleteCategoryDownloadProdi {...row.original} />
          </div>
        )
      },
    },
  ]

  return columns
}
