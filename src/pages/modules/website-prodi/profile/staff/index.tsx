import TableCustom from '@/components/common/table/TableCustom'
import { Button } from '@/components/ui/button'
import { BiSync } from 'react-icons/bi'
import { UseGetStaffProfileProdi } from '@/pages/modules/website-prodi/profile/staff/hooks'
import StaffColumnsProfile from '@/pages/modules/website-prodi/profile/staff/data/columns.tsx'

const StaffProfilePage = () => {
  const { loading, staff, meta } = UseGetStaffProfileProdi()
  const { columns } = StaffColumnsProfile()
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-medium">Staff</p>
        <Button
          variant={'outline'}
          className="border border-primary text-primary hover:text-primary"
        >
          <BiSync />
          Sinkronisasi Dari SIMPEG
        </Button>
      </div>
      <TableCustom columns={columns} data={staff} loading={loading} meta={meta} />
    </div>
  )
}

export default StaffProfilePage
