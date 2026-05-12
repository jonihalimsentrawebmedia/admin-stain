import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IEmployee } from '@/pages/modules/website-utama/lecturer-staff/data/types.ts'
import type { IStatusEmployee } from '@/pages/modules/website-utama/lecturer-staff/status-employee/data/types.ts'
import { SelectStatus } from '@/pages/modules/website-utama/lecturer-staff/set-status/component/selectUnit.tsx'

interface props {
  status: IStatusEmployee[]
}

export const ColumnsSetStatus = (props: props) => {
  const { status } = props
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IEmployee>[] = [
    {
      id: 'selected',
      header: ({ table }) => {
        return (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        )
      },

      cell: ({ row }) => {
        const { id_sdm } = row.original
        return (
          <input
            key={row.index}
            disabled={!id_sdm}
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        )
      },
    },
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{(page - 1) * limit + i + 1}</>
      },
    },
    {
      accessorKey: 'gambar_url',
      header: 'Gambar',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <img src={data?.gambar_url} alt="icon" className={'object-contain size-12 w-12 h-12'} />
        )
      },
    },
    {
      accessorKey: 'nama',
      header: 'Nama',
      cell: ({ row }) => {
        const data = row?.original
        return (
          <>
            <p>{data?.nama}</p>
            <p>{data?.nik}</p>
          </>
        )
      },
    },
    {
      accessorKey: 'golongan',
      header: 'Golongan',
    },
    {
      accessorKey: 'nama_unit_kerja',
      header: 'Unit Kerja',
    },
    {
      accessorKey: 'nama_status',
      header: 'Status',
      cell: ({ row }) => {
        const data = row.original
        return <SelectStatus status={status} data={data} disabled={row?.getIsSelected()} />
      },
    },
  ]

  return columns
}
