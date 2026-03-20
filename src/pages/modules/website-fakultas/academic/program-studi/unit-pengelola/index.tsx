import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonAddProdiUser from '@/pages/modules/website-fakultas/academic/program-studi/unit-pengelola/components/buttonAdd.tsx'
import ColumnsManagementUnit from '@/pages/modules/website-fakultas/academic/program-studi/unit-pengelola/data/columns.tsx'
import { UseGetProdiUnit } from '@/pages/modules/website-fakultas/academic/program-studi/unit-pengelola/hooks'
import { useParams } from 'react-router-dom'

const UserProdiView = () => {
  const { id } = useParams()
  const { loading, prodiUser, meta } = UseGetProdiUnit((id as string) ?? '')
  const { columns } = ColumnsManagementUnit()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-primary text-2xl">Unit Pengelola</div>
        <ButtonAddProdiUser />
      </div>
      <TableCustom columns={columns} data={prodiUser} loading={loading} meta={meta} />
    </div>
  )
}

export default UserProdiView
