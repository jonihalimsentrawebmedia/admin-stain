import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IFloorPlan } from '@/pages/modules/website-unit/floor-plan/data/types.ts'
import type { ISessionUnit } from '@/pages/modules/website-unit/hooks'
import { ButtonEditFloorPlan } from '@/pages/modules/website-unit/floor-plan/component/buttonEdit.tsx'
import { ButtonDeleteFloorPlan } from '@/pages/modules/website-unit/floor-plan/component/buttonDelete.tsx'

export const ColumnsFloorPlan = (session?: ISessionUnit) => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IFloorPlan>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div>{(page - 1) * limit + idx + 1}</div>
      },
    },
    {
      accessorKey: 'nama_lantai',
      header: 'Nama Lantai',
    },
    {
      accessorKey: 'denah_lantai_url',
      header: 'Denah',
      cell: ({ row }) => {
        return (
          <img
            src={row?.original?.denah_lantai_url}
            alt="denah lantai"
            className={'object-contain w-[360px] h-[475px]'}
          />
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
            <ButtonEditFloorPlan session={session} data={row?.original} />
            <ButtonDeleteFloorPlan session={session} data={row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}
