import TableCustom from '@/components/common/table/TableCustom'
import useGetGallery from '../controller/useGetGallery'
import GalleryProgramStudyViewModel from './GalleryProgramStudyViewModel'
import SelectFilter from '@/components/common/filter/SelectFilter'

const GalleryProgramStudyView = () => {
  const { loading, gallery, meta } = useGetGallery()
  const { columns } = GalleryProgramStudyViewModel()
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-primary text-2xl">Unit Pengelola</div>
      </div>
      <TableCustom
        addFilter={
          <div className="flex gap-4">
            <SelectFilter
              selectClassName={'min-w-[8rem]'}
              label="Foto"
              name={'type'}
              options={[{ label: 'Foto', value: 'foto' }]}
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
        columns={columns}
        data={gallery}
        loading={loading}
        meta={meta}
      />
    </div>
  )
}

export default GalleryProgramStudyView
