import { UseGetUnitCollectionDetail } from '@/pages/modules/website-unit/collection/hooks'
import { useParams, useSearchParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetCollectionCategory } from '@/pages/modules/website-unit/collection/listCollection/hooks'
import { ColumnsCategoryCollection } from '@/pages/modules/website-unit/collection/listCollection/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddCollectionCategory } from '@/pages/modules/website-unit/collection/listCollection/component/buttonAdd.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const ListCollectionCategory = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { collection } = UseGetUnitCollectionDetail(id ?? '')
  const {
    collection: Data,
    meta,
    loading,
  } = UseGetCollectionCategory({
    id: id as string,
    page: page,
    limit: limit,
    search: search,
  })
  const columns = ColumnsCategoryCollection(collection)

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={`Daftar Koleksi-${collection?.nama_kategori}`}
          isBack
          link={`/modules/website-unit/collection`}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={`Daftar Koleksi-${collection?.nama_kategori}`}
                  valueGuide="PERPUSTAKAAN_KATEGORI_KOLEKSI"
                />
              ),
            },
            { type: 'custom', element: <ButtonAddCollectionCategory rootData={collection} /> },
          ]}
        />

        <TableCustom data={Data} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
