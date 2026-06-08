import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IHumanResource } from '@/pages/modules/E-Office/reference/human-resource/hooks.tsx'
import { Label } from '@/components/ui/label.tsx'
import type { IAttendance } from './hooks.tsx'
import { ButtonDeleteAttendance } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/list-attandaces/component/buttonDelete.tsx'
import ButtonEditAttendance from '@/pages/modules/E-Office/event-activity/event-data/detail/component/list-attandaces/component/buttonEdit.tsx'

interface Props {
  page: string
  limit: string
}

export const ColumnsHumanResource = (props: Props) => {
  const { page, limit } = props

  const columns: ColumnDef<IHumanResource>[] = [
    {
      id: 'selected',
      header: ({ table }) => {
        return (
          <Label className={'flex items-center gap-1.5'}>
            <input
              type="checkbox"
              checked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
          </Label>
        )
      },
      cell: ({ row }) => {
        return (
          <div className={'flex items-center gap-1.5'}>
            <input
              key={row.index}
              type="checkbox"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </div>
        )
      },
    },
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return (
          <p className="text-sm font-medium">
            {row.index + 1 + (Number(page) - 1) * Number(limit)}
          </p>
        )
      },
    },
    {
      accessorKey: 'nama',
      header: 'Nama Lengkap',
    },
    {
      accessorKey: 'nama_unit_kerja',
      header: 'Unit Kerja',
    },
    {
      accessorKey: 'jabatan',
      header: 'Jabatan',
      cell: ({ row }) => {
        const data = row.original
        return <p>{data?.jabatan?.[0] ?? ''}</p>
      },
    },
    {
      accessorKey: 'no_hp',
      header: 'No HP',
    },
  ]
  return columns
}

export const ColumnsAttendance = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')
  const limit = Number(searchParams.get('limit') ?? '10')

  const columns: ColumnDef<IAttendance>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        return <p className="text-sm font-medium">{row.index + 1 + (page - 1) * limit}</p>
      },
    },
    {
      accessorKey: 'nama_lengkap',
      header: 'Nama Lengkap',
    },
    {
      accessorKey: 'nama_unit',
      header: 'Instansi',
    },
    {
      accessorKey: 'nama_unit_kerja',
      header: 'Unit Kerja',
    },
    {
      accessorKey: 'jabatan',
      header: 'Jabatan',
    },
    {
      accessorKey: 'no_hp',
      header: 'No HP',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row.original
        return (
          <>
            <div className="flex flex-col items-center justify-center gap-2">
              <ButtonEditAttendance data={data} />
              <ButtonDeleteAttendance data={data} />
            </div>
          </>
        )
      },
    },
  ]
  return columns
}
