import { UseGetGalleryVideoProdi } from '@/pages/modules/website-prodi/gallery/video/hooks'
import { UseGetGalleryAlbumProdi } from '@/pages/modules/website-prodi/gallery/album/hooks'
import { ColumnsGalleryAlbumProfile, ColumnsGalleryVideoProfile } from './components/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'
import FilterBasic from '@/components/common/filter/filterBasic.tsx'
import { useEffect } from 'react'

export const GalleryProfileDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const type = searchParams.get('type') ?? 'ALBUM'

  const { galleryVideo } = UseGetGalleryVideoProdi()
  const { albumProdi } = UseGetGalleryAlbumProdi()
  const columnsVideo = ColumnsGalleryVideoProfile()
  const columnsAlbum = ColumnsGalleryAlbumProfile()

  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      if (!params.get('type')) {
        params.set('type', 'ALBUM')
      }
      return params
    })
  }, [type])

  return (
    <>
      <div className="flex flex-col gap-5">
        <p className="text-2xl font-semibold">Gallery</p>

        <TableCustom
          classNameSearch={'p-1.5 pl-8'}
          addFilter={
            <div>
              <FilterBasic
                placeholder={'Jenis'}
                selectClassName={'max-w-[20rem]'}
                data={[
                  { value: 'ALBUM', label: 'Album' },
                  { value: 'VIDEO', label: 'Video' },
                ]}
                name={'type'}
              />
            </div>
          }
          data={type === 'ALBUM' ? albumProdi : galleryVideo}
          columns={type === 'ALBUM' ? columnsAlbum : columnsVideo}
        />
      </div>
    </>
  )
}
