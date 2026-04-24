import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsStory } from './data/columns.tsx'
import { UseGetStoryInternationalMobility } from './hooks/index.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

export const AlumniStoriesMobility = () => {
  const navigate = useNavigate()
  const { story, meta, loading } = UseGetStoryInternationalMobility()
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
                  titleGuide={'International Mobility    - Cerita Alumni'}
                  valueGuide="FAKULTAS_AKADEMIK_INTERNATIONAL_MOBILITY_CERITA_ALUMNI"
                />
              ),
            },
            {
              type: 'add',
              label: 'Tambah Cerita',
              onClick: () => navigate('add'),
            },
          ]}
          label="International Mobility    - Cerita Alumni"
        />

        <TableCustom data={story} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
