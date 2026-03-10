import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { ButtonEditSpecialization } from '../component/buttonEdit.tsx'
import { ButtonDeleteSpecialization } from '../component/buttonDelete.tsx'
import type { ISubSpecialization } from './types.ts'

export const ColumnsSubSpecialization = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<ISubSpecialization>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <>{(page - 1) * limit + row.index + 1}</>
      },
    },
    {
      accessorKey: 'nama_spesialisasi',
      header: 'Nama Specialisasi',
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex justify-center items-center gap-2'}>
            <ButtonEditSpecialization data={row.original} />
            <ButtonDeleteSpecialization data={row.original} />
          </div>
        )
      },
    },
  ]

  return columns
}
