import {
  UseGetGalleryAlbum,
  UseGetGalleryVideo,
} from '@/pages/modules/website-fakultas/academic/program-studi/detail/gallery/hooks'
import { useParams, useSearchParams } from 'react-router-dom'
import {
  ColumnsGalleryAlbum,
  ColumnsGalleryVideo,
} from '@/pages/modules/website-fakultas/academic/program-studi/detail/gallery/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { useEffect } from 'react'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const ProdiGallery = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const type = searchParams.get('type')
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { id } = useParams()
  const { album, meta, loading } = UseGetGalleryAlbum({
    id_unit: (id as string) ?? '',
    page,
    limit,
    search,
  })
  const {
    video,
    meta: meta1,
    loading: load1,
  } = UseGetGalleryVideo({
    id_unit: (id as string) ?? '',
    page,
    limit,
    search,
  })

  const columns = ColumnsGalleryAlbum()
  const columns2 = ColumnsGalleryVideo()

  useEffect(() => {
    if (!type) {
      const Params = new URLSearchParams()
      Params.append('type', 'PHOTO')
      setSearchParams(Params.toString())
    }
  }, [type])

  return (
    <>
      <div className={'space-y-5'}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-2xl font-semibold text-primary">Galeri</p>

          <ButtonGoToGuide
            titleGuide={'Galeri'}
            valueGuide="FAKULTAS_AKADEMIK_PROGRAM_STUDI_GALERI"
          />
        </div>
        {type === 'PHOTO' ? (
          <TableCustom
            addFilter={
              <SelectFilter
                name={'type'}
                label={'Jenis Galeri'}
                selectClassName={'min-w-[120px]! w-full'}
                options={[
                  { label: 'Foto', value: 'PHOTO' },
                  { label: 'Video', value: 'VIDEO' },
                ]}
              />
            }
            meta={meta}
            columns={columns}
            data={album}
            loading={loading}
          />
        ) : (
          <TableCustom
            addFilter={
              <SelectFilter
                name={'type'}
                label={'Jenis Galeri'}
                selectClassName={'min-w-[120px]! w-full'}
                options={[
                  { label: 'Foto', value: 'PHOTO' },
                  { label: 'Video', value: 'VIDEO' },
                ]}
              />
            }
            meta={meta1}
            columns={columns2}
            data={video}
            loading={load1}
          />
        )}
      </div>
    </>
  )
}
