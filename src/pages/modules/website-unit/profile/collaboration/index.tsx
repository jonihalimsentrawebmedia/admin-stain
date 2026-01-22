import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { CollaborationColumns } from '@/pages/modules/website-unit/profile/collaboration/data/columns.tsx'
import { UseGetUnitCollaboration } from '@/pages/modules/website-unit/profile/collaboration/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const Collaboration = () => {
  const navigate = useNavigate()
  const columns = CollaborationColumns()
  const { unitCollaboration, loading, meta } = UseGetUnitCollaboration()

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          label={'Kerjasama Unit'}
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah kerjasama',
              onClick: () => navigate('add'),
            },
          ]}
        />

        <TableCustom columns={columns} data={unitCollaboration} loading={loading} meta={meta} />
      </div>
    </>
  )
}
