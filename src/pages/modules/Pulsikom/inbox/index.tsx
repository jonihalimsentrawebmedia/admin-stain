import { UseGetInboxMessage } from '@/pages/modules/Pulsikom/inbox/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsInbox } from '@/pages/modules/Pulsikom/inbox/data/columns.tsx'
import ButtonGoToGuide from '../../website-utama/panduan/components/ButtonGoToGuide'
import { useSearchParams } from 'react-router-dom'

export const InboxMessage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { inboxMessage, meta, loading } = UseGetInboxMessage({
    page,
    limit,
    search,
  })
  const columns = ColumnsInbox()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Pesan masuk'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide titleGuide={'Pesan Masuk'} valueGuide="PUSILKOM_PESAN_MASUK" />
              ),
            },
          ]}
        />

        <TableCustom data={inboxMessage} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
