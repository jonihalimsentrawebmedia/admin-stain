import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IHistoryUnit } from '@/pages/modules/website-unit/profile/history/data/types.ts'
import { ButtonEditHistory } from '@/pages/modules/website-unit/profile/history/component/buttonEdit.tsx'
import { ButtonDeleteHistory } from '@/pages/modules/website-unit/profile/history/component/buttonDelete.tsx'

export const ColumnsHistory = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IHistoryUnit>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },
    {
      accessorKey: 'tahun',
      header: 'Tahun',
    },
    {
      accessorKey: 'gambar_url',
      header: 'Gambar',
      cell: ({ row }) => {
        return <img src={row?.original?.gambar_url} alt="Gambar" className={'w-full h-[80px]'} />
      },
    },
    {
      accessorKey: 'isi_sejarah',
      header: 'Isi Sejarah',
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },
    {
      accessorKey: 'aksi',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex items-center justify-end gap-2'}>
            <ButtonEditHistory data={row?.original} />
            <ButtonDeleteHistory data={row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}
