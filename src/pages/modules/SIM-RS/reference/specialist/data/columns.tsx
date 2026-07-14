import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ISpecialist } from '@/pages/modules/SIM-RS/reference/specialist/data/types.ts'
import { ButtonEditSpecialist } from '@/pages/modules/SIM-RS/reference/specialist/component/buttonEdit.tsx'
import { ButtonDeleteSpecialist } from '@/pages/modules/SIM-RS/reference/specialist/component/buttonDelete.tsx'

export const ColumnsSpecialist = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<ISpecialist>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'nama',
      header: 'Nama Spesialis',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <>
            <div className={'flex justify-center items-center gap-2'}>
              <ButtonEditSpecialist data={row.original} />
              <ButtonDeleteSpecialist data={row.original} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
