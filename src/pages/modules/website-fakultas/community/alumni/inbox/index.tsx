import { UseGetStoryInbox } from '@/pages/modules/website-fakultas/community/alumni/inbox/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ColumnsInboxStory } from '@/pages/modules/website-fakultas/community/alumni/inbox/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const InboxStoryPage = () => {
  const { storyInbox, loading, meta } = UseGetStoryInbox()
  const columns = ColumnsInboxStory()

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup buttonGroup={[]} label="Cerita Alumni" />

        <TableCustom data={storyInbox} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
