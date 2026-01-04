import TableCustom from '@/components/common/table/TableCustom'
import useGetGallery from '../controller/useGetGallery'
import GalleryProgramStudyViewModel from './GalleryProgramStudyViewModel'
import SelectFilter from '@/components/common/filter/SelectFilter'
import { useSearchParams } from 'react-router-dom'
import { UseGetGalleryVideo } from '../../../public-content/gallery/video/hooks'

const GalleryProgramStudyView = () => {
  const { loading, gallery, meta } = useGetGallery()
  const { loading: loadingVideo, galleryVideo, meta: metaVideo } = UseGetGalleryVideo()
  const { columns, columnsVideo } = GalleryProgramStudyViewModel()
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type')

  const galleryUse = type == 'video' ? galleryVideo : gallery
  const metaUse = type == 'video' ? metaVideo : meta
  const loadingUse = type == 'video' ? loadingVideo : loading
  const columnUse = type == 'video' ? columnsVideo : columns

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-primary text-2xl">Galeri</div>
      </div>
      <TableCustom
        addFilter={
          <div className="flex gap-4">
            <SelectFilter
              selectClassName={'min-w-[8rem]'}
              label="Jenis"
              name={'type'}
              options={[
                { label: 'Foto', value: 'foto' },
                {
                  label: 'Video',
                  value: 'video',
                },
              ]}
            />
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
          </div>
        }
        columns={columnUse}
        data={galleryUse}
        loading={loadingUse}
        meta={metaUse}
      />
    </div>
  )
}

export default GalleryProgramStudyView
