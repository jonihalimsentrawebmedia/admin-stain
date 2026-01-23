import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddPhotoUnit } from './components/buttonAdd.tsx'
import { useParams, useSearchParams } from 'react-router-dom'
import { UseGetPhotoAlbumUnit } from './hooks/index.tsx'
import Search from '@/components/common/table/Search.tsx'
import { ButtonEditPhotoUnit } from './components/buttonEdit.tsx'
import { ButtonDeletePhotoUnit } from './components/buttonDelete.tsx'
import { UseGetGalleryAlbumUnitById } from '../album/hooks/index'

export const GalleryPhotoUnitPage = () => {
  const { id } = useParams()
  const { photoAlbumUnit } = UseGetPhotoAlbumUnit({
    id_album: id,
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
              element: <ButtonAddPhotoUnit />,
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
              setSearchParams({ search: e })
            }}
          />
          {detail?.jumlah_foto === 0 && <p className="text-red-500">belum ada foto ditambahkan</p>}

          <div className="grid grid-cols-3 gap-5">
            {photoAlbumUnit.length > 0 &&
              photoAlbumUnit.map((item, index) => (
                <div key={index}>
                  <div className="relative w-full">
                    <div className="absolute gap-1.5 flex items-center justify-end w-full p-1.5">
                      <ButtonEditPhotoUnit {...item} />
                      <ButtonDeletePhotoUnit data={item} title={detail?.judul ?? ''} />
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
