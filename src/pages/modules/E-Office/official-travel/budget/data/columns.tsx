import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IBudgetOfficialTravel } from '@/pages/modules/E-Office/official-travel/budget/data/types.ts'
import ButtonEditBudget from '@/pages/modules/E-Office/official-travel/budget/component/buttonEdit.tsx'
import ButtonDeleteBudget from '@/pages/modules/E-Office/official-travel/budget/component/buttonDelete.tsx'

export const ColumnsBudget = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IBudgetOfficialTravel>[] = [
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
      accessorKey: 'tahun_anggaran',
      header: 'Tahun',
    },
    {
      accessorKey: 'sumber_data',
      header: 'Sumber Dana',
    },
    {
      accessorKey: 'jumlah_anggaran',
      header: 'Jumlah Anggaran',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <p className={'text-end'}>
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }).format(Number(data?.jumlah_anggaran))}
            </p>
          </>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex items-center justify-center gap-1.5">
              <ButtonEditBudget data={data} />
              <ButtonDeleteBudget data={data} />
            </div>
          </>
        )
      },
    },
  ]
  return columns
}
