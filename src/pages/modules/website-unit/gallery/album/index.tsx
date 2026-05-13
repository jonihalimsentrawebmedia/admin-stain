import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddAlbumUnit } from './components/buttonAdd.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetGalleryAlbumUnit } from './hooks/index'
import { ColumnsGalleryAlbumUnit } from './components/columns'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'
import { useSearchParams } from 'react-router-dom'

export const GalleryAlbumUnitPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { albumUnit, loading, meta } = UseGetGalleryAlbumUnit({
    page,
    limit,
    search,
  })
  const columns = ColumnsGalleryAlbumUnit()
  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Galeri Foto'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide titleGuide="Galeri Foto" valueGuide="PERPUSTAKAAN_GALERI_ALBUM" />
              ),
            },
            { type: 'custom', element: <ButtonAddAlbumUnit /> },
          ]}
        />

        <TableCustom data={albumUnit} loading={loading} meta={meta} columns={columns} />
      </div>
    </>
  )
}
