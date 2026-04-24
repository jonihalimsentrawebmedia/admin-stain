import TableCustom from '@/components/common/table/TableCustom'
import ButtonAddManagementUnit from './components/buttonAdd.tsx'
import ColumnsManagementUnit from '@/pages/modules/website-fakultas/about-faculty/unit-pengelola/data/columns.tsx'
import { UseGetFacultyUnit } from '@/pages/modules/website-fakultas/about-faculty/unit-pengelola/hooks'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

const UserFacultyView = () => {
  const { loading, facultyUser, meta } = UseGetFacultyUnit()
  const { columns } = ColumnsManagementUnit()
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-primary text-2xl">Unit Pengelola</div>
        <div className="flex gap-4 items-center">
          <ButtonGoToGuide titleGuide={'Unit Pengelola'} valueGuide="FAKULTAS_PROFIL_UNIT_PENGELOLA" />
          <ButtonAddManagementUnit />
        </div>
      </div>
      <TableCustom columns={columns} data={facultyUser} loading={loading} meta={meta} />
    </div>
  )
}

export default UserFacultyView
