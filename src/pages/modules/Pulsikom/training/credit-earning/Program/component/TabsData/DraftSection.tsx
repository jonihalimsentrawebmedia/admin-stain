import { UseGetListProgram } from '../../hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsListProgram } from '../../data/columns'
import { useSearchParams } from 'react-router-dom'

export const DraftSection = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { listProgram, loading, meta } = UseGetListProgram({
    status: 'DRAFT',
    page: page,
    limit: limit,
    search: search,
  })
  const columns = ColumnsListProgram()

  return (
    <>
      <TableCustom data={listProgram} columns={columns} loading={loading} meta={meta} />
    </>
  )
}
