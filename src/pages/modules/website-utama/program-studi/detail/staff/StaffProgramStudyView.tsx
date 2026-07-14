import TableCustom from '@/components/common/table/TableCustom'
import useGetStaff from '../controller/useGetStaff'
import StaffProgramStudyViewModel from './StaffProgramStudyViewModel'
import { Button } from '@/components/ui/button'
import { BiSync } from 'react-icons/bi'
import ButtonGoToGuide from '../../../panduan/components/ButtonGoToGuide'

const StaffProgramStudyView = () => {
  const { loading, staff, meta } = useGetStaff()
  const { columns } = StaffProgramStudyViewModel()
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-between items-center">
        <div className="text-primary text-2xl font-medium">Staff</div>
        <div className="flex flex-wrap gap-4 items-center">
          <ButtonGoToGuide titleGuide='Staff' valueGuide="WEBSITE_UTAMA_SATUAN_ORGANISASI_STAFF" />
          <Button
            variant={'outline'}
            className="border border-primary text-primary hover:text-primary"
          >
            <BiSync />
            Sinkronisasi Dari SIMPEG
          </Button>
        </div>
      </div>
      <TableCustom columns={columns} data={staff} loading={loading} meta={meta} />
    </div>
  )
}

export default StaffProgramStudyView
