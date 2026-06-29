import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddCategoryDownload } from '@/pages/modules/website-utama/public-content/download/category/components/buttonAdd.tsx'
import { UseGetCategoryDownload } from '@/pages/modules/website-utama/public-content/download/hooks'
import { CategoryDownloadColumns } from '@/pages/modules/website-utama/public-content/download/category/components/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'

export const CategoryDownloadPage = () => {
  const { categoryDownload, loading, meta } = UseGetCategoryDownload()
  const columns = CategoryDownloadColumns()

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          link={'/modules/website-utama/public-content/download'}
          label={'Kategori Berkas'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddCategoryDownload />,
            },
          ]}
          isBack
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
          data={categoryDownload}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
