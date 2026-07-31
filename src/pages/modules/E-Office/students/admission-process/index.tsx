import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddAdmissionProcess from './component/buttonAdd.tsx'
import { UseGetAdmissionProcess } from './hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsAdmissionProcess } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const ListAdmissionProcess = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { admissionProcess, meta, loading } = UseGetAdmissionProcess({
    page,
    limit,
    search,
  })
  const columns = ColumnsAdmissionProcess()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Jalur Masuk'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddAdmissionProcess />,
            },
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide={'Mahasiswa'} valueGuide="E_OFFICE_STUDENTS" />,
            },
          ]}
        />

        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={admissionProcess}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}
export default ListAdmissionProcess
