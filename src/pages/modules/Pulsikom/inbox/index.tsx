import { UseGetInboxMessage } from '@/pages/modules/Pulsikom/inbox/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsInbox } from '@/pages/modules/Pulsikom/inbox/data/columns.tsx'
import ButtonGoToGuide from '../../website-utama/panduan/components/ButtonGoToGuide'

export const InboxMessage = () => {
  const { inboxMessage, meta, loading } = UseGetInboxMessage()
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
