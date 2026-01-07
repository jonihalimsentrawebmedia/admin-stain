import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { ManagementUnitList } from '@/pages/modules/website-utama/program-studi/detail/model/management-unit.tsx'
import ButtonEditManagementUnit from '@/pages/modules/website-prodi/profile/management-unit/components/buttonEdit.tsx'
import ButtonDeleteManagementUnit from '@/pages/modules/website-prodi/profile/management-unit/components/buttonDelete.tsx'

const UnitUserManagement = () => {
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
        return (
          <img src={row.original.gambar_url} className="w-[45px] h-[60px] rounded object-cover" />
        )
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
          <div className={'flex items-center gap-2'}>
            <ButtonEditManagementUnit data={row?.original} />
            <ButtonDeleteManagementUnit data={row?.original} />
          </div>
        )
      },
    },
  ]

  return { columns }
}

export default UnitUserManagement
