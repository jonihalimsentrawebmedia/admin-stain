import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddAlbumPhoto } from '@/pages/modules/website-utama/public-content/gallery/Foto/components/buttonAdd.tsx'
import { ColumnsGalleryPhoto } from '@/pages/modules/website-utama/public-content/gallery/Foto/data/columns.tsx'
import {
  UseGetGalleryPhoto,
  UseGetGalleryPhotoBackground,
} from '@/pages/modules/website-utama/public-content/gallery/Foto/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { IoWarning } from 'react-icons/io5'
import { Image } from 'lucide-react'

export const GalleryPhotoPage = () => {
  const columns = ColumnsGalleryPhoto()
  const { galleryPhoto, loading, meta } = UseGetGalleryPhoto()
  const { background } = UseGetGalleryPhotoBackground()

  const navigate = useNavigate()

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Gallery Foto'}
          buttonGroup={[
            {
              type: 'custom',
              element:
                background?.length === 0 ? (
                  <Button
                    onClick={() => navigate('background')}
                    variant={'outline'}
                    className="border border-red-500 hover:text-red-500 text-red-500"
                  >
                    <IoWarning className="text-red- hover:text-red-500 size-6" />
                    Gambar Background Belum Ada
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate('background')}
                    variant={'outline'}
                    className="border border-primary text-primary hover:text-primary"
                  >
                    <Image className="text-primary" />
                    Gambar Background
                  </Button>
                ),
            },
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
