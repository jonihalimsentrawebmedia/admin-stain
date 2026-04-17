import { UseGetStatusEmployee } from '@/pages/modules/website-utama/lecturer-staff/status-employee/hooks'
import { ColumnsEmployee } from '@/pages/modules/website-utama/lecturer-staff/status-employee/data/columns.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonAddEmployeeStatus from '@/pages/modules/website-utama/lecturer-staff/status-employee/component/buttonAdd.tsx'

const StatusEmployeePage = () => {
  const { status, meta, loading } = UseGetStatusEmployee()
  const coloumns = ColumnsEmployee()

  return (
    <>
      <div className={'space-y-4'}>
        <ButtonTitleGroup
          buttonGroup={[{ type: 'custom', element: <ButtonAddEmployeeStatus /> }]}
          label="Status Karyawan"
        />
        <TableCustom columns={coloumns} data={status} loading={loading} meta={meta} />
      </div>
    </>
  )
}

export default StatusEmployeePage
