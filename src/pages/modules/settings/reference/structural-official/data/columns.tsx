import type { ColumnDef } from '@tanstack/react-table'
import type { IStructuralPosition } from '@/pages/modules/settings/reference/structural-official/data/types.ts'
import { useSearchParams } from 'react-router-dom'
import ButtonCreateStructural from '@/pages/modules/settings/reference/structural-official/component/buttonEdit.tsx'
import ButtonDeleteStructural from '@/pages/modules/settings/reference/structural-official/component/buttonDelete.tsx'

export const ColumnsStructuralOfficial = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IStructuralPosition>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div>{(page - 1) * limit + idx + 1}</div>
      },
    },
    {
      accessorKey: 'nama_jabatan_struktural',
      header: 'Jabatan Struktural',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex items-center gap-1.5 justify-end">
              {/*<Link*/}
              {/*  to={`language/${data?.id_jabatan_struktural ?? ''}`}*/}
              {/*  className={'p-1.5 bg-primary text-white rounded'}*/}
              {/*>*/}
              {/*  <IoLanguage />*/}
              {/*</Link>*/}
              <ButtonCreateStructural data={data} />
              <ButtonDeleteStructural data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
