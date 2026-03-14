import { UseGetPartnership } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsPartnership } from '@/pages/modules/pusat-karir/management-user/list-user/Partnership/data/columns.tsx'

export const PartnershipListData = () => {
  const { partnership, loading, meta } = UseGetPartnership()

  const columns = ColumnsPartnership()

  return (
    <>
      <div className={'space-y-5'}>
        <TableCustom data={partnership} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
