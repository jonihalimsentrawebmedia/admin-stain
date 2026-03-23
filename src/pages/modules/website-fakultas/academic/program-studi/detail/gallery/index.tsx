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

export const ProdiGallery = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const type = searchParams.get('type')

  const { id } = useParams()
  const { album, meta, loading } = UseGetGalleryAlbum({
    id_unit: (id as string) ?? '',
  })
  const {
    video,
    meta: meta1,
    loading: load1,
  } = UseGetGalleryVideo({
    id_unit: (id as string) ?? '',
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
        <p className="text-2xl font-semibold text-primary">Galeri</p>
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
