import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { UseGetFaqCategoryUnit } from './hooks/index'
import { ColumnsCategoryFAQUnit } from './data/columns'
import { ButtonAddCategoryFAQUnit } from './components/buttonAdd.tsx'

export const CategoryFAQUnitPage = () => {
  const { loading, categoryFaq, meta } = UseGetFaqCategoryUnit()
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
              element: <ButtonAddCategoryFAQUnit />,
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
