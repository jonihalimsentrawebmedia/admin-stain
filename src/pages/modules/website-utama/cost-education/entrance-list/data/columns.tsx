import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import { ButtonDeleEditEntranceUkt } from '../component/buttonEdit.tsx'
import { ButtonDeleteEntranceUkt } from '../component/buttonDelete.tsx'
import type { IUktEntrance } from '../data/types.ts'

export const ColumnsEntranceUkt = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IUktEntrance>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },

    {
      accessorKey: 'nama_jalur_masuk',
      header: 'Nama Tingkatan',
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <div className={'flex gap-2 items-center justify-end'}>
            <ButtonDeleEditEntranceUkt data={data} />
            <ButtonDeleteEntranceUkt data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}
