import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { StatusPublish } from '@/pages/modules/website-unit/public-content/news/data/types.ts'

import { UseGetFacilitiesUnit } from '../hooks'
import { ColumnsReturnByStatus } from './table'

interface props {
  status: StatusPublish
}

export const TableDataListFacilities = (props: props) => {
  const { status } = props

  const { loading, meta, listFacilities } = UseGetFacilitiesUnit()

  const columns = ColumnsReturnByStatus(status)

  return (
    <>
      <TableCustom data={listFacilities} loading={loading} meta={meta} columns={columns} />
    </>
  )
}
