import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetLumpSum } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/lupsum/hooks'
import { useParams, useSearchParams } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsLupSum } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/lupsum/data/columns.tsx'

const LupSumAssignmentLetter = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { lupSum, loading, meta } = UseGetLumpSum({
    id: id as string,
    page,
    limit,
    search,
  })
  const columns = ColumnsLupSum()

  return (
    <>
      <div className="space-y-4">
        <ButtonTitleGroup isBack label={'Lupsum'} buttonGroup={[]} />
        <TableCustom data={lupSum} columns={columns} meta={meta} loading={loading} />
      </div>
    </>
  )
}
export default LupSumAssignmentLetter
