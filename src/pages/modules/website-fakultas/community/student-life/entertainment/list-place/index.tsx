import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetListPlace } from './hook/index'
import ColumnsStudentEntertainment from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const ListPlaceStudentOrganization = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { listPlace, loading, meta } = UseGetListPlace({
    page,
    limit,
    search,
  })
  const columns = ColumnsStudentEntertainment()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Daftar Hiburan Mahasiswa'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Daftar Hiburan Mahasiswa'}
                  valueGuide="FAKULTAS_KEHIDUPAN_TEMPAT_HIBURAN_DAFTAR_TEMPAT"
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

        <TableCustom data={listPlace} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
