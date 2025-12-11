import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddPlaceman } from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user/components/buttonAdd.tsx'
import { UseGetPlacemanUser } from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsUserPlaceman } from './data/columns'

export const PlacemenUser = () => {
  const { meta, loading, listUserPlaceman } = UseGetPlacemanUser()
  const columns = ColumnsUserPlaceman()

  return (
    <div
     className={'flex flex-col gap-y-8'}>
      <ButtonTitleGroup
        isBack
        label={'Daftar Pejabat - Rektorat'}
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
