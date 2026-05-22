import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ILetterOrigin } from '../data/types'
import ButtonEditLetterOrigin from '../component/buttonEdit.tsx'
import ButtonDeleteLetterOrigin from '../component/buttonDelete.tsx'

export const ColumnsLetterOrigin = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ILetterOrigin>[] = [
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
      accessorKey: 'instansi',
      header: 'Instansi',
    },
    {
      accessorKey: 'alamat',
      header: 'Alamat',
    },
    {
      accessorKey: 'telepon',
      header: 'Telepon',
    },
    {
      accessorKey: 'email',
      header: 'email',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className={'flex justify-end w-full gap-2'}>
              <ButtonEditLetterOrigin data={data} />
              <ButtonDeleteLetterOrigin data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
