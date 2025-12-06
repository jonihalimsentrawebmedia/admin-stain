import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate } from 'react-router-dom'
import { TabsListCustom } from '@/pages/modules/website-utama/public-content/slider/components/tabsList.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import Search from '@/components/common/table/Search.tsx'

export const TopSliderPublicContent = () => {
  const navigate = useNavigate()

  const DataTabs = [
    { id: 1, name: 'Draft', value: 'draft', element: <></> },
    { id: 2, name: 'Diajukan Ke Editor', value: 'pengajuan', element: <></> },
    { id: 3, name: 'Ditolak Ke Editor', value: 'tolak', element: <></> },
    { id: 4, name: 'Disetujui Ke Editor', value: 'setujui', element: <></> },
    { id: 5, name: 'Publish', value: 'publish', element: <></> },
    { id: 6, name: 'Unpublish', value: 'unpublish', element: <></> },
  ]

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Slider Atas'}
          buttonGroup={[
            {
              label: 'Tambah Data',
              type: 'add',
              onClick: () => navigate('add'),
            },
          ]}
        />

        <TabsListCustom data={DataTabs} />

        <div className="flex items-start gap-5">
          <SelectFilter
            label="Tampilkan"
            options={[
              { label: '10 Data', value: '10' },
              { label: '25 Data', value: '25' },
              { label: '50 Data', value: '50' },
              { label: '100 Data', value: '100' },
            ]}
          />
          <Search className="rounded-lg w-full" position="start" placeholder={'Cari Slider'} />
        </div>
      </div>
    </>
  )
}
