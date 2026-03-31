import { UseGetCarrierNews } from '../hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { StatusPublish } from '../data/types'
import { ColumnsReturnByStatus } from './columns/index'
import { useSearchParams } from 'react-router-dom'

interface props {
  status: StatusPublish
}

export const TableDataListNews = (props: props) => {
  const { status } = props

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'

  const { loading, meta, unitNews } = UseGetCarrierNews({
    status_publish: status,
    page: page,
    limit: limit,
  })
  const columns = ColumnsReturnByStatus(status)

  return (
    <>
      <TableCustom data={unitNews} loading={loading} meta={meta} columns={columns} />
    </>
  )
}
