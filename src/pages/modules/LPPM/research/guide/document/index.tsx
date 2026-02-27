import { useParams, useSearchParams } from 'react-router-dom'
import { UseGetGuideCategoryDetail } from '../hooks/index'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDocumentGuideCategory } from './hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { ButtonAddDocumentGuideBook } from './component/buttonAdd.tsx'
import { ColumnsGuideBook } from './data/columns'

export const DocumentGuideCategory = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const limit = searchParams.get('limit') ?? '10'
  const page = searchParams.get('page') ?? '1'
  const search = searchParams.get('search') ?? ''

  const { detail, loading: load1 } = UseGetGuideCategoryDetail(id ?? '')
  const {
    document,
    loading: load2,
    meta,
  } = UseGetDocumentGuideCategory({
    limit: limit,
    id_kategori: (id as string) ?? '',
    page: page,
    search: search,
  })

  const loading = load1 || load2
  const columns = ColumnsGuideBook()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          isBack
          label={`Daftar Dokumen - ${detail?.nama_kategori}`}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddDocumentGuideBook />,
            },
          ]}
        />
        <TableCustom
          addFilter={
            <SelectFilter
              selectClassName={'w-[120px]'}
              name="limit"
              label="Jlh Data"
              options={[10, 25, 50, 100].map((item) => {
                return {
                  label: item.toString(),
                  value: item.toString(),
                }
              })}
            />
          }
          data={document}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
