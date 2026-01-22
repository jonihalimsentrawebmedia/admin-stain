import { useSearchParams } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'
import type { IReward } from '@/pages/modules/website-unit/profile/achievement/reward/data/types.ts'
import type { IAchievementCategory } from '@/pages/modules/website-unit/profile/achievement/data/types.tsx'
import { ButtonEditReward } from '@/pages/modules/website-unit/profile/achievement/reward/component/buttonEdit.tsx'
import { ButtonDeleteReward } from '@/pages/modules/website-unit/profile/achievement/reward/component/buttonDelete.tsx'

export const ColumnsRewardAchievement = (rootData: IAchievementCategory) => {
  const [searchParams] = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 10)

  const columns: ColumnDef<IReward>[] = [
    {
      accessorKey: 'no',
      header: '#',
      cell: (row) => {
        const idx = row.row.index
        return <div className="">{(page - 1) * limit + idx + 1}</div>
      },
    },
    {
      accessorKey: 'keterangan',
      header: 'Keterangan',
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        return (
          <div className={'flex items-center justify-end gap-2'}>
            <ButtonEditReward data={row?.original} rootData={rootData} />
            <ButtonDeleteReward data={row?.original} rootData={rootData} />
          </div>
        )
      },
    },
  ]

  return columns
}
