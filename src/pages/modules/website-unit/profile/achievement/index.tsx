import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetCategoryAchievement } from '@/pages/modules/website-unit/profile/achievement/hooks'
import { CategoryAchievementColumns } from '@/pages/modules/website-unit/profile/achievement/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { useSearchParams } from 'react-router-dom'

export const AchievementUnitPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { meta, categoryAchievement, loading } = UseGetCategoryAchievement({
    page: page,
    limit: limit,
    search: search,
  })
  const columns = CategoryAchievementColumns()
  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          label={'Penghargaan Unit'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide="Penghargaan Unit"
                  valueGuide="PERPUSTAKAAN_PROFIL_PENGHARGAAN"
                />
              ),
            },
          ]}
        />
        <TableCustom columns={columns} data={categoryAchievement} loading={loading} meta={meta} />
      </div>
    </>
  )
}
