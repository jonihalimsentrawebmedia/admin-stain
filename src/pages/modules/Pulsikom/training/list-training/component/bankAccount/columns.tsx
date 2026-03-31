import type { ColumnDef } from '@tanstack/react-table'
import type { IBankAccount } from '@/pages/modules/Pulsikom/reference/bank-account/data/types.ts'
import { useSearchParams } from 'react-router-dom'

export const ColumnsBankAccount = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IBankAccount>[] = [
    {
      id: 'selected',
      header: () => <></>,
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'nama_rekening',
      header: 'Nama Bank',
    },
    {
      accessorKey: 'nomor_rekening',
      header: 'Nomor Rekening',
    },
    {
      accessorKey: 'atas_nama',
      header: 'Atas Nama',
    },
  ]

  return columns
}
