import ButtonAddManagementUnit from '@/pages/modules/website-prodi/profile/management-unit/components/buttonAdd.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetManagementUnit } from '@/pages/modules/website-prodi/profile/management-unit/hooks'
import UnitUserManagement from './data/columns'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const ManagementUnitPage = () => {
  const { loading, unitUser, meta } = UseGetManagementUnit()
  const { columns } = UnitUserManagement()

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-xl sm:text-2xl font-medium">Unit Pengelola</p>
          <div className="flex gap-4 items-center">
            <ButtonGoToGuide titleGuide='Unit Pengelola' valueGuide="PRODI_PROFIL_UNIT_PENGELOLA" />
            <ButtonAddManagementUnit />
          </div>
        </div>

        <TableCustom columns={columns} data={unitUser} loading={loading} meta={meta} />
      </div>
    </>
  )
}
