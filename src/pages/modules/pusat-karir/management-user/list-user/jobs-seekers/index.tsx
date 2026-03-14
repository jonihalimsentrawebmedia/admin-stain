import { UseGetJobsSeekers } from '@/pages/modules/pusat-karir/management-user/list-user/jobs-seekers/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsJobsSeekers } from '@/pages/modules/pusat-karir/management-user/list-user/jobs-seekers/data/columns.tsx'

export const JobsSeekersTableList = () => {
  const { jobSeekers, meta, loading } = UseGetJobsSeekers()

  const columns = ColumnsJobsSeekers()

  return (
    <>
      <TableCustom data={jobSeekers} columns={columns} loading={loading} meta={meta} />
    </>
  )
}
