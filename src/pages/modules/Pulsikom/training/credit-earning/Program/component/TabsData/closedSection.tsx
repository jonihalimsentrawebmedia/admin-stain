import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsClosedProgram } from '../../data/columns.tsx'
import { UseGetListProgram } from '../../hooks/index'
import { useSearchParams } from 'react-router-dom'

export const ClosedSection = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { listProgram, loading, meta } = UseGetListProgram({
    status: 'DITUTUP',
    page: page,
    limit: limit,
    search: search,
  })
  const columns: any = ColumnsClosedProgram()

  return (
    <>
      <TableCustom data={listProgram} columns={columns} loading={loading} meta={meta} />
    </>
  )
}
