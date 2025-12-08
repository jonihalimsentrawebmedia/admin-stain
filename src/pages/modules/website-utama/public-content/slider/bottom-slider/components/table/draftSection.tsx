import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { UseGetListBottomSlider } from '@/pages/modules/website-utama/public-content/slider/bottom-slider/hooks'
import BottomSliderColumns from '@/pages/modules/website-utama/public-content/slider/bottom-slider/components/table/topSliderColumns.tsx'

export const BottomDraftSection = () => {
  const columns = BottomSliderColumns()
  const { listBottomSlider, loading } = UseGetListBottomSlider()
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
        data={listBottomSlider}
        loading={loading}
        placeHolderSearch="Cari Gambar"
      />
    </>
  )
}
