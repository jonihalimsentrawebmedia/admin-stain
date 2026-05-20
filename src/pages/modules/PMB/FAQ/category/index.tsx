import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { UseGetFaqCategoryPMB } from './hooks/index'
import { ColumnsCategoryFAQUnit } from './data/columns'
import { ButtonAddCategoryFAQPMB } from './components/buttonAdd.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'
import { useSearchParams } from 'react-router-dom'

export const CategoryFAQPMBPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { loading, categoryFaq, meta } = UseGetFaqCategoryPMB({
    page,
    limit,
    search,
  })
  const columns = ColumnsCategoryFAQUnit()

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          label={'Kategori F.A.Q'}
          isBack
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide="Kategori F.A.Q"
                  valueGuide="PERPUSTAKAAN_PERTANYAAN_KATEGORI_FAQ"
                />
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddCategoryFAQPMB />,
            },
          ]}
        />

        <TableCustom
          addFilter={
            <SelectFilter
              label={'Limit'}
              options={[
                { label: '10', value: '10' },
                { label: '25', value: '25' },
                { label: '50', value: '50' },
                { label: '100', value: '100' },
              ]}
              zIndex={'z-10'}
              name={'limit'}
              selectClassName={'w-[10rem]'}
            />
          }
          columns={columns}
          data={categoryFaq}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
