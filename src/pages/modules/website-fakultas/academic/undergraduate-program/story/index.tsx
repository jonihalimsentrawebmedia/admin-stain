import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsStory } from './data/columns.tsx'
import { UseGetStoryUnderGraduated } from './hooks/index.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

export const AlumniStoriesUnderGraduated = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { story, meta, loading } = UseGetStoryUnderGraduated({
    page,
    limit,
    search,
  })
  const columns = ColumnsStory()

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          isBack
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'International Undergraduate Program  - Cerita Alumni'}
                  valueGuide="FAKULTAS_AKADEMIK_INTERNATIONAL_UNDERGRADUATE_PROGRAM_CERITA_ALUMNI"
                />
              ),
            },
            {
              type: 'add',
              label: 'Tambah Cerita',
              onClick: () => navigate('add'),
            },
          ]}
          label="International Undergraduate Program  - Cerita Alumni"
        />

        <TableCustom data={story} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
