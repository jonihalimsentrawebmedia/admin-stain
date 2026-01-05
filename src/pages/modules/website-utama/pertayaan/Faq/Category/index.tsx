import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddCategoryFAQ } from '@/pages/modules/website-utama/pertayaan/Faq/Category/components/ButtonAdd.tsx'
import { UseGetFaqCategory } from '@/pages/modules/website-utama/pertayaan/Faq/Category/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsCategoryFAQ } from '@/pages/modules/website-utama/pertayaan/Faq/Category/data/columns.tsx'

export const CategoryFAQList = () => {
  const { categoryFaq, meta, loading } = UseGetFaqCategory()
  const columns = ColumnsCategoryFAQ()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          isBack
          label={'Kategori F.A.Q'}
          buttonGroup={[{ type: 'custom', element: <ButtonAddCategoryFAQ /> }]}
        />

        <TableCustom
          tdClassName={'border-none'}
          className={'border'}
          thClassName={'border-none'}
          columns={columns}
          data={categoryFaq}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}
