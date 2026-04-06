import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetStaffFaculty } from '@/pages/modules/website-fakultas/about-faculty/staff/hooks'

export const StaffProfileFaculty = () => {
  const { staff, loading, meta } = UseGetStaffFaculty()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup buttonGroup={[]} label="Staff" />

        <TableCustom data={staff} columns={[]} loading={loading} meta={meta} />
      </div>
    </>
  )
}
