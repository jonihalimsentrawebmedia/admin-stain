import { UseGetInboxMessage } from '@/pages/modules/Pulsikom/inbox/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsInbox } from '@/pages/modules/Pulsikom/inbox/data/columns.tsx'

export const InboxMessage = () => {
  const { inboxMessage, meta, loading } = UseGetInboxMessage()
  const columns = ColumnsInbox()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup label={'Produk'} buttonGroup={[]} />

        <TableCustom data={inboxMessage} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
