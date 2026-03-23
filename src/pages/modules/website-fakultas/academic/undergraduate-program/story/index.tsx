import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsStory } from './data/columns.tsx'
import { UseGetStoryUnderGraduated } from './hooks/index.tsx'

export const AlumniStoriesUnderGraduated = () => {
  const navigate = useNavigate()
  const { story, meta, loading } = UseGetStoryUnderGraduated()
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
          label="International Undergraduate Program  - Cerita Alumni"
        />

        <TableCustom data={story} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
