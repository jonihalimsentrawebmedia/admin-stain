import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetFacilitiesList } from '@/pages/modules/website-fakultas/facilities/hooks'
import ColumnsFacilities from '@/pages/modules/website-fakultas/facilities/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '../../website-utama/panduan/components/ButtonGoToGuide'

export const FacilitiesPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { listFacilities, meta, loading } = UseGetFacilitiesList({
    page: page,
    limit: limit,
    search: search,
  })
  const columns = ColumnsFacilities()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Fasilitas'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide={'Fasilitas'} valueGuide="FAKULTAS_FASILITAS" />,
            },
            {
              type: 'add',
              label: 'Tambah Fasilitas',
              onClick: () => {
                navigate('add')
              },
            },
          ]}
        />

        <TableCustom data={listFacilities} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
