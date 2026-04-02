import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsClosedProgram } from '../../data/columns.tsx'
import { UseGetListProgram } from '../../hooks/index'

export const ClosedSection = () => {
  const { listProgram, loading, meta } = UseGetListProgram({
    status: 'DITUTUP',
  })
  const columns: any = ColumnsClosedProgram()

  return (
    <>
      <TableCustom data={listProgram} columns={columns} loading={loading} meta={meta} />
    </>
  )
}
