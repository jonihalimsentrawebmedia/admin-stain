import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddVideo } from '@/pages/modules/website-utama/public-content/gallery/video/components/buttonAdd.tsx'
import { ColumnsVideo } from '@/pages/modules/website-utama/public-content/gallery/video/data/columns.tsx'
import {
  UseGetGalleryVideo,
  UseGetGalleryVideoBackground,
} from '@/pages/modules/website-utama/public-content/gallery/video/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { IoWarning } from 'react-icons/io5'
import { Image } from 'lucide-react'

export const GalleryVideoPage = () => {
  const { galleryVideo, loading, meta } = UseGetGalleryVideo()
  const columns = ColumnsVideo()
  const { background } = UseGetGalleryVideoBackground()

  const navigate = useNavigate()

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Gallery Video'}
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
              element: <ButtonAddVideo />,
            },
          ]}
        />

        <TableCustom
          meta={meta}
          loading={loading}
          columns={columns}
          data={galleryVideo}
          thClassName={'bg-primary-foreground'}
        />
      </div>
    </>
  )
}
