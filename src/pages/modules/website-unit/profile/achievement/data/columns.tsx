import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IAchievementCategory } from '@/pages/modules/website-unit/profile/achievement/data/types.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaForward } from 'react-icons/fa'

export const CategoryAchievementColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IAchievementCategory>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },
    {
      accessorKey: 'nama_kategori',
      header: 'Nama Kategori',
    },
    {
      accessorKey: 'jumlah_penghargaan',
      header: 'Jumlah Penghargaan',
    },
    {
      accessorKey: 'id_kategori_penghargaan',
      header: 'Penghargaan',
      cell: ({ row }) => {
        return (
          <Link to={`${row?.original?.id_kategori_penghargaan}/reward`}>
            <Button variant={'outline'} className={'border-primary text-primary'}>
              <FaForward />
              Lihat Penghargaan
            </Button>
          </Link>
        )
      },
    },
  ]

  return columns
}
