import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IUnitCollection } from '@/pages/modules/website-unit/collection/data/types.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaForward } from 'react-icons/fa'
import { ButtonEditCollection } from '@/pages/modules/website-unit/collection/component/buttonEdit.tsx'
import type { ISessionUnit } from '@/pages/modules/website-unit/hooks'
import { ButtonDeleteCollection } from '@/pages/modules/website-unit/collection/component/buttonDelete.tsx'

export const ColumnsUnitCollection = (session?: ISessionUnit) => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IUnitCollection>[] = [
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
      accessorKey: 'id_unit_kategori_koleksi',
      header: 'Daftar Koleksi',
      cell: ({ row }) => {
        return (
          <>
            <Link to={`${row?.original?.id_unit_kategori_koleksi}/list`}>
              <Button variant={'outline'} className={'border-primary'}>
                <FaForward />
                Lihat Koleksi
              </Button>
            </Link>
          </>
        )
      },
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
          <div className={'flex items-center justify-end gap-2'}>
            <ButtonEditCollection data={row?.original} session={session} />
            <ButtonDeleteCollection data={row?.original} session={session}/>
          </div>
        )
      },
    },
  ]

  return columns
}
