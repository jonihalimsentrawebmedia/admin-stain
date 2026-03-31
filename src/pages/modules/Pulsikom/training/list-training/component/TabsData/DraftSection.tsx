import { UseGetListTraining } from '@/pages/modules/Pulsikom/training/list-training/hooks'
import { ColumnsListTraining } from '@/pages/modules/Pulsikom/training/list-training/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const DraftSection = () => {
  const { listTraining, loading, meta } = UseGetListTraining({
    status: 'DRAFT',
  })
  const columns = ColumnsListTraining()

  return (
    <>
      <TableCustom data={listTraining} columns={columns} loading={loading} meta={meta} />
    </>
  )
}
