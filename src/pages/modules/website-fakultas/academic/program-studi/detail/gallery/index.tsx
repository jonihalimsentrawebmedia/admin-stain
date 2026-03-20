import { UseGetGalleryAlbum } from '@/pages/modules/website-fakultas/academic/program-studi/detail/gallery/hooks'
import { useParams, useSearchParams } from 'react-router-dom'
import { ColumnsGalleryAlbum } from '@/pages/modules/website-fakultas/academic/program-studi/detail/gallery/data/columns.tsx'
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

  const columns = ColumnsGalleryAlbum()

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
        {type === 'PHOTO' && (
          <TableCustom
            addFilter={
              <SelectFilter
                name={'type'}
                label={'Jenis Galeri'}
                selectClassName={'min-w-[120px]! w-full'}
                placeholder={'Jenis Galeri'}
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
        )}
      </div>
    </>
  )
}
