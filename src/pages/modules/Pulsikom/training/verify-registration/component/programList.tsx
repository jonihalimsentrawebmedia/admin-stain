import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsProgramVerify } from '../data/columns'
import { UseGetListProgram } from '@/pages/modules/Pulsikom/training/credit-earning/Program/hooks'

export const ProgramList = () => {
  const { listProgram, loading, meta } = UseGetListProgram({
    status: 'DITERBITKAN',
  })
  const columns: any = ColumnsProgramVerify()

  return (
    <>
      <TableCustom data={listProgram} columns={columns} loading={loading} meta={meta} />
    </>
  )
}
