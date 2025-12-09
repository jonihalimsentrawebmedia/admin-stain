import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetListTopSliderDraft } from '@/pages/modules/website-utama/public-content/slider/top-slider/hooks'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import TopSliderColumns from '@/pages/modules/website-utama/public-content/slider/top-slider/components/table/topSliderColumns.tsx'

export const DraftSection = () => {
  const columns = TopSliderColumns()
  const { listDraftSlider, loading, meta } = UseGetListTopSliderDraft()
  return (
    <>
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
        columns={columns}
        data={listDraftSlider}
        loading={loading}
        placeHolderSearch="Cari Gambar"
        meta={meta}
      />
    </>
  )
}
