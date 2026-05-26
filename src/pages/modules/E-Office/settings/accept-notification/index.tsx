import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddNotification } from '@/pages/modules/E-Office/settings/accept-notification/component/buttonAdd.tsx'
import { UseGetAcceptNotification } from '@/pages/modules/E-Office/settings/accept-notification/hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsAcceptNotification } from '@/pages/modules/E-Office/settings/accept-notification/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const AcceptNotificationPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { notification, meta, loading } = UseGetAcceptNotification({
    page,
    limit,
    search,
  })
  const columns = ColumnsAcceptNotification()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Penerima Notifikasi'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddNotification />,
            },
          ]}
        />

        <TableCustom data={notification} columns={columns} meta={meta} loading={loading} />
      </div>
    </>
  )
}
