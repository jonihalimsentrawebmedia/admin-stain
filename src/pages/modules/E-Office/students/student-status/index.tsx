import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddStudentStatus from './component/buttonAdd.tsx'
import { UseGetStudentStatus } from './hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsStudentStatus } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const ListStudentStatus = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { studentStatus, meta, loading } = UseGetStudentStatus({
    page,
    limit,
    search,
  })
  const columns = ColumnsStudentStatus()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Status Mahasiswa'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddStudentStatus />,
            },
          ]}
        />

        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={studentStatus}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}
export default ListStudentStatus
