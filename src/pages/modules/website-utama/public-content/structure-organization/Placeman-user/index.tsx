import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddPlaceman } from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user/components/buttonAdd.tsx'
import { UseGetPlacemanUser } from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsUserPlaceman } from './data/columns'
import { useParams } from 'react-router-dom'
import { UseGetGroupOrganizationDetail } from '../hooks/index'

export const PlacemenUser = () => {
  const { id } = useParams()
  const { detailGroupOrganization: detail } = UseGetGroupOrganizationDetail(id ?? '')
  const { meta, loading, listUserPlaceman } = UseGetPlacemanUser(id ?? '')
  const columns = ColumnsUserPlaceman()

  return (
    <div className={'flex flex-col gap-y-8'}>
      <ButtonTitleGroup
        isBack
        label={`Daftar Pejabat - ${detail?.nama_kelompok}`}
        buttonGroup={[
          {
            type: 'add',
            label: '',
            onClick: () => {},
            element: <ButtonAddPlaceman />,
          },
        ]}
      />

      <TableCustom
        thClassName={'bg-primary-foreground'}
        tdClassName={'text-sm border whitespace-pre-line'}
        data={listUserPlaceman}
        loading={loading}
        meta={meta}
        columns={columns}
      />
    </div>
  )
}
