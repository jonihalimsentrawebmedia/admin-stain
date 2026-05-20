import { UseGetListTraining } from '@/pages/modules/Pulsikom/training/list-training/hooks'
import { ColumnsListTraining } from '@/pages/modules/Pulsikom/training/list-training/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'

export const DraftSection = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'

  const { listTraining, loading, meta } = UseGetListTraining({
    status: 'DRAFT',
    search,
    page,
    limit,
  })
  const columns = ColumnsListTraining()

  return (
    <>
      <TableCustom data={listTraining} columns={columns} loading={loading} meta={meta} />
    </>
  )
}
