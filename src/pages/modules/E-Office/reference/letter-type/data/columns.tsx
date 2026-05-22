import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ILetterType } from '../data/types.ts'
import ButtonDeleteLetterType from '../component/buttonDelete.tsx'
import ButtonEditLetterType from '../component/buttonEdit.tsx'

export const ColumnsLetterType = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ILetterType>[] = [
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
      accessorKey: 'nama',
      header: 'Keterangan',
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
          <>
            <div className={'flex justify-end w-full gap-2'}>
              <ButtonEditLetterType data={data} />
              <ButtonDeleteLetterType data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
