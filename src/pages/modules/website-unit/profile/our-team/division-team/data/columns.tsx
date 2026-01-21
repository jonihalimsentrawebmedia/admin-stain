import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IDivisionTeam } from '@/pages/modules/website-unit/profile/our-team/division-team/data/types.tsx'
import { Switch } from '@/components/ui/switch.tsx'
import { ButtonEditDivisionTeam } from '../component/buttonEdit.tsx'
import type { IUnitTeamGroup } from '@/pages/modules/website-unit/profile/our-team/data/types.ts'
import { ButtonDeleteDivisionTeam } from '../component/buttonDelete.tsx'

export const ColumnsDivisionTeam = (rootData: IUnitTeamGroup) => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IDivisionTeam>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },
    {
      accessorKey: 'foto_url',
      header: 'Foto',
      cell: ({ row }) => {
        return (
          <img
            src={row?.original?.foto_url}
            alt="Foto"
            className={'w-[90px] h-[120px] object-cover'}
          />
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
      accessorKey: 'is_email_verified',
      header: 'Kepala Unit?',
      cell: ({ row }) => {
        return <Switch checked={row?.original?.is_kepala_unit ?? false} />
      },
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
          <div className="flex items-center justify-end gap-2">
            <ButtonEditDivisionTeam data={row?.original} rootData={rootData} />
            <ButtonDeleteDivisionTeam data={row?.original} rootData={rootData} />
          </div>
        )
      },
    },
  ]

  return columns
}
