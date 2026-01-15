import TableCustom from '@/components/common/table/TableCustom.tsx'
import type { StatusPublish } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'
import { ColumnsReturnByStatus } from './columns/index'
import { useSearchParams } from 'react-router-dom'
import useGetSatuanOrganisasi from '../../../controller/useGetSatuanOrganisasi'
import SelectFilter from '@/components/common/filter/SelectFilter'
import { UseGetPromotionManagementEditor } from '../hooks'

interface props {
  status: StatusPublish
}

export const TableDataListPromotion = (props: props) => {
  const { status } = props
  const { satuanOrganisasi } = useGetSatuanOrganisasi({})

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const id_satuan_organisasi = searchParams.get('id-satuan-organisasi') || ''

  const { loading, meta, promotion } = UseGetPromotionManagementEditor({
    status_publish: status,
    page: page,
    limit: limit,
    id_satuan_organisasi: id_satuan_organisasi,
  })

  const columns = ColumnsReturnByStatus(status)

  return (
    <div className="space-y-8">
      <SelectFilter
        selectClassName={'w-full lg:min-w-[10rem] lg:max-w-[20rem]'}
        label="Unit/Satuan Kerja"
        name={'id-satuan-organisasi'}
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
        }
        data={promotion}
        loading={loading}
        meta={meta}
        columns={columns}
      />
    </div>
  )
}
