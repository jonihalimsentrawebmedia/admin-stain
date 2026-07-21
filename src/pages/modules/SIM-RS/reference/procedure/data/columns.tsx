import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IProcedure } from '@/pages/modules/SIM-RS/reference/procedure/data/types.ts'
import { ButtonEditProcedure } from '@/pages/modules/SIM-RS/reference/procedure/component/buttonEdit.tsx'
import { ButtonDeleteProcedure } from '@/pages/modules/SIM-RS/reference/procedure/component/buttonDelete.tsx'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'

export const ColumnsProcedure = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const permission = GuardCrud({ keys: 'TINDAKAN' })

  const columns: ColumnDef<IProcedure>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'kode',
      header: 'Kode ICD-9-CM',
    },
    {
      accessorKey: 'nama',
      header: 'Nama Tindakan',
    },
    {
      accessorKey: 'deskripsi',
      header: 'Deskripsi',
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
            <div className={'flex justify-center items-center gap-2'}>
              {permission?.kelola && (
                <>
                  <ButtonEditProcedure data={row.original} />
                  <ButtonDeleteProcedure data={row.original} />
                </>
              )}
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
