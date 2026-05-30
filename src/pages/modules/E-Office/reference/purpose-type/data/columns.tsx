import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IPurposeType } from '@/pages/modules/E-Office/reference/purpose-type/data/types.ts'
import ButtonDeletePurposeType from '@/pages/modules/E-Office/reference/purpose-type/component/buttonDelete.tsx'
import ButtonEditPurposeType from '@/pages/modules/E-Office/reference/purpose-type/component/buttonEdit.tsx'

export const ColumnsPurposeType = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IPurposeType>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'jenis_keperluan',
      header: 'Jenis Keperluan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex items-center justify-center gap-2">
              <ButtonEditPurposeType data={data} />
              <ButtonDeletePurposeType data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
