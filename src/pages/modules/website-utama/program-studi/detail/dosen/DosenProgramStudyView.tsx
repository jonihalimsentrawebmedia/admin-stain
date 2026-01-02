import TableCustom from '@/components/common/table/TableCustom'
import useGetDosen from '../controller/useGetDosen'
import DosenProgramStudyViewModel from './DosenProgramStudyViewModel'
import { Button } from '@/components/ui/button'
import { BiSync } from 'react-icons/bi'

const DosenProgramStudyView = () => {
  const { loading, dosen, meta } = useGetDosen()
  const { columns } = DosenProgramStudyViewModel()
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-primary text-2xl font-medium">Dosen</div>

        <Button
          variant={'outline'}
          className="border border-primary text-primary hover:text-primary"
        >
          <BiSync />
          Sinkronisasi Dari SIMPEG
        </Button>
      </div>
      <TableCustom columns={columns} data={dosen} loading={loading} meta={meta} />
    </div>
  )
}

export default DosenProgramStudyView
