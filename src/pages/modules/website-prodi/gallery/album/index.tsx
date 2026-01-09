import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddAlbumProdi } from '@/pages/modules/website-prodi/gallery/album/components/buttonAdd.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetGalleryAlbumProdi } from '@/pages/modules/website-prodi/gallery/album/hooks'
import { ColumnsGalleryAlbumProdi } from '@/pages/modules/website-prodi/gallery/album/components/columns.tsx'

export const GalleryAlbumProdiPage = () => {
  const { albumProdi, loading, meta } = UseGetGalleryAlbumProdi()
  const columns = ColumnsGalleryAlbumProdi()
  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Galeri Foto'}
          buttonGroup={[{ type: 'custom', element: <ButtonAddAlbumProdi /> }]}
        />

        <TableCustom data={albumProdi} loading={loading} meta={meta} columns={columns} />
      </div>
    </>
  )
}
