import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { UseGetDetailZoneIntegrity } from '../hooks/index'
import { UseGetSubZoneIntegrity } from './hooks/index.tsx'
import ColumnsSubZoneIntegrity from './data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

export const DetailZoneIntegrity = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { detail } = UseGetDetailZoneIntegrity((id as string) ?? '')
  const { subZoneIntegrity, loading, meta } = UseGetSubZoneIntegrity({
    id: id as string,
    page: page,
    limit: limit,
    search: search,
  })
  const columns = ColumnsSubZoneIntegrity()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={`Sub Kategori - ${detail?.nama_kategori}`}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={`Sub Kategori - ${detail?.nama_kategori}`}
                  valueGuide="FAKULTAS_ZONA_INTEGRITAS_KATEGORI"
                />
              ),
            },
            {
              type: 'add',
              label: 'Tambah Sub Kategori',
              onClick: () => navigate('add'),
            },
          ]}
        />

        <TableCustom data={subZoneIntegrity} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
