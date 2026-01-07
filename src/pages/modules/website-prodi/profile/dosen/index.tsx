import TableCustom from '@/components/common/table/TableCustom'
import { Button } from '@/components/ui/button'
import { BiSync } from 'react-icons/bi'
import { UseGetLecturer } from '@/pages/modules/website-prodi/profile/dosen/hooks'
import LecturerColumnsProfile from '@/pages/modules/website-prodi/profile/dosen/data/columns.tsx'

const LecturerProfilePage = () => {
  const { loading, lecturer, meta } = UseGetLecturer()
  const { columns } = LecturerColumnsProfile()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-medium">Dosen</p>
        <Button
          variant={'outline'}
          className="border border-primary text-primary hover:text-primary"
        >
          <BiSync />
          Sinkronisasi Dari SIMPEG
        </Button>
      </div>
      <TableCustom columns={columns} data={lecturer} loading={loading} meta={meta} />
    </div>
  )
}

export default LecturerProfilePage
