import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IStudentStatus } from '../data/types.ts'
import ButtonDeleteStudentStatus from '../component/buttonDelete.tsx'
import ButtonEditStudentStatus from '../component/buttonEdit.tsx'

export const ColumnsStudentStatus = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IStudentStatus>[] = [
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
      accessorKey: 'kode',
      header: 'Kode',
    },
    {
      accessorKey: 'nama',
      header: 'Nama Status',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className={'flex justify-end w-full gap-2'}>
              <ButtonEditStudentStatus data={data} />
              <ButtonDeleteStudentStatus data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
