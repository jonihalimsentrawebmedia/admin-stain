import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddAlbumUnit } from './components/buttonAdd.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetGalleryAlbumUnit } from './hooks/index'
import { ColumnsGalleryAlbumUnit } from './components/columns'

export const GalleryAlbumUnitPage = () => {
  const { albumUnit, loading, meta } = UseGetGalleryAlbumUnit()
  const columns = ColumnsGalleryAlbumUnit()
  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Galeri Foto'}
          buttonGroup={[{ type: 'custom', element: <ButtonAddAlbumUnit /> }]}
        />

        <TableCustom data={albumUnit} loading={loading} meta={meta} columns={columns} />
      </div>
    </>
  )
}
