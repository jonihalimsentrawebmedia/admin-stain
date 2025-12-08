import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetListTopSliderDraft } from '@/pages/modules/website-utama/public-content/slider/top-slider/hooks'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import SubmissionColumns from '@/pages/modules/website-utama/public-content/slider/top-slider/components/table/submitColumns.tsx'

export const SubmitSection = () => {
  const columns = SubmissionColumns()
  const { listDraftSlider, loading } = UseGetListTopSliderDraft()
  return (
    <>
      <TableCustom
        addFilter={
          <SelectFilter
            label="Tampilkan"
            options={[
              { label: '10 Data', value: '10' },
              { label: '25 Data', value: '25' },
              { label: '50 Data', value: '50' },
              { label: '100 Data', value: '100' },
            ]}
          />
        }
        columns={columns}
        data={listDraftSlider}
        loading={loading}
        placeHolderSearch="Cari Gambar"
      />
    </>
  )
}
