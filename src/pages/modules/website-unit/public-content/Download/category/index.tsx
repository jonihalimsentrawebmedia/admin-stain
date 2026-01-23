import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddCategoryDownloadUnit } from './components/buttonAdd.tsx'
import { UseGetCategoryDownloadUnit } from '../hooks/index'
import { CategoryDownloadUnitColumns } from './components/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'

export const CategoryDownloadProdiPage = () => {
  const { categoryDownload, loading, meta } = UseGetCategoryDownloadUnit()
  const columns = CategoryDownloadUnitColumns()

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup
          label={'Kategori Berkas'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddCategoryDownloadUnit />,
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
