import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetGalleryVideo } from './hooks/index'
import { ButtonAddVideo } from './component/buttonAdd'
import { ColumnsGalleryVideo } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const ListAlbumVideo = () => {
  const { video, loading, meta } = UseGetGalleryVideo()
  const columns = ColumnsGalleryVideo()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label="Galeri Video"
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddVideo />,
            },
          ]}
        />

        <TableCustom data={video} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
