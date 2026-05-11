import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IStatusActiveSDM } from '@/pages/modules/website-utama/lecturer-staff/status-active/data/types.tsx'
import ButtonEditStatusActive from '@/pages/modules/website-utama/lecturer-staff/status-active/component/buttonEdit.tsx'
import ButtonDeleteStatusActive from '@/pages/modules/website-utama/lecturer-staff/status-active/component/buttonDelete.tsx'

export const ColumnsStatusActive = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IStatusActiveSDM>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'kode_status',
      header: 'Kode Status',
    },
    {
      accessorKey: 'nama_status',
      header: 'Nama Status',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className="flex items-center justify-end gap-1.5">
              <ButtonEditStatusActive data={data} />
              <ButtonDeleteStatusActive data={data} />
            </div>
          </>
        )
      },
    },
  ]

  return columns
}
