import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IStatusEmployee } from '@/pages/modules/website-utama/lecturer-staff/status-employee/data/types.ts'
import ButtonEditEmployeeStatus from '@/pages/modules/website-utama/lecturer-staff/status-employee/component/buttonEdit.tsx'
import ButtonDeleteEmployeeStatus from '@/pages/modules/website-utama/lecturer-staff/status-employee/component/buttonDelete.tsx'

export const ColumnsEmployee = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IStatusEmployee>[] = [
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
      header: 'Kode',
    },
    {
      accessorKey: 'nama_status',
      header: 'Nama Status',
    },
    {
      accessorKey: 'is_ada_nidn',
      header: 'Ada NIDN',
      cell: ({ row }) => {
        return <div>{row.original.is_ada_nidn ? 'Ada' : 'Tidak'}</div>
      },
    },
    {
      accessorKey: 'is_dosen',
      header: 'Jenis Status',
      cell: ({ row }) => {
        return <div>{row.original.is_dosen ? 'Dosen' : 'Staff'}</div>
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditEmployeeStatus data={data} />
            <ButtonDeleteEmployeeStatus data={data} />
          </div>
        )
      },
    },
  ]

  return columns
}
