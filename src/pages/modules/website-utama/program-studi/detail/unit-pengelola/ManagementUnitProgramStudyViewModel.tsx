import { useSearchParams } from 'react-router-dom'
import type { ManagementUnitList } from '../model/management-unit'
import type { ColumnDef } from '@tanstack/react-table'
import ButtonEditManagementUnit from './components/ButtonEditManagementUnit'
import ButtonDeleteManagementUnit from './components/ButtonDeleteManagementUnit'

const ManagementUnitProgramStudyViewModel = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<ManagementUnitList>[] = [
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
      header: 'Foto',
      cell: ({ row }) => {
        return <img src={row.original.gambar_url} className="w-[45px] h-[60px] rounded" />
      },
    },
    {
      accessorKey: 'nama',
      header: 'Nama',
    },
    {
      accessorKey: 'jabatan',
      header: 'Jabatan',
    },
    {
      accessorKey: 'urutan',
      header: 'Urutan',
    },

    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <ButtonEditManagementUnit data={row.original} />
            <ButtonDeleteManagementUnit data={row.original} />
          </div>
        )
      },
    },
  ]

  return { columns }
}

export default ManagementUnitProgramStudyViewModel
