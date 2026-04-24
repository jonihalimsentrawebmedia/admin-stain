import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddCategory } from '@/pages/modules/SPI/quality-assurance/document-system/category/component/buttonAdd.tsx'
import { UseGetCategoryDocument } from '@/pages/modules/SPI/quality-assurance/document-system/category/hooks'
import { ColumnsCategory } from '@/pages/modules/SPI/quality-assurance/document-system/category/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const CategoryDocumentSystemPage = () => {
  const { meta, loading, cateegory } = UseGetCategoryDocument()
  const columns = ColumnsCategory()
  return (
    <>
      <div className="space-y-4 py-5">
        <ButtonTitleGroup
          isBack
          label={'Kategori Dokumen'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Kategori Dokumen'}
                  valueGuide="SPI_JAMINAN_MUTU_SITEM_DOKUMEN_KATEGORI"
                />
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddCategory />,
            },
          ]}
        />
        <TableCustom data={cateegory} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
