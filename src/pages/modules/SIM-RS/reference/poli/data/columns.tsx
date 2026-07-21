import { useNavigate, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IPoli } from '@/pages/modules/SIM-RS/reference/poli/data/types.ts'
import { ButtonEditPoli } from '@/pages/modules/SIM-RS/reference/poli/component/buttonEdit.tsx'
import { ButtonDeletePoli } from '@/pages/modules/SIM-RS/reference/poli/component/buttonDelete.tsx'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'
import { MdInfo } from 'react-icons/md'

export const ColumnsPoli = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const navigate = useNavigate()
  const permission = GuardCrud({ keys: 'POLI' })

  const columns: ColumnDef<IPoli>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'nama',
      header: 'Nama Poli',
    },
    {
      accessorKey: 'lokasi',
      header: 'Lokasi',
    },
    {
      accessorKey: 'is_status',
      header: 'Status',
      cell: ({ row }) => {
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              row.original.is_status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {row.original.is_status ? 'Aktif' : 'Tidak Aktif'}
          </span>
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
              {permission?.melihat && (
                <button
                  onClick={() =>
                    navigate(`/modules/sim-rs/reference/poli/detail/${row.original.id_poli}`)
                  }
                  className={'bg-blue-500 text-white hover:bg-blue-600 p-1.5 rounded'}
                >
                  <MdInfo />
                </button>
              )}
              {permission?.kelola && (
                <>
                  <ButtonEditPoli data={row.original} />
                  <ButtonDeletePoli data={row.original} />
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
