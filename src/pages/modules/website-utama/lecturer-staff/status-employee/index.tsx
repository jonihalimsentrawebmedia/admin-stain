import { UseGetStatusEmployee } from '@/pages/modules/website-utama/lecturer-staff/status-employee/hooks'
import { ColumnsEmployee } from '@/pages/modules/website-utama/lecturer-staff/status-employee/data/columns.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonAddEmployeeStatus from '@/pages/modules/website-utama/lecturer-staff/status-employee/component/buttonAdd.tsx'
import ButtonGoToGuide from '../../panduan/components/ButtonGoToGuide'
import { useSearchParams } from 'react-router-dom'

const StatusEmployeePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { status, meta, loading } = UseGetStatusEmployee({
    page: page,
    limit: limit,
    search: search,
  })
  const coloumns = ColumnsEmployee()

  return (
    <>
      <div className={'space-y-4'}>
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide="Status Karyawan"
                  valueGuide="WEBSITE_UTAMA_DOSEN_STAFF_STATUS"
                />
              ),
            },
            { type: 'custom', element: <ButtonAddEmployeeStatus /> },
          ]}
          label="Status Karyawan"
        />
        <TableCustom columns={coloumns} data={status} loading={loading} meta={meta} />
      </div>
    </>
  )
}

export default StatusEmployeePage
