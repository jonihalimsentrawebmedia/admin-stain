import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetStoryPPSM } from '@/pages/modules/website-fakultas/academic/ppsm/story/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsStory } from '@/pages/modules/website-fakultas/academic/ppsm/story/data/columns.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const AlumniStoriesPPSM = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { story, meta, loading } = UseGetStoryPPSM({
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
                  titleGuide={'PPSM - Cerita Alumni'}
                  valueGuide="FAKULTAS_AKADEMIK_PSSM_CERITA_ALUMNI"
                />
              ),
            },
            {
              type: 'add',
              label: 'Tambah Cerita',
              onClick: () => navigate('add'),
            },
          ]}
          label="PPSM - Cerita Alumni"
        />

        <TableCustom data={story} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
