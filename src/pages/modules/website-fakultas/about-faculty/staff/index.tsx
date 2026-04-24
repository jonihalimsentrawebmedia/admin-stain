import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetStaffFaculty } from '@/pages/modules/website-fakultas/about-faculty/staff/hooks'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const StaffProfileFaculty = () => {
  const { staff, loading, meta } = UseGetStaffFaculty()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Staff'}
                  valueGuide="FAKUTLAS_PROFIL_STAFF"
                />
              ),
            },
          ]}
          label="Staff"
        />

        <TableCustom data={staff} columns={[]} loading={loading} meta={meta} />
      </div>
    </>
  )
}
