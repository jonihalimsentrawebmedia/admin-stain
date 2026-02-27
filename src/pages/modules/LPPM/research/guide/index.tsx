import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetGuideCategory } from './hooks/index'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { ColumnsGuideCategory } from './data/columns'
import { ButtonAddGuideCategory } from '@/pages/modules/LPPM/research/guide/component/buttonAdd.tsx'

export const GuideCategoryResearch = () => {
  const [searchParams] = useSearchParams()
  const limit = searchParams.get('limit') ?? '10'
  const page = searchParams.get('page') ?? '1'
  const search = searchParams.get('search') ?? ''

  const { guideCategory, loading, meta } = UseGetGuideCategory({
    limit: limit,
    page: page,
    search: search,
  })

  const columns = ColumnsGuideCategory()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Buku Panduan'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddGuideCategory />,
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
          data={guideCategory}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
