import ButtonAddManagementUnit from '@/pages/modules/website-prodi/profile/management-unit/components/buttonAdd.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetManagementUnit } from '@/pages/modules/website-prodi/profile/management-unit/hooks'
import UnitUserManagement from './data/columns'

export const ManagementUnitPage = () => {
  const { loading, unitUser, meta } = UseGetManagementUnit()
  const { columns } = UnitUserManagement()

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-medium">Unit Pengelola</p>
          <ButtonAddManagementUnit />
        </div>

        <TableCustom columns={columns} data={unitUser} loading={loading} meta={meta} />
      </div>
    </>
  )
}
