import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetFaculty from './controller/useGetFaculty'
import FacultyViewModel from './FacultyViewModel'
import TableCustom from '@/components/common/table/TableCustom'

const FacultyView = () => {
  const { columns } = FacultyViewModel()

  const { faculty, loading, meta } = useGetFaculty()

  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup buttonGroup={[]} label="Fakultas" />
      <TableCustom columns={columns} data={faculty} loading={loading} meta={meta} />
    </div>
  )
}

export default FacultyView
