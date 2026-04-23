import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetCategoryAchievement } from '@/pages/modules/website-unit/profile/achievement/hooks'
import { CategoryAchievementColumns } from '@/pages/modules/website-unit/profile/achievement/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const AchievementUnitPage = () => {
  const { meta, categoryAchievement, loading } = UseGetCategoryAchievement()
  const columns = CategoryAchievementColumns()
  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          label={'Penghargaan Unit'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide='Penghargaan Unit' valueGuide="PERPUSTAKAAN_PROFIL_PENGHARGAAN" />,
            },
          ]}
        />
        <TableCustom columns={columns} data={categoryAchievement} loading={loading} meta={meta} />
      </div>
    </>
  )
}
