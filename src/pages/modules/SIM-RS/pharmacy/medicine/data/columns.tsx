import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IMedicine } from '@/pages/modules/SIM-RS/pharmacy/medicine/data/types.ts'
import { ButtonEditMedicine } from '@/pages/modules/SIM-RS/pharmacy/medicine/component/buttonEdit.tsx'
import { ButtonDeleteMedicine } from '@/pages/modules/SIM-RS/pharmacy/medicine/component/buttonDelete.tsx'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'

export const ColumnsMedicine = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const permission = GuardCrud({ keys: 'OBAT' })

  const columns: ColumnDef<IMedicine>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'nama_obat',
      header: 'Nama Obat',
    },
    {
      accessorKey: 'kategori_obat',
      header: 'Kategori',
    },
    {
      accessorKey: 'bentuk_sediaan',
      header: 'Bentuk Sediaan',
    },
    {
      accessorKey: 'satuan',
      header: 'Satuan',
    },
    {
      accessorKey: 'harga',
      header: 'Harga',
      cell: ({ row }) => {
        return (
          <>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumFractionDigits: 0,
            }).format(row.original.harga)}
          </>
        )
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <>
            {permission?.kelola && (
              <div className={'flex justify-center items-center gap-2'}>
                <ButtonEditMedicine data={row.original} />
                <ButtonDeleteMedicine data={row.original} />
              </div>
            )}
          </>
        )
      },
    },
  ]

  return columns
}
