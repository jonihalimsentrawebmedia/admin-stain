import TableCustom from '@/components/common/table/TableCustom'
import useGetManagementUnit from '../controller/useGetManagementUnit'
import ButtonAddManagementUnit from './components/ButtonAddManagementUnit'
import ManagementUnitProgramStudyViewModel from './ManagementUnitProgramStudyViewModel'

const ManagementUnitProgramStudyView = () => {
  const { loading, managementUnit, meta } = useGetManagementUnit()
  const { columns } = ManagementUnitProgramStudyViewModel()
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-primary text-2xl">Unit Pengelola</div>
        <ButtonAddManagementUnit />
      </div>
      <TableCustom columns={columns} data={managementUnit} loading={loading} meta={meta} />
    </div>
  )
}

export default ManagementUnitProgramStudyView
