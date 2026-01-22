import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetAchievementDetail } from '@/pages/modules/website-unit/profile/achievement/hooks'
import { useParams } from 'react-router-dom'
import { ButtonAddReward } from '@/pages/modules/website-unit/profile/achievement/reward/component/buttonAdd.tsx'
import { UseGetReward } from '@/pages/modules/website-unit/profile/achievement/reward/hooks'
import { ColumnsRewardAchievement } from '@/pages/modules/website-unit/profile/achievement/reward/data/columns.tsx'
import type { IAchievementCategory } from '@/pages/modules/website-unit/profile/achievement/data/types.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const RewardAchievement = () => {
  const { id } = useParams()
  const { achievement } = UseGetAchievementDetail(id ?? '')
  const { reward, meta, loading } = UseGetReward(id ?? '')
  const columns = ColumnsRewardAchievement(achievement as IAchievementCategory)

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          isBack
          label={achievement?.nama_kategori ?? ''}
          buttonGroup={[{ type: 'custom', element: <ButtonAddReward rootData={achievement} /> }]}
        />
        <p className="text-2xl font-semibold mt-5">Penghargaan Unit</p>

        <TableCustom data={reward} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
