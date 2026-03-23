import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { UseGetStoryPPSM } from '@/pages/modules/website-fakultas/academic/ppsm/story/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsStory } from '@/pages/modules/website-fakultas/academic/ppsm/story/data/columns.tsx'

export const AlumniStoriesPPSM = () => {
  const navigate = useNavigate()
  const { story, meta, loading } = UseGetStoryPPSM()
  const columns = ColumnsStory()

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          isBack
          buttonGroup={[
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
