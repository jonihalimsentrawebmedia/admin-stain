import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddPhotoProdi } from '@/pages/modules/website-prodi/gallery/photo/components/buttonAdd.tsx'
import { useParams, useSearchParams } from 'react-router-dom'
import { UseGetPhotoAlbumProdi } from '@/pages/modules/website-prodi/gallery/photo/hooks'
import Search from '@/components/common/table/Search.tsx'
import { ButtonEditPhotoProdi } from './components/buttonEdit.tsx'
import { ButtonDeletePhotoProdi } from './components/buttonDelete.tsx'
import { UseGetGalleryAlbumProdiById } from '@/pages/modules/website-prodi/gallery/album/hooks'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

export const GalleryPhotoProdiPage = () => {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'

  const { photoAlbumProdi } = UseGetPhotoAlbumProdi({
    id_album: id,
    page: page,
    limit: limit,
    search: search,
  })
  const { albumProdi: detail } = UseGetGalleryAlbumProdiById(id ?? '')

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Isi Galeri Foto'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide="Galeri Foto" valueGuide="PRODI_GALERI_FOTO" />,
            },
            {
              type: 'custom',
              element: <ButtonAddPhotoProdi />,
            },
          ]}
          isBack
        />

        <div className="flex flex-col gap-5 mt-5">
          <p className="text-2xl font-semibold text-primary">{detail?.judul}</p>
          <Search
            innerClassName={'p-1.5 pl-9'}
            position={'start'}
            onSearch={(e) => {
              const params = new URLSearchParams()
              params.set('search', e)
              if (e === '') {
                params.delete('search')
              }
              setSearchParams(params.toString(), { replace: true })
            }}
          />
          {detail?.jumlah_foto === 0 && <p className="text-red-500">belum ada foto ditambahkan</p>}

          <div className="grid grid-cols-3 gap-5">
            {photoAlbumProdi.length > 0 &&
              photoAlbumProdi.map((item, index) => (
                <div key={index}>
                  <div className="relative w-full">
                    <div className="absolute gap-1.5 flex items-center justify-end w-full p-1.5">
                      <ButtonEditPhotoProdi {...item} />
                      <ButtonDeletePhotoProdi data={item} title={detail?.judul ?? ''} />
                    </div>
                    <img
                      src={item?.link_foto}
                      alt="image"
                      className={'w-full h-[300px] object-cover rounded-md'}
                    />
                  </div>
                  <p className="px-1">{item?.judul}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
