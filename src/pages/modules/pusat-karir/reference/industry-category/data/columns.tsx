import type { ColumnDef } from '@tanstack/react-table'
import type { ICategoryIndustry } from '@/pages/modules/pusat-karir/reference/industry-category/data/type.ts'
import { useSearchParams } from 'react-router-dom'
import { ButtonEditIndustryCategory } from '@/pages/modules/pusat-karir/reference/industry-category/comonent/buttonEdit.tsx'
import { ButtonDeleteIndustryCategory } from '@/pages/modules/pusat-karir/reference/industry-category/comonent/buttonDelete.tsx'

export const ColumnsIndustryCategory = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<ICategoryIndustry>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'nama_kategori_industri',
      header: 'Kategori Industri',
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex justify-center items-center gap-2'}>
            <ButtonEditIndustryCategory data={row.original} />
            <ButtonDeleteIndustryCategory data={row.original} />
          </div>
        )
      },
    },
  ]

  return columns
}
