import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsStory } from './data/columns'
import { UseGetStoryAlumni } from './hooks/index'

export const CommunityAlumniStory = () => {
  const navigate = useNavigate()
  const columns = ColumnsStory()
  const { story, loading, meta } = UseGetStoryAlumni()

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          isBack
          buttonGroup={[
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
