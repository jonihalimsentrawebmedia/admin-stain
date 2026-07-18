import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddPhotoUnit } from './components/buttonAdd.tsx'
import { useParams, useSearchParams } from 'react-router-dom'
import { UseGetPhotoAlbumUnit } from './hooks/index.tsx'
import Search from '@/components/common/table/Search.tsx'
import { ButtonEditPhotoUnit } from './components/buttonEdit.tsx'
import { ButtonDeletePhotoUnit } from './components/buttonDelete.tsx'
import { UseGetGalleryAlbumUnitById } from '../album/hooks/index'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

export const GalleryPhotoUnitPage = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const { photoAlbumUnit } = UseGetPhotoAlbumUnit({
    id_album: id,
    page,
    limit,
    search,
  })
  const { albumUnitDetail: detail } = UseGetGalleryAlbumUnitById(id ?? '')
  const [_, setSearchParams] = useSearchParams()

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          label={'Isi Galeri Foto'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide="Isi Galeri Foto"
                  valueGuide="PERPUSTAKAAN_GALERI_FOTO"
                />
              ),
            },
            {
              type: 'custom',
              element: <ButtonAddPhotoUnit />,
            },
          ]}
          isBack
          link={'/modules/website-unit/gallery/photo'}
        />

        <div className="flex flex-col gap-4 sm:gap-5 mt-5">
          <p className="text-xl sm:text-2xl font-semibold text-primary">{detail?.judul}</p>
          <Search
            innerClassName={'p-1.5 pl-9'}
            position={'start'}
            onSearch={(e) => {
              setSearchParams({ search: e })
            }}
          />
          {detail?.jumlah_foto === 0 && <p className="text-red-500">belum ada foto ditambahkan</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {photoAlbumUnit.length > 0 &&
              photoAlbumUnit.map((item, index) => (
                <div key={index} className="group">
                  <div className="relative w-full overflow-hidden rounded-md">
                    <div className="absolute gap-1.5 flex items-center justify-end w-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <ButtonEditPhotoUnit {...item} />
                      <ButtonDeletePhotoUnit data={item} title={detail?.judul ?? ''} />
                    </div>
                    <img
                      src={item?.link_foto}
                      alt="image"
                      className="w-full h-[200px] sm:h-[250px] lg:h-[300px] object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="px-1 mt-1.5 text-sm sm:text-base font-medium truncate">{item?.judul}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
