import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetStaffFaculty } from '@/pages/modules/website-fakultas/about-faculty/staff/hooks'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import StaffColumnsFaculty from '@/pages/modules/website-fakultas/about-faculty/staff/data/columns.tsx'

export const StaffProfileFaculty = () => {
  const { staff, loading, meta } = UseGetStaffFaculty()
  const columns = StaffColumnsFaculty()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide={'Staff'} valueGuide="FAKUTLAS_PROFIL_STAFF" />,
            },
          ]}
          label="Staff"
        />

        <TableCustom data={staff} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
