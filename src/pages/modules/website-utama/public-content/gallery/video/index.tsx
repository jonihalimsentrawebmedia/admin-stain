import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddVideo } from '@/pages/modules/website-utama/public-content/gallery/video/components/buttonAdd.tsx'
import { ColumnsVideo } from '@/pages/modules/website-utama/public-content/gallery/video/data/columns.tsx'
import { UseGetGalleryVideo } from '@/pages/modules/website-utama/public-content/gallery/video/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const GalleryVideoPage = () => {
  const { galleryVideo, loading, meta } = UseGetGalleryVideo()
  const columns = ColumnsVideo()
  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Gallery Video'}
          buttonGroup={[
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
