import SelectFilter from '@/components/common/filter/SelectFilter'
import useGetSatuanOrganisasi from '../../../controller/useGetSatuanOrganisasi'
import { UseGetImpactInnovation } from '../hooks'
import { ColumnsReturnByStatus } from './table'
import TableCustom from '@/components/common/table/TableCustom'
import type { StatusPublish } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'

interface props {
  status: StatusPublish
}
const ImpactInnovationList = (props: props) => {
  const { status } = props
  const { satuanOrganisasi } = useGetSatuanOrganisasi({})

  const { loading, meta, impactInnovation } = UseGetImpactInnovation()
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
              selectClassName={'min-w-[8rem]'}
              label="Kategori"
              name={'id-kategori-inovasi-berdampak'}
              options={[]}
            />
          </div>
        }
        data={impactInnovation}
        loading={loading}
        meta={meta}
        columns={columns}
      />
    </div>
  )
}

export default ImpactInnovationList
