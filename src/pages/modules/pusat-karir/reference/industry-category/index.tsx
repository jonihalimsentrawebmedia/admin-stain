import { UseGetIndustryCategory } from '@/pages/modules/pusat-karir/reference/industry-category/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddIndustryCategory } from '@/pages/modules/pusat-karir/reference/industry-category/comonent/buttonAdd.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsIndustryCategory } from '@/pages/modules/pusat-karir/reference/industry-category/data/columns.tsx'

export const IndustryCategoryPage = () => {
  const { categoryIndustry, meta, loading } = UseGetIndustryCategory()
  const columns = ColumnsIndustryCategory()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Kategori Industri'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddIndustryCategory />,
            },
          ]}
        />

        <TableCustom data={categoryIndustry} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
