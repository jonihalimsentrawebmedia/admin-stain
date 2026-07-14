import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IPoli } from '@/pages/modules/SIM-RS/reference/poli/data/types.ts'
import { ButtonEditPoli } from '@/pages/modules/SIM-RS/reference/poli/component/buttonEdit.tsx'
import { ButtonDeletePoli } from '@/pages/modules/SIM-RS/reference/poli/component/buttonDelete.tsx'
import { useNavigate } from 'react-router-dom'

export const ColumnsPoli = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)
  const navigate = useNavigate()

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
              row.original.is_status
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
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
              <button
                onClick={() =>
                  navigate(
                    `/modules/sim-rs/reference/poli/detail/${row.original.id_poli}`
                  )
                }
                className={'bg-blue-500 text-white hover:bg-blue-600 p-1.5 rounded'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
              <ButtonEditPoli data={row.original} />
              <ButtonDeletePoli data={row.original} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
