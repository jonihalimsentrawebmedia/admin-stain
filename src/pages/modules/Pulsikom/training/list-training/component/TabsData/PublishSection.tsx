import { UseGetListTraining } from '@/pages/modules/Pulsikom/training/list-training/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsPublishTraining } from '@/pages/modules/Pulsikom/training/list-training/data/columns.tsx'

export const PublishSection = () => {
  const { listTraining, loading, meta } = UseGetListTraining({
    status: 'DITERBITKAN',
  })
  const columns: any = ColumnsPublishTraining()

  return (
    <>
      <TableCustom data={listTraining} columns={columns} loading={loading} meta={meta} />
    </>
  )
}
