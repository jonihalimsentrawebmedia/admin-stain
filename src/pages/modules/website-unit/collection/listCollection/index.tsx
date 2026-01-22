import { UseGetUnitCollectionDetail } from '@/pages/modules/website-unit/collection/hooks'
import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetCollectionCategory } from '@/pages/modules/website-unit/collection/listCollection/hooks'
import { ColumnsCategoryCollection } from '@/pages/modules/website-unit/collection/listCollection/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddCollectionCategory } from '@/pages/modules/website-unit/collection/listCollection/component/buttonAdd.tsx'

export const ListCollectionCategory = () => {
  const { id } = useParams()
  const { collection } = UseGetUnitCollectionDetail(id ?? '')
  const { collection: Data, meta, loading } = UseGetCollectionCategory(id ?? '')
  const columns = ColumnsCategoryCollection(collection)

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={`Daftar Koleksi-${collection?.nama_kategori}`}
          isBack
          buttonGroup={[
            { type: 'custom', element: <ButtonAddCollectionCategory rootData={collection} /> },
          ]}
        />

        <TableCustom data={Data} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
