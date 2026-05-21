import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddAlbumProdi } from '@/pages/modules/website-prodi/gallery/album/components/buttonAdd.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetGalleryAlbumProdi } from '@/pages/modules/website-prodi/gallery/album/hooks'
import { ColumnsGalleryAlbumProdi } from '@/pages/modules/website-prodi/gallery/album/components/columns.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { useSearchParams } from 'react-router-dom'

export const GalleryAlbumProdiPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { albumProdi, loading, meta } = UseGetGalleryAlbumProdi({
    limit: limit,
    page: page,
    search: search,
  })

  const columns = ColumnsGalleryAlbumProdi()
  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Galeri Foto'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide="Galeri Foto" valueGuide="PRODI_GALERI_ALBUM" />,
            },
            { type: 'custom', element: <ButtonAddAlbumProdi /> },
          ]}
        />

        <TableCustom data={albumProdi} loading={loading} meta={meta} columns={columns} />
      </div>
    </>
  )
}
