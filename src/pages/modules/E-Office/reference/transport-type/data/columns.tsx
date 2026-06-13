import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ITransportType } from '@/pages/modules/E-Office/reference/transport-type/data/types.ts'
import ButtonEditTransportType from '@/pages/modules/E-Office/reference/transport-type/component/buttonEdit.tsx'
import ButtonDeleteTransportType from '@/pages/modules/E-Office/reference/transport-type/component/buttonDelete.tsx'

export const ColumnsTransportType = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ITransportType>[] = [
    {
      accessorKey: 'id',
      header: '#',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</span>
        </div>
      ),
    },
    { accessorKey: 'kode', header: 'Kode' },
    { accessorKey: 'nama', header: 'Keterangan' },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => (
        <div className={'flex justify-end w-full gap-2'}>
          <ButtonEditTransportType data={row.original} />
          <ButtonDeleteTransportType data={row.original} />
        </div>
      ),
    },
  ]
  return columns
}
