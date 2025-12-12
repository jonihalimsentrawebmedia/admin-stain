import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddAlbumPhoto } from '@/pages/modules/website-utama/public-content/gallery/Foto/components/buttonAdd.tsx'
import { ColumnsGalleryPhoto } from '@/pages/modules/website-utama/public-content/gallery/Foto/data/columns.tsx'
import { UseGetGalleryPhoto } from '@/pages/modules/website-utama/public-content/gallery/Foto/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const GalleryPhotoPage = () => {
  const columns = ColumnsGalleryPhoto()
  const { galleryPhoto, loading, meta } = UseGetGalleryPhoto()

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Gallery Foto'}
          buttonGroup={[
            {
              type: 'add',
              label: '',
              onClick: () => {},
              element: <ButtonAddAlbumPhoto />,
            },
          ]}
        />

        <TableCustom
          meta={meta}
          loading={loading}
          columns={columns}
          data={galleryPhoto}
          thClassName={'bg-primary-foreground'}
        />
      </div>
    </>
  )
}
