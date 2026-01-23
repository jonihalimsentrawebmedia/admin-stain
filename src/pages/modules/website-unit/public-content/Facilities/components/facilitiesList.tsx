import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { StatusPublish } from '@/pages/modules/website-unit/public-content/news/data/types.ts'
import { ColumnsReturnByStatus } from './columns/index'
import { useSearchParams } from 'react-router-dom'
import { UseGetFacilitiesUnit } from '../hooks/index'

interface props {
  status: StatusPublish
}

export const TableDataListFacilities = (props: props) => {
  const { status } = props

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'

  const { loading, meta, facilitiesUnit } = UseGetFacilitiesUnit({
    status_publish: status,
    page: page,
    limit: limit,
  })

  const columns = ColumnsReturnByStatus(status)

  return (
    <>
      <TableCustom data={facilitiesUnit} loading={loading} meta={meta} columns={columns} />
    </>
  )
}
