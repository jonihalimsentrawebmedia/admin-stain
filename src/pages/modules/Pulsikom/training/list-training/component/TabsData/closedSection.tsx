import { UseGetListTraining } from '@/pages/modules/Pulsikom/training/list-training/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsClosedTraining } from '@/pages/modules/Pulsikom/training/list-training/data/columns.tsx'

export const ClosedSection = () => {
  const { listTraining, loading, meta } = UseGetListTraining({
    status: 'DITUTUP',
  })
  const columns: any = ColumnsClosedTraining()

  return (
    <>
      <TableCustom data={listTraining} columns={columns} loading={loading} meta={meta} />
    </>
  )
}
