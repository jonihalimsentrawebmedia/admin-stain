import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsStory } from './data/columns'
import { UseGetStoryAlumni } from './hooks/index'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const CommunityAlumniStory = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const columns = ColumnsStory()
  const { story, loading, meta } = UseGetStoryAlumni({
    page,
    limit,
    search,
  })

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide titleGuide={'Cerita Alumni'} valueGuide="FAKULTAS_ALUMNI_CERITA" />
              ),
            },
            {
              type: 'add',
              label: 'Tulis Cerita',
              onClick: () => navigate('add'),
            },
          ]}
          label="Cerita Alumni"
        />

        <TableCustom data={story} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
