import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IBiayaType } from '@/pages/modules/E-Office/reference/costing-type/data/types.ts'
import ButtonEditBiayaType from '@/pages/modules/E-Office/reference/costing-type/component/buttonEdit.tsx'
import ButtonDeleteBiayaType from '@/pages/modules/E-Office/reference/costing-type/component/buttonDelete.tsx'

export const ColumnsBiayaType = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IBiayaType>[] = [
    {
      accessorKey: 'id',
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
      accessorKey: 'kode',
      header: 'Kode',
    },
    {
      accessorKey: 'nama',
      header: 'Nama Biaya',
    },
    {
      accessorKey: 'tipe',
      header: 'Tipe',
      cell: ({ row }) => {
        const tipe = row.original.tipe
        const colorMap: Record<string, string> = {
          UMUM: 'bg-blue-100 text-blue-800',
          TRANSPORTASI: 'bg-green-100 text-green-800',
          PERHARI: 'bg-orange-100 text-orange-800',
        }
        return (
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${colorMap[tipe] ?? 'bg-gray-100 text-gray-800'}`}>
            {tipe}
          </span>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className={'flex justify-end w-full gap-2'}>
              <ButtonEditBiayaType data={data} />
              <ButtonDeleteBiayaType data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
