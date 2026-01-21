import { Link, useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IUnitTeamGroup } from '@/pages/modules/website-unit/profile/our-team/data/types.ts'
import { Button } from '@/components/ui/button.tsx'
import { FaForward } from 'react-icons/fa'
import { ButtonAddOurTeam } from '@/pages/modules/website-unit/profile/our-team/component/buttonEdit.tsx'
import { ButtonDeleteDivision } from '@/pages/modules/website-unit/profile/our-team/component/buttonDelete.tsx'

export const ColumnsOurTeams = () => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IUnitTeamGroup>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },
    {
      accessorKey: 'nama_divisi',
      header: 'Nama Divisi',
    },
    {
      accessorKey: 'id_unit_tim',
      header: 'Pejabat',
      cell: ({ row }) => {
        return (
          <Link to={`${row?.original?.id_unit_tim}/team`}>
            <Button variant={'outline'} className={'border-primary'}>
              <FaForward />
              Lihat Pejabat
            </Button>
          </Link>
        )
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
          <div className={'justify-end flex items-center gap-2'}>
            <ButtonAddOurTeam data={row?.original} />
            <ButtonDeleteDivision data={row?.original} />
          </div>
        )
      },
    },
  ]

  return columns
}
