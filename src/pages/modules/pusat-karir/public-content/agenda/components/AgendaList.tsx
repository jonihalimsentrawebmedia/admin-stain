import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { StatusPublish } from '@/pages/modules/website-unit/public-content/news/data/types.ts'
import { ColumnsReturnByStatus } from './columns/index'
import { useSearchParams } from 'react-router-dom'
import { UseGetAgendaCarrier } from '../hooks/index'

interface props {
  status: StatusPublish
}

export const TableDataListAgenda = (props: props) => {
  const { status } = props

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'

  const { loading, meta, agendaUnit } = UseGetAgendaCarrier({
    status_publish: status,
    page: page,
    limit: limit,
  })

  const columns = ColumnsReturnByStatus(status)

  return (
    <>
      <TableCustom data={agendaUnit} loading={loading} meta={meta} columns={columns} />
    </>
  )
}
