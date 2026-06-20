import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetStudentOrganizations } from './hooks/index'
import ColumStudentOrganization from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const ListOrganizationStudentLife = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { listOrganization, meta, loading } = UseGetStudentOrganizations({
    page,
    limit,
    search,
  })
  const columns = ColumStudentOrganization()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          isBack
          label={'Daftar Organisasi Mahasiswa'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Daftar Organisasi Mahasiswa'}
                  valueGuide="FAKULTAS_KEHIDUPAN_ORGANISASI_MAHASISWA_DAFTAR"
                />
              ),
            },
            {
              type: 'add',
              label: 'Tambah',
              onClick: () => navigate('add'),
            },
          ]}
        />

        <TableCustom data={listOrganization} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
