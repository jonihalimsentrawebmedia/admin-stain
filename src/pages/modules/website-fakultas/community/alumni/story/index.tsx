import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsStory } from '@/pages/modules/website-fakultas/academic/ppsm/story/data/columns.tsx'

export const CommunityAlumniStory = () => {
  const navigate = useNavigate()
  const columns = ColumnsStory()

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

        <TableCustom data={[]} columns={columns} loading={false} />
      </div>
    </>
  )
}
