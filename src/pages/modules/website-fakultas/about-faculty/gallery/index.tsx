import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useSearchParams } from 'react-router-dom'
import { UseGetGalleryAlbum } from '@/pages/modules/website-fakultas/gallery/album/hooks'
import { UseGetGalleryVideo } from '@/pages/modules/website-fakultas/gallery/video/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsGalleryAlbum } from '@/pages/modules/website-fakultas/gallery/album/data/columns.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { ColumnsGalleryVideo } from '@/pages/modules/website-fakultas/gallery/video/data/columns.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const FacultyGalleryProfile = () => {
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type') ?? 'PHOTO'

  const { album, loading: load1, meta: meta1 } = UseGetGalleryAlbum()
  const columns = ColumnsGalleryAlbum()
  const { video, loading: load2, meta: meta2 } = UseGetGalleryVideo()
  const columns2 = ColumnsGalleryVideo()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Galeri'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={'Galeri'}
                  valueGuide="FAKULTAS_PROFIL_GALERI"
                />
              ),
            },
          ]}
        />

        {type === 'VIDEO' ? (
          <TableCustom
            addFilter={
              <SelectFilter
                name={'type'}
                label={'jenis'}
                selectClassName={'lg:min-w-[120px] w-full'}
                options={[
                  { value: 'PHOTO', label: 'Foto' },
                  { value: 'VIDEO', label: 'Video' },
                ]}
              />
            }
            data={album}
            columns={columns}
            loading={load1}
            meta={meta1}
          />
        ) : (
          <TableCustom
            addFilter={
              <SelectFilter
                name={'type'}
                label={'jenis'}
                selectClassName={'lg:min-w-[120px] w-full'}
                options={[
                  { value: 'PHOTO', label: 'Foto' },
                  { value: 'VIDEO', label: 'Video' },
                ]}
              />
            }
            data={video}
            columns={columns2}
            loading={load2}
            meta={meta2}
          />
        )}
      </div>
    </>
  )
}
