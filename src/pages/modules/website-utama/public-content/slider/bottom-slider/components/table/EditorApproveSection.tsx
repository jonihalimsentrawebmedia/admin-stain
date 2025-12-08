import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import EditorApprovedColumnsBottom from '../table/editorApprovedColumns'
import { UseGetListBottomSlider } from '@/pages/modules/website-utama/public-content/slider/bottom-slider/hooks'

export const BottomEditorApproveSection = () => {
  const columns = EditorApprovedColumnsBottom()
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
