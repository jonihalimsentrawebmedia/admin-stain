import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IPejabat } from '@/pages/modules/E-Office/official-travel/pejabat/data/types.ts'
import ButtonEditPejabat from '@/pages/modules/E-Office/official-travel/pejabat/component/buttonEdit.tsx'
import ButtonDeletePejabat from '@/pages/modules/E-Office/official-travel/pejabat/component/buttonDelete.tsx'

export const ColumnsPejabat = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IPejabat>[] = [
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
      accessorKey: 'nip',
      header: 'NIP',
    },
    {
      accessorKey: 'nama_lengkap',
      header: 'Nama Lengkap',
    },
    {
      accessorKey: 'golongan',
      header: 'Golongan',
    },
    {
      accessorKey: 'jabatan',
      header: 'Jabatan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className={'flex justify-end w-full gap-2'}>
              <ButtonEditPejabat data={data} />
              <ButtonDeletePejabat data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
