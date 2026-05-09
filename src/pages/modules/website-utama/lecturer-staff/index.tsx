import { UseGetEmployee } from '@/pages/modules/website-utama/lecturer-staff/hooks'
import { ColumnsEmployee } from '@/pages/modules/website-utama/lecturer-staff/data/columns.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ButtonSyncLecturer } from '@/pages/modules/website-utama/lecturer-staff/component/buttonSync.tsx'
import ButtonGoToGuide from '../panduan/components/ButtonGoToGuide'

const LecturerStaff = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { loading, employee, meta } = UseGetEmployee({
    page: page,
    limit: limit,
    search: search,
  })
  const columns = ColumnsEmployee()
  const navigate = useNavigate()

  return (
    <>
      <div className={'space-y-4'}>
        <ButtonTitleGroup
          rootButtonClassName={'items-stat!'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonSyncLecturer />,
            },
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide="Data Dosen dan Staff"
                  valueGuide="WEBSITE_UTAMA_DOSEN_STAFF"
                />
              ),
            },
            {
              type: 'add',
              label: 'Tambah Data',
              onClick: () => navigate('add'),
            },
          ]}
          label="Data Dosen dan Staff"
        />
        <TableCustom
          columnsName={['tempat_lahir', 'nip']}
          columns={columns}
          data={employee}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}

export default LecturerStaff
