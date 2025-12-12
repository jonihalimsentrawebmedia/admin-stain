import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdOutlineHistory } from 'react-icons/md'
import { Button } from '@/components/ui/button.tsx'
import { UseGetGalleryPhotoDetail } from '../hooks'
import { useParams, useSearchParams } from 'react-router-dom'
import Search from '@/components/common/table/Search.tsx'
import { ButtonAddImage } from '@/pages/modules/website-utama/public-content/gallery/Foto/data-album/components/buttonAdd.tsx'
import { UseGetGalleryAlbum } from '@/pages/modules/website-utama/public-content/gallery/Foto/data-album/hooks'
import { ButtonEditImage } from '@/pages/modules/website-utama/public-content/gallery/Foto/data-album/components/buttonEdit.tsx'
import { ButtonDeletePhotoAlbum } from '@/pages/modules/website-utama/public-content/gallery/Foto/data-album/components/buttonDelete.tsx'

export const DataAlbumListPage = () => {
  const { id } = useParams()
  const { detailGalleryPhoto: detail } = UseGetGalleryPhotoDetail(id ?? '')
  const { galleryAlbum } = UseGetGalleryAlbum(id ?? '')

  const [_, setSearchParams] = useSearchParams()

  return (
    <>
      <ButtonTitleGroup
        isBack
        label={'Isi Galeri Foto'}
        buttonGroup={[
          {
            type: 'custom',
            element: (
              <Button variant={'outline'} className={'border-blue-600 text-blue-600'}>
                <MdOutlineHistory /> Log Data
              </Button>
            ),
          },
          {
            type: 'custom',
            element: <ButtonAddImage />,
          },
        ]}
      />

      <div className="flex flex-col gap-5 mt-5">
        <p className="text-2xl font-semibold text-primary">{detail?.judul}</p>
        <Search
          innerClassName={'p-1.5 pl-9'}
          position={'start'}
          onSearch={(e) => {
            setSearchParams({ search: e })
          }}
        />
        {detail?.jumlah_foto === 0 && <p className="text-red-500">belum ada foto ditambahkan</p>}

        <div className="grid grid-cols-3 gap-5">
          {galleryAlbum.length > 0 &&
            galleryAlbum.map((item, index) => (
              <div key={index}>
                <div className="relative w-full">
                  <div className="absolute gap-1.5 flex items-center justify-end w-full p-1.5">
                    <ButtonEditImage {...item} />
                    <ButtonDeletePhotoAlbum title={detail?.judul ?? ''} data={item} />
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
    </>
  )
}
