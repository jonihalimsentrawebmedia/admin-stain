import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsProgramVerify } from '../data/columns'
import { UseGetListProgram } from '@/pages/modules/Pulsikom/training/credit-earning/Program/hooks'
import { useSearchParams } from 'react-router-dom'

export const ProgramList = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'

  const { listProgram, loading, meta } = UseGetListProgram({
    status: 'DITERBITKAN',
    search: search,
    page: page,
    limit: limit,
  })
  const columns: any = ColumnsProgramVerify()

  return (
    <>
      <TableCustom data={listProgram} columns={columns} loading={loading} meta={meta} />
    </>
  )
}
