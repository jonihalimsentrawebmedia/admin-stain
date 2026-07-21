import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ISumberBiaya } from '@/pages/modules/SIM-RS/reference/source-medical-treatment/data/types.ts'
import { ButtonEditSumberBiaya } from '@/pages/modules/SIM-RS/reference/source-medical-treatment/component/buttonEdit.tsx'
import { ButtonDeleteSumberBiaya } from '@/pages/modules/SIM-RS/reference/source-medical-treatment/component/buttonDelete.tsx'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'

export const ColumnsSumberBiaya = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const permission = GuardCrud({ keys: 'SUMBER_BIAYA_PENGOBATAN' })

  const columns: ColumnDef<ISumberBiaya>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'kode',
      header: 'Kode',
    },
    {
      accessorKey: 'nama',
      header: 'Nama',
    },
    {
      accessorKey: 'is_ada_nomor_peserta',
      header: 'Ada No. Peserta',
      cell: ({ row }) => {
        return <>{row.original.is_ada_nomor_peserta ? 'Ya' : 'Tidak'}</>
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
                  <ButtonEditSumberBiaya data={row.original} />
                  <ButtonDeleteSumberBiaya data={row.original} />
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
