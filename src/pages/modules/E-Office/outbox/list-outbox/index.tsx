import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { UseGetOutbox } from './hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { columnsListOutbox } from './data/columns'

export const ListOutbox = () => {
  const navigate = useNavigate()
  const { listInbox, meta, loading } = UseGetOutbox()

  const columns = columnsListOutbox()

  return (
    <>
      <div className="space-y-5 py-10">
        <ButtonTitleGroup
          label={'Daftar Surat Keluar'}
          buttonGroup={[
            {
              type: 'add',
              label: 'Tulis Surat',
              onClick: () => navigate('/modules/e-office/outbox/registration-outbox'),
            },
          ]}
        />

        <TableCustom data={listInbox} columns={columns} meta={meta} loading={loading} />
      </div>
    </>
  )
}
