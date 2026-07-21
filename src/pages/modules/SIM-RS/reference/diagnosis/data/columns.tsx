import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IDiagnosis } from '@/pages/modules/SIM-RS/reference/diagnosis/data/types.ts'
import { ButtonEditDiagnosis } from '@/pages/modules/SIM-RS/reference/diagnosis/component/buttonEdit.tsx'
import { ButtonDeleteDiagnosis } from '@/pages/modules/SIM-RS/reference/diagnosis/component/buttonDelete.tsx'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'

export const ColumnsDiagnosis = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const permission = GuardCrud({ keys: 'DIAGNOSIS' })

  const columns: ColumnDef<IDiagnosis>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'kode',
      header: 'Kode ICD-10',
    },
    {
      accessorKey: 'nama',
      header: 'Nama Diagnosis',
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
                  <ButtonEditDiagnosis data={row.original} />
                  <ButtonDeleteDiagnosis data={row.original} />
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
