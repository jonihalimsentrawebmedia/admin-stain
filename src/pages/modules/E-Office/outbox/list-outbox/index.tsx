import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetOutbox } from './hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { columnsListOutbox } from './data/columns'

export const ListOutbox = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { listInbox, meta, loading } = UseGetOutbox({
    page,
    limit,
    search,
  })
  const columns = columnsListOutbox()

  return (
    <>
      <div className="space-y-5">
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
