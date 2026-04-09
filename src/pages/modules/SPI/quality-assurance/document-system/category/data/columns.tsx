import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ICategoryDocument } from '../data/types.ts'
import { ButtonEditCategory } from '@/pages/modules/SPI/quality-assurance/document-system/category/component/buttonEdit.tsx'
import { ButtonDeleteCategory } from '@/pages/modules/SPI/quality-assurance/document-system/category/component/buttonDelete.tsx'

export const ColumnsCategory = () => {
  const [searchParam] = useSearchParams()
  const page = Number(searchParam?.get('page') ?? '1')
  const limit = Number(searchParam?.get('limit') ?? '10')

  const columns: ColumnDef<ICategoryDocument>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_sistem_dokumen',
      header: 'Nama Kategori',
    },

    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <div className="flex items-center gap-1.5">
            <ButtonEditCategory data={data} />
            <ButtonDeleteCategory data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}
