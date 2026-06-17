import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IPurposeGuest } from './types.ts'
import ButtonEditPurposeGuest from '@/pages/modules/E-Office/reference/purpose-guest/component/buttonEdit.tsx'
import ButtonDeletePurposeGuest from '@/pages/modules/E-Office/reference/purpose-guest/component/buttonDelete.tsx'

export const ColumnsPurposeGuest = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IPurposeGuest>[] = [
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
      accessorKey: 'tujuan_bertamu',
      header: 'Tujuan Bertamu',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex items-center justify-center gap-2">
              <ButtonEditPurposeGuest data={data} />
              <ButtonDeletePurposeGuest data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
