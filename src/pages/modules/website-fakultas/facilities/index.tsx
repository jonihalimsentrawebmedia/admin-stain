import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { UseGetFacilitiesList } from '@/pages/modules/website-fakultas/facilities/hooks'
import ColumnsFacilities from '@/pages/modules/website-fakultas/facilities/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const FacilitiesPage = () => {
  const navigate = useNavigate()
  const { listFacilities, meta, loading } = UseGetFacilitiesList()
  const columns = ColumnsFacilities()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Fasilitas'}
          buttonGroup={[
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
