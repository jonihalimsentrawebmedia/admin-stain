import { UseGetUnitCollection } from '@/pages/modules/website-unit/collection/hooks'
import { ColumnsUnitCollection } from '@/pages/modules/website-unit/collection/data/columns.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddCollection } from '@/pages/modules/website-unit/collection/component/buttonAdd.tsx'
import { UseGetSessionUnit } from '@/pages/modules/website-unit/hooks'

export const CategoryCollection = () => {
  const { session } = UseGetSessionUnit()
  const { collection, meta, loading } = UseGetUnitCollection()
  const columns = ColumnsUnitCollection(session)

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <ButtonTitleGroup
          label={'Daftar Koleksi'}
          buttonGroup={[{ type: 'custom', element: <ButtonAddCollection session={session} /> }]}
        />
        <TableCustom columns={columns} data={collection} loading={loading} meta={meta} />
      </div>
    </>
  )
}
