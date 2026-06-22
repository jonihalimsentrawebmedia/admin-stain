import { UseGetStoryInbox } from '@/pages/modules/website-fakultas/community/alumni/inbox/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ColumnsInboxStory } from '@/pages/modules/website-fakultas/community/alumni/inbox/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { useSearchParams } from 'react-router-dom'

export const InboxStoryPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { storyInbox, loading, meta } = UseGetStoryInbox({
    page,
    limit,
    search,
  })
  const columns = ColumnsInboxStory()

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Cerita Alumni'}
                  valueGuide="FAKULTAS_ALUMNI_KONTAK_MASUK"
                />
              ),
            },
          ]}
          label="Kontak Masuk"
        />

        <TableCustom data={storyInbox} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
