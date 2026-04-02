import { UseGetListProgram } from '../../hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsListProgram } from '../../data/columns'

export const DraftSection = () => {
  const { listProgram, loading, meta } = UseGetListProgram({
    status: 'DRAFT',
  })
  const columns = ColumnsListProgram()

  return (
    <>
      <TableCustom data={listProgram} columns={columns} loading={loading} meta={meta} />
    </>
  )
}
