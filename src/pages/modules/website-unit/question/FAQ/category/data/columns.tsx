import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ICategoryFAQ } from '@/pages/modules/website-utama/pertayaan/Faq/Category/data/type.ts'
import { ButtonDeleteCategoryFaqUnit } from '../components/buttonDelete'
import { ButtonEditCategoryFaqUnit } from '../components/buttonEdit'

export const ColumnsCategoryFAQUnit = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<ICategoryFAQ>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row?.index + 1}</>
      },
    },
    {
      accessorKey: 'nama_kategori_faq',
      header: 'Nama Kategori',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex gap-2 justify-end'}>
            <ButtonEditCategoryFaqUnit {...row?.original} />
            <ButtonDeleteCategoryFaqUnit data={row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}
