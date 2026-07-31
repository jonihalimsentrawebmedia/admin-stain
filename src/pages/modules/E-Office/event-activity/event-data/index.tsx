import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddEvent from '@/pages/modules/E-Office/event-activity/event-data/component/buttonAdd.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { UseGetEventActivity } from '@/pages/modules/E-Office/event-activity/event-data/hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsEvent } from '@/pages/modules/E-Office/event-activity/event-data/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const EventDataActivity = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const columns = ColumnsEvent()
  const { event, loading, meta } = UseGetEventActivity({
    page,
    limit,
    search,
  })

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Data Aktivitas'}
          buttonGroup={[{ type: 'custom', element: <ButtonGoToGuide titleGuide={'Data Aktivitas'} valueGuide="E_OFFICE_EVENT_ACTIVITY" /> }, { type: 'custom', element: <ButtonAddEvent /> }]}
        />

        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={event}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}

export default EventDataActivity
