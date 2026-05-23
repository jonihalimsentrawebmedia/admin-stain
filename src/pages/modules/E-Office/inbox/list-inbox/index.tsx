import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { UseGetInbox } from '@/pages/modules/E-Office/inbox/list-inbox/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { columnsListInbox } from '@/pages/modules/E-Office/inbox/list-inbox/data/columns.tsx'

export const ListInbox = () => {
  const navigate = useNavigate()
  const { listInbox, meta, loading } = UseGetInbox()

  const columns = columnsListInbox()

  return (
    <>
      <div className="space-y-5 py-10">
        <ButtonTitleGroup
          label={'Daftar Surat Masuk'}
          buttonGroup={[
            {
              type: 'add',
              label: 'Tulis Surat',
              onClick: () => navigate('/modules/e-office/inbox/registration-inbox'),
            },
          ]}
        />

        <TableCustom data={listInbox} columns={columns} meta={meta} loading={loading} />
      </div>
    </>
  )
}
