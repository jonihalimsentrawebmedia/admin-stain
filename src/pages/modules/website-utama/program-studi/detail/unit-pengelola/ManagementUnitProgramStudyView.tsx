import TableCustom from '@/components/common/table/TableCustom'
import useGetManagementUnit from '../controller/useGetManagementUnit'
import ButtonAddManagementUnit from './components/ButtonAddManagementUnit'
import ManagementUnitProgramStudyViewModel from './ManagementUnitProgramStudyViewModel'
import ButtonGoToGuide from '../../../panduan/components/ButtonGoToGuide'
import { useSearchParams } from 'react-router-dom'

const ManagementUnitProgramStudyView = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { loading, managementUnit, meta } = useGetManagementUnit({
    page: page,
    limit: limit,
    search: search,
  })
  const { columns } = ManagementUnitProgramStudyViewModel()
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-primary text-2xl">Unit Pengelola</div>
        <div className="flex gap-4 items-center">
          <ButtonGoToGuide
            titleGuide="Unit Pengelola"
            valueGuide="WEBSITE_UTAMA_SATUAN_ORGANISASI_UNIT_PENGELOLA"
          />
          <ButtonAddManagementUnit />
        </div>
      </div>
      <TableCustom columns={columns} data={managementUnit} loading={loading} meta={meta} />
    </div>
  )
}

export default ManagementUnitProgramStudyView
