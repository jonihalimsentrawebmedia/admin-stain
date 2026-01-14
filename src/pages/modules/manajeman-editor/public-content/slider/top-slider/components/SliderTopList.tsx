import type { StatusPublish } from "@/pages/modules/website-prodi/public-content/news/data/types"
import { useSearchParams } from "react-router-dom"
import { UseGetListTopSliderDraft } from "../hooks"
import { ColumnsReturnByStatus } from "./table"
import SelectFilter from "@/components/common/filter/SelectFilter"
import TableCustom from "@/components/common/table/TableCustom"
import useGetSatuanOrganisasi from "@/pages/modules/manajeman-editor/controller/useGetSatuanOrganisasi"

interface Props {
  status: StatusPublish
}
const SliderTopList = (props:Props) => {
  const { status } = props

  const { satuanOrganisasi } = useGetSatuanOrganisasi({})
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const id_satuan_organisasi = searchParams.get('id_satuan_organisasi') || ''

  const { loading, meta, listDraftSlider } = UseGetListTopSliderDraft({
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
        data={listDraftSlider}
        loading={loading}
        meta={meta}
        columns={columns}
        isShowLimit={false}
      />
    </div>
  )
}

export default SliderTopList