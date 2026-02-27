import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { StatusPublish } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { ColumnsReturnByStatus } from './columns/index'
import { useSearchParams } from 'react-router-dom'
import { UseGetAgendaLppm } from '../hooks'

interface props {
  status: StatusPublish
}

export const TableDataListAgenda = (props: props) => {
  const { status } = props

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'

  const { loading, meta, agendaLppm } = UseGetAgendaLppm({
    status_publish: status,
    page: page,
    limit: limit,
  })

  const columns = ColumnsReturnByStatus(status)

  return (
    <>
      <TableCustom data={agendaLppm} loading={loading} meta={meta} columns={columns} />
    </>
  )
}
