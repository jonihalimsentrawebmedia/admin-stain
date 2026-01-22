import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IHourOperational } from '@/pages/modules/website-unit/services/operational-hour/data/types.ts'
import { ButtonEditOperationalHour } from '@/pages/modules/website-unit/services/operational-hour/component/buttonEdit.tsx'
import { ButtonDeleteOperationalHour } from '@/pages/modules/website-unit/services/operational-hour/component/buttonDelete.tsx'

export const OperHourColumns = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IHourOperational>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },
    {
      accessorKey: 'hari',
      header: 'Hari',
    },
    {
      accessorKey: 'jam_operasional',
      header: 'Jam Operasional',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex justify-end items-center gap-2'}>
            <ButtonEditOperationalHour data={row?.original} />
            <ButtonDeleteOperationalHour data={row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}
