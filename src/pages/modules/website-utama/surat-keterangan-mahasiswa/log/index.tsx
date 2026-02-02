import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useParams } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsLog } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data/columns.tsx'
import { UseGetLogLetterStudent, UseGetStudentLetterById } from '../hook/index'

export const LogActivitySKM = () => {
  const { id } = useParams()
  const { logData } = UseGetLogLetterStudent(id ?? '')
  const { studentLetter: detail } = UseGetStudentLetterById(id ?? '')
  const columns = ColumnsLog()

  return (
    <>
      <ButtonTitleGroup label={'Log Data'} buttonGroup={[]} isBack />

      <div className={'my-5 grid gap-2.5 grid-cols-[12rem_1fr]'}>
        <p className="text-gray-500">Judul Surat</p>
        <p>{detail?.judul_surat}</p>
        <p className="text-gray-500">Keterangan Surat</p>
        <p>{detail?.keterangan}</p>
      </div>

      <p className="text-primary">History Perubahan Data</p>

      <TableCustom data={logData} columns={columns} />
    </>
  )
}
