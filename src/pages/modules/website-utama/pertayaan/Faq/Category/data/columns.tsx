import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ICategoryFAQ } from '@/pages/modules/website-utama/pertayaan/Faq/Category/data/type.ts'
import { ButtonEditCategoryFAQ } from '@/pages/modules/website-utama/pertayaan/Faq/Category/components/buttonEdit.tsx'
import { ButtonDeleteCategoryFAQ } from '@/pages/modules/website-utama/pertayaan/Faq/Category/components/buttonDelete.tsx'
import { IoLanguage } from 'react-icons/io5'

export const ColumnsCategoryFAQ = () => {
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
            <Link
              to={`language/${row?.original?.id_kategori_faq}`}
              className={'bg-primary text-white p-1.5 rounded'}
            >
              <IoLanguage />
            </Link>
            <ButtonEditCategoryFAQ data={row.original} />
            <ButtonDeleteCategoryFAQ data={row.original} />
          </div>
        )
      },
    },
  ]

  return columns
}
