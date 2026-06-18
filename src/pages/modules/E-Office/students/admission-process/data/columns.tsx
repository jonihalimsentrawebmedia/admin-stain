import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IAdmissionProcess } from '../data/types.ts'
import ButtonDeleteAdmissionProcess from '../component/buttonDelete.tsx'
import ButtonEditAdmissionProcess from '../component/buttonEdit.tsx'

export const ColumnsAdmissionProcess = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IAdmissionProcess>[] = [
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
      header: 'Nama Jalur Masuk',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className={'flex justify-end w-full gap-2'}>
              <ButtonEditAdmissionProcess data={data} />
              <ButtonDeleteAdmissionProcess data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
