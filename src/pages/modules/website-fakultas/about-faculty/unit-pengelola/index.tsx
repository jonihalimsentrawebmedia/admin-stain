import TableCustom from '@/components/common/table/TableCustom'
import ButtonAddManagementUnit from './components/buttonAdd.tsx'
import ColumnsManagementUnit from '@/pages/modules/website-fakultas/about-faculty/unit-pengelola/data/columns.tsx'
import { UseGetFacultyUnit } from '@/pages/modules/website-fakultas/about-faculty/unit-pengelola/hooks'

const UserFacultyView = () => {
  const { loading, facultyUser, meta } = UseGetFacultyUnit()
  const { columns } = ColumnsManagementUnit()
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-primary text-2xl">Unit Pengelola</div>
        <ButtonAddManagementUnit />
      </div>
      <TableCustom columns={columns} data={facultyUser} loading={loading} meta={meta} />
    </div>
  )
}

export default UserFacultyView
