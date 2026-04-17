import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IEmployee } from '@/pages/modules/website-utama/lecturer-staff/data/types.ts'
import { format } from 'date-fns'
import { SelectUnit } from '@/pages/modules/website-utama/lecturer-staff/set-unit/component/selectUnit.tsx'

interface props {
  unit: { id_satuan_organisasi: string; nama_satuan_organisasi: string }[]
}

export const ColumnsSetUnit = (props: props) => {
  const { unit } = props
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
    },
    {
      accessorKey: 'nik',
      header: 'NIK',
    },
    {
      accessorKey: 'nip',
      header: 'NIP',
    },
    {
      accessorKey: 'golongan',
      header: 'Golongan',
    },
    {
      accessorKey: 'nama_status',
      header: 'Status',
    },
    {
      accessorKey: 'tempat_lahir',
      header: 'TTL',
      cell: ({ row }) => {
        const data = row.original
        return (
          <div>
            {data.tempat_lahir},{' '}
            {data.tanggal_lahir ? format(data?.tanggal_lahir, 'dd-MM-yyyy') : ''}
          </div>
        )
      },
    },
    {
      accessorKey: 'nama_unit_kerja',
      header: 'Unit Kerja',
      cell: ({ row }) => {
        const data = row.original
        return <SelectUnit unit={unit} status={row?.getIsSelected()} data={data} />
      },
    },
  ]

  return columns
}
