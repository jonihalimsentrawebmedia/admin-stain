import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ICategoryServices } from '@/pages/modules/website-unit/services/category/data/types.ts'
import { Button } from '@/components/ui/button.tsx'
import { FaForward } from 'react-icons/fa'
import { ButtonEditCategoryService } from '@/pages/modules/website-unit/services/category/component/buttonEdit.tsx'
import type { ISessionUnit } from '@/pages/modules/website-unit/hooks'
import { ButtonDeleteCategoryService } from '@/pages/modules/website-unit/services/category/component/buttonDelete.tsx'

export const CategoryServiceColumns = (session?: ISessionUnit) => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<ICategoryServices>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },
    {
      accessorKey: 'nama_layanan',
      header: 'Kategori Layanan',
    },
    {
      accessorKey: 'id_kategori_layanan',
      header: 'Daftar Layanan',
      cell: ({ row }) => {
        return (
          <Link to={`${row?.original?.id_kategori_layanan}`}>
            <Button variant={'outline'} className={'border-primary'}>
              <FaForward />
              Lihat Layanan
            </Button>
          </Link>
        )
      },
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'aksi',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex justify-end items-center gap-2'}>
            <ButtonEditCategoryService data={row?.original} session={session} />
            <ButtonDeleteCategoryService data={row?.original} session={session} />
          </div>
        )
      },
    },
  ]

  return columns
}
