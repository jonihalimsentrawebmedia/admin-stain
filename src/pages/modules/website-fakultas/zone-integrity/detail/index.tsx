import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { UseGetDetailZoneIntegrity } from '../hooks/index'
import { UseGetSubZoneIntegrity } from './hooks/index.tsx'
import ColumnsSubZoneIntegrity from './data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const DetailZoneIntegrity = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { detail } = UseGetDetailZoneIntegrity((id as string) ?? '')
  const { subZoneIntegrity, loading, meta } = UseGetSubZoneIntegrity()
  const columns = ColumnsSubZoneIntegrity()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={`Sub Kategori - ${detail?.nama_kategori}`}
          buttonGroup={[
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
