import { UseGetListTraining } from '@/pages/modules/Pulsikom/training/list-training/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsTrainingVerify } from '../data/columns'
import { useSearchParams } from 'react-router-dom'

export const TrainingList = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'

  const { listTraining, loading, meta } = UseGetListTraining({
    status: 'DITERBITKAN',
    search: search,
    page: page,
    limit: limit,
  })
  const columns: any = ColumnsTrainingVerify()

  return (
    <>
      <TableCustom data={listTraining} columns={columns} loading={loading} meta={meta} />
    </>
  )
}
