import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddCategoryDownloadProdi } from '@/pages/modules/website-prodi/public-content/Download/category/components/buttonAdd.tsx'
import { UseGetCategoryDownloadProdi } from '@/pages/modules/website-prodi/public-content/Download/hooks'
import { CategoryDownloadProdiColumns } from '@/pages/modules/website-prodi/public-content/Download/category/components/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'

export const CategoryDownloadProdiPage = () => {
  const { categoryDownload, loading, meta } = UseGetCategoryDownloadProdi()
  const columns = CategoryDownloadProdiColumns()

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          label={'Kategori Berkas'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddCategoryDownloadProdi />,
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
