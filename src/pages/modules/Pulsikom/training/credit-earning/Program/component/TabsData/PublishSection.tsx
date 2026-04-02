import { UseGetListProgram } from '../../hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsPublishProgram } from '../../data/columns'

export const PublishSection = () => {
  const { listProgram, loading, meta } = UseGetListProgram({
    status: 'DITERBITKAN',
  })
  const columns: any = ColumnsPublishProgram()

  return (
    <>
      <TableCustom data={listProgram} columns={columns} loading={loading} meta={meta} />
    </>
  )
}
