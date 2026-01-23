import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddVideoProdi } from '@/pages/modules/website-prodi/gallery/video/components/buttonAdd.tsx'
import { UseGetGalleryVideoUnit } from './hooks/index'
import { ColumnsVideoUnit } from './components/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'

export const GalleryVideoUnitPage = () => {
  const { galleryVideo, loading, meta } = UseGetGalleryVideoUnit()
  const columns = ColumnsVideoUnit()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Galeri Video'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddVideoProdi />,
            },
          ]}
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
          columns={columns}
          data={galleryVideo}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
