import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ITypeService } from '@/pages/modules/E-Office/services/type-service/data/types.ts'
import ButtonEditServiceType from '@/pages/modules/E-Office/services/type-service/component/buttonEdit.tsx'
import ButtonDeleteTypeService from '@/pages/modules/E-Office/services/type-service/component/buttonDelete.tsx'

export const columnsTypeService = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ITypeService>[] = [
    {
      header: '#',
      accessorKey: 'key',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</span>
          </div>
        )
      },
    },
    {
      header: 'Nama',
      accessorKey: 'nama',
    },
    {
      header: '',
      accessorKey: 'action',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className="flex items-center justify-end gap-1.5">
              <ButtonEditServiceType data={data} />
              <ButtonDeleteTypeService data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
