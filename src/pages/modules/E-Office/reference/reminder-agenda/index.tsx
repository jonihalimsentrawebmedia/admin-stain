import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddReminderAgenda from './component/buttonAdd.tsx'
import { USeGetReminderAgenda } from './hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsReminderAgenda } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const ListReminderAgenda = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { reminderAgenda, meta, loading } = USeGetReminderAgenda({
    page,
    limit,
    search,
  })
  const columns = ColumnsReminderAgenda()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Waktu Pengingat Agenda'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddReminderAgenda />,
            },
          ]}
        />

        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={reminderAgenda}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}
export default ListReminderAgenda
