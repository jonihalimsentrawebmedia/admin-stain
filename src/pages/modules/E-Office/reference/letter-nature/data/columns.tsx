import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ILetterNature } from '@/pages/modules/E-Office/reference/letter-nature/data/types.ts'
import ButtonEditLetterNature from '@/pages/modules/E-Office/reference/letter-nature/component/buttonEdit.tsx'
import ButtonDeleteLetterNature from '@/pages/modules/E-Office/reference/letter-nature/component/buttonDelete.tsx'

export const ColumnsLetterNature = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<ILetterNature>[] = [
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
      header: 'Keterangan',
    },
    {
      accessorKey: 'warna',
      header: 'Warna',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div
              className={'size-4 rounded-full'}
              style={{
                backgroundColor: row.original.warna,
              }}
            />
            <span className="text-sm font-medium">{row.original.warna}</span>
          </div>
        )
      },
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
              <ButtonEditLetterNature data={data} />
              <ButtonDeleteLetterNature data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
