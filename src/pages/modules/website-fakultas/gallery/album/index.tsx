import { UseGetGalleryAlbum } from '../album/hooks/index'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ColumnsGalleryAlbum } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddAlbum } from './component/buttonAdd.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'
import { useSearchParams } from 'react-router-dom'

export const ListGalleryAlbum = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { album, loading, meta } = UseGetGalleryAlbum({
    page: page,
    limit: limit,
    search: search,
  })
  const columns = ColumnsGalleryAlbum()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label="Galeri Foto"
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide titleGuide={'Galeri Foto'} valueGuide="FAKULTAS_GALERI_ALBUM" />
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddAlbum />,
            },
          ]}
        />

        <TableCustom data={album} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
