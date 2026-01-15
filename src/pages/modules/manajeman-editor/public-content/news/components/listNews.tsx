import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { StatusPublish } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { ColumnsReturnByStatus } from './columns/index'
import { useSearchParams } from 'react-router-dom'
import useGetSatuanOrganisasi from '../../../controller/useGetSatuanOrganisasi'
import SelectFilter from '@/components/common/filter/SelectFilter'
import { UseGetManagementEditorNews } from '../hooks'
import useGetNewsCategory from '@/pages/modules/settings/reference/news-category/controller/useGetNewsCategory'

interface props {
  status: StatusPublish
}

export const TableDataListNews = (props: props) => {
  const { status } = props
  const { satuanOrganisasi } = useGetSatuanOrganisasi({})
  const [searchParams] = useSearchParams()
  const { newsCategory } = useGetNewsCategory({ isGetAll: true })
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const id_satuan_organisasi = searchParams.get('id_satuan_organisasi') || ''
  const id_kategori_berita = searchParams.get('id-kategori-berita') || ''

  const { loading, meta, managementEditorNews } = UseGetManagementEditorNews({
    status_publish: status,
    page: page,
    limit: limit,
    id_kategori_berita: id_kategori_berita,
    id_satuan_organisasi: id_satuan_organisasi,
  })
  const columns = ColumnsReturnByStatus(status)

  return (
    <div className="space-y-8">
      <SelectFilter
        selectClassName={'w-full lg:min-w-[10rem] lg:max-w-[20rem]'}
        label="Unit/Satuan Kerja"
        name={'id_satuan_organisasi'}
        options={
          satuanOrganisasi?.map((item) => {
            return {
              value: item.id_satuan_organisasi,
              label: item.nama,
            }
          }) ?? []
        }
      />
      <TableCustom
        addFilter={
          <div className="flex gap-4 items-center">
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
              selectClassName={'min-w-[15rem]'}
              label="Kategori"
              name={'id-kategori-berita'}
              options={newsCategory.map((item) => {
                return {
                  label: item.nama_kategori,
                  value: item.id_kategori,
                }
              })}
            />
          </div>
        }
        data={managementEditorNews}
        loading={loading}
        meta={meta}
        columns={columns}
      />
    </div>
  )
}
