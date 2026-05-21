import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetGalleryVideo } from './hooks/index'
import { ButtonAddVideo } from './component/buttonAdd'
import { ColumnsGalleryVideo } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { useSearchParams } from 'react-router-dom'

export const ListAlbumVideo = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { video, loading, meta } = UseGetGalleryVideo({
    page: page,
    limit: limit,
    search: search,
  })
  const columns = ColumnsGalleryVideo()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label="Galeri Video"
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide titleGuide={'Galeri Video'} valueGuide="FAKULTAS_GALERI_VIDEO" />
              ),
            },
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
