import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IBankAccount } from '../data/types.ts'
import { SwitchStatus } from '@/pages/modules/Pulsikom/reference/bank-account/component/switchStatus.tsx'
import { ButtonEditBankAccount } from '@/pages/modules/Pulsikom/reference/bank-account/component/buttonEdit.tsx'
import { ButtonDeleteBankAccount } from '@/pages/modules/Pulsikom/reference/bank-account/component/buttonDelete.tsx'

export const ColumnsBankAccount = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IBankAccount>[] = [
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
      header: 'Bank',
    },
    {
      accessorKey: 'no_rekening',
      header: 'No. Rekening',
    },
    {
      accessorKey: 'atas_nama',
      header: 'Atas Nama',
    },
    {
      accessorKey: 'is_utama',
      header: 'Utama',
      cell: ({ row }) => {
        const data = row?.original
        return <SwitchStatus data={data} />
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <div className="flex items-center gap-1.5">
              <ButtonEditBankAccount data={data} />
              <ButtonDeleteBankAccount data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
