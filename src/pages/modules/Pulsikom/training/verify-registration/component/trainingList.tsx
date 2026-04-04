import { UseGetListTraining } from '@/pages/modules/Pulsikom/training/list-training/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsTrainingVerify } from '../data/columns'

export const TrainingList = () => {
  const { listTraining, loading, meta } = UseGetListTraining({
    status: 'DITERBITKAN',
  })
  const columns: any = ColumnsTrainingVerify()

  return (
    <>
      <TableCustom data={listTraining} columns={columns} loading={loading} meta={meta} />
    </>
  )
}
