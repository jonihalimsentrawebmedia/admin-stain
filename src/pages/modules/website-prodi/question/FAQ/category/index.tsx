import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddCategoryFAQProdi } from '@/pages/modules/website-prodi/question/FAQ/category/components/buttonAdd.tsx'
import { UseGetFaqCategoryProdi } from '@/pages/modules/website-prodi/question/FAQ/category/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsCategoryFAQProdi } from '@/pages/modules/website-prodi/question/FAQ/category/data/columns.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'

export const CategoryFAQProdiPage = () => {
  const { loading, categoryFaq, meta } = UseGetFaqCategoryProdi()
  const columns = ColumnsCategoryFAQProdi()

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          label={'Kategori F.A.Q'}
          isBack
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddCategoryFAQProdi />,
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
