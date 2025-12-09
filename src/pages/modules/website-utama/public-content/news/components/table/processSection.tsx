import { UseGetNews } from '@/pages/modules/website-utama/public-content/news/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import useGetNewsCategory from '@/pages/modules/settings/reference/news-category/controller/useGetNewsCategory.tsx'
import { ProcessColumns } from '@/pages/modules/website-utama/public-content/news/components/table/ProcessColumns.tsx'

export const ProcessSection = () => {
  const columns = ProcessColumns()
  const { loading, meta, newsList } = UseGetNews()
  const { newsCategory } = useGetNewsCategory({ isGetAll: true })

  return (
    <>
      <TableCustom
        tdClassName={'border'}
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
