import { UseGetJobsSeekers } from '@/pages/modules/pusat-karir/management-user/list-user/jobs-seekers/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsJobsSeekers } from '@/pages/modules/pusat-karir/management-user/list-user/jobs-seekers/data/columns.tsx'
import { useSearchParams } from 'react-router-dom'

export const JobsSeekersTableList = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { jobSeekers, meta, loading } = UseGetJobsSeekers({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsJobsSeekers()

  return (
    <>
      <TableCustom data={jobSeekers} columns={columns} loading={loading} meta={meta} />
    </>
  )
}
