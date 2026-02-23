import { DraftNewsColumns } from '@/pages/modules/website-lembaga/public-content/news/components/table/draftColumns.tsx'
import { UseGetNews } from '../../hooks/index.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import useGetNewsCategory from '@/pages/modules/settings/reference/news-category/controller/useGetNewsCategory.tsx'

export const DraftSectionTabs = () => {
  const columns = DraftNewsColumns()
  const { loading, meta, newsList } = UseGetNews()
  const { newsCategory } = useGetNewsCategory({ isGetAll: true })

  return (
    <>
      <TableCustom
        tdClassName={'whitespace-pre-line border'}
        addFilter={
          <div className={'flex items-center gap-1.5'}>
            <SelectFilter
              selectClassName={'min-w-[8rem]'}
              label="Tampilkan"
              name={'limit'}
              options={[
                { label: '10 Data', value: '10' },
                { label: '25 Data', value: '25' },
                { label: '50 Data', value: '50' },
                { label: '100 Data', value: '100' },
              ]}
            />
            <SelectFilter
              selectClassName={'min-w-[10rem]'}
              label="kategori"
              name={'id_category'}
              options={
                newsCategory?.map((row) => ({
                  label: row?.nama_kategori,
                  value: row?.id_kategori,
                })) ?? []
              }
            />
          </div>
        }
        columns={columns}
        data={newsList}
        loading={loading}
        meta={meta}
      />
    </>
  )
}
