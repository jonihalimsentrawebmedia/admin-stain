import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetMeetingMinutes } from './hooks.tsx'
import { useParams, useSearchParams } from 'react-router-dom'
import ButtonAddMeetingMinutes from './buttonAdd.tsx'
import { ColumnsMeetingMinutes } from './columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'

const MeetingMinutes = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { id } = useParams()
  const { minutes, meta, loading } = UseGetMeetingMinutes({
    id_acara: id as string,
    page,
    search,
    limit,
  })
  const columns = ColumnsMeetingMinutes()

  return (
    <>
      <Card className={'rounded-lg shadow-none p-3'}>
        <CardContent className="space-y-5">
          <ButtonTitleGroup
            label={'Notulen'}
            buttonGroup={[
              {
                type: 'custom',
                element: <ButtonAddMeetingMinutes />,
              },
            ]}
          />

          <TableCustom data={minutes} columns={columns} loading={loading} meta={meta} />
        </CardContent>
      </Card>
    </>
  )
}
export default MeetingMinutes
